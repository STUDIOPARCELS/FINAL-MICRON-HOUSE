import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = 'https://acwgirrldntjpzrhqmdh.supabase.co';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;
  
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
  if (!serviceKey) return res.status(500).json({ error: 'SUPABASE_SERVICE_KEY not configured' });

  const { message, history = [] } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    // Step 1: Extract search terms from the user's question
    // Use multiple search strategies for better recall
    const searchQueries = buildSearchQueries(message);
    
    // Step 2: Run full-text search against all 570 chunks
    const allChunks: any[] = [];
    const seenIds = new Set();
    
    for (const query of searchQueries) {
      const searchRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/search_policy_docs_text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
        },
        body: JSON.stringify({ search_query: query, match_count: 8 }),
      });
      
      if (searchRes.ok) {
        const results = await searchRes.json();
        for (const r of results) {
          const key = `${r.filename}-${r.chunk_index}`;
          if (!seenIds.has(key)) {
            seenIds.add(key);
            allChunks.push(r);
          }
        }
      }
    }
    
    // Sort by rank and take top 12 chunks
    allChunks.sort((a, b) => (b.rank || 0) - (a.rank || 0));
    const topChunks = allChunks.slice(0, 12);
    
    // Step 3: Build context from matched chunks
    let docContext = '';
    if (topChunks.length > 0) {
      docContext = topChunks.map((c, i) => 
        `[Source ${i+1}: ${c.filename}]\n${c.content}`
      ).join('\n\n---\n\n');
    }

    // Step 4: Build the system prompt with RAG context
    const systemPrompt = `You are the Micron House policy research assistant, powered by Claude Opus 4.6. You have access to a searchable archive of 114 policy documents (570 indexed sections) covering autonomous technology legislation for Idaho and Boise.

${topChunks.length > 0 ? `The following document sections were retrieved from the archive as most relevant to the user's question:\n\n${docContext}` : 'No specific documents matched the query. Answer based on your general knowledge of the policy briefs, or suggest the user rephrase their question.'}

Key context:
- Lisa Wood Studio prepared two primary policy briefs: Brief A (Idaho ADS Act) and Brief B (Boise Robot-Enabled Operations Pilot Ordinance)
- Reference legislation: Utah HB 101 (2019, House 70–0, Senate 23–0), Texas SB 2807 (2025, House 96–42, Senate 30–1), TxDMV Chapter 220 implementing rules (eff. Feb 2026)
- Key entities: Micron House (proposed corporate autonomous residence in Boise), Micron Technology, Tesla (Optimus, Cybercab), Theo Wold (policy advisor)

Response formatting — MANDATORY:
- **Cite source documents** by filename when referencing specific provisions
- **Cite specific section numbers** when available (e.g., §545.451, §220.23)
- Use **bold** for key terms, names, vote counts, and important figures
- Use bullet points (- item) to break up lists
- Short paragraphs separated by blank lines — never a wall of text
- Lead with the direct answer, then supporting detail
- Professional, concise language — senior policy advisor tone
- Affirmative framing only`;

    const messages = [
      ...history.map((h: any) => ({ role: h.role, content: h.content })),
      { role: 'user', content: message }
    ];

    // Step 5: Call Claude
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
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
    return res.status(200).json({ 
      response: assistantMessage,
      sources: topChunks.map(c => c.filename).filter((v, i, a) => a.indexOf(v) === i)
    });

  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

/**
 * Build multiple search queries from a user message for better recall.
 * Extracts key phrases and generates variant queries.
 */
function buildSearchQueries(message: string): string[] {
  const queries: string[] = [];
  
  // Original query
  queries.push(message);
  
  // Extract quoted phrases
  const quoted = message.match(/"([^"]+)"/g);
  if (quoted) queries.push(...quoted.map(q => q.replace(/"/g, '')));
  
  // Key legal/policy terms that should boost search
  const legalTerms = [
    'authorization', 'operator', 'automated driving system', 'ADS',
    'driverless', 'autonomous', 'robot', 'pilot', 'ordinance',
    'fleet', 'private property', 'liability', 'insurance',
    'permit', 'safety', 'fiscal', 'preemption', 'sunset',
    'tier', 'regulation', 'PDD', 'SAE', 'J3016',
    'Optimus', 'Cybercab', 'Tesla', 'Waymo', 'Micron',
    'Utah', 'Texas', 'Idaho', 'Boise', 'HB 101', 'SB 2807',
    'Chapter 220', 'Title 49', 'Chapter 38'
  ];
  
  // Find matching terms in the message and search for them
  const lowerMsg = message.toLowerCase();
  const matchedTerms = legalTerms.filter(t => lowerMsg.includes(t.toLowerCase()));
  if (matchedTerms.length > 0) {
    queries.push(matchedTerms.join(' '));
  }
  
  // Remove duplicates
  return [...new Set(queries)].slice(0, 4);
}
