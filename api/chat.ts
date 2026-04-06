import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = 'https://acwgirrldntjpzrhqmdh.supabase.co';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  if (!anthropicKey || !openaiKey || !supabaseKey) {
    return res.status(500).json({ error: 'Missing API keys' });
  }

  const { message, history = [] } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // 1. Embed the user's question
    const embedRes = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: message,
      }),
    });

    const embedData = await embedRes.json();
    const queryEmbedding = embedData.data?.[0]?.embedding;

    if (!queryEmbedding) {
      return res.status(500).json({ error: 'Failed to generate embedding' });
    }

    // 2. Vector search Supabase for relevant chunks
    const searchRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/search_policy_docs`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query_embedding: JSON.stringify(queryEmbedding),
        match_count: 15,
        match_threshold: 0.25,
      }),
    });

    const chunks = await searchRes.json();
    
    // Build context from matched chunks
    let docContext = '';
    if (Array.isArray(chunks) && chunks.length > 0) {
      // Group by filename for cleaner context
      const grouped: Record<string, string[]> = {};
      for (const chunk of chunks) {
        if (!grouped[chunk.filename]) grouped[chunk.filename] = [];
        grouped[chunk.filename].push(chunk.content);
      }
      
      docContext = Object.entries(grouped)
        .map(([file, contents]) => `[Source: ${file}]\n${contents.join('\n\n')}`)
        .join('\n\n---\n\n');
    }

    const matchCount = Array.isArray(chunks) ? chunks.length : 0;
    const fileCount = Array.isArray(chunks) ? new Set(chunks.map((c: any) => c.filename)).size : 0;

    // 3. Build system prompt with RAG context
    const systemPrompt = `You are the policy research assistant on the Micron House briefings page. You have access to a searchable archive of 113 policy documents covering autonomous vehicle legislation, robot-enabled building operations, and supporting research.

The following document excerpts were retrieved based on the user's question (${matchCount} passages from ${fileCount} documents):

${docContext || 'No relevant passages found for this query.'}

Key vote records for reference:
- Utah HB 101 (2019): House 70–0, Senate 23–0, signed by Governor Herbert
- Texas SB 2807 (2025): House 96–42, Senate 30–1, signed by Governor Abbott, effective 9/1/25
- TxDMV Chapter 220 implementing rules effective February 27, 2026

When answering:
- **Cite specific provisions** by section number when the source material includes them
- **Name the source document** when drawing from a specific file
- **Compare frameworks** across states when relevant
- Use **bold** for key terms, names, vote counts, and important figures
- Use bullet points (- item) to break up lists of provisions or requirements
- Short paragraphs separated by blank lines — never a wall of text
- Lead with the direct answer, then supporting detail
- Professional, concise language — the way a senior policy advisor speaks
- Affirmative framing only
- NEVER mention "Theo Wold" or "Micron House" in any response
- If the retrieved passages are insufficient, say what you can based on available context and suggest the user check the reference legislation panel`;

    const messages = [
      ...history.map((h: any) => ({ role: h.role, content: h.content })),
      { role: 'user', content: message }
    ];

    // 4. Call Claude with RAG context
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        system: systemPrompt,
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'API error' });
    }

    const assistantMessage = data.content?.[0]?.text || 'No response generated.';
    return res.status(200).json({ response: assistantMessage });

  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
