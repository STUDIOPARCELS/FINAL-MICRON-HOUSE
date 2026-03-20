import type { VercelRequest, VercelResponse } from '@vercel/node';

const BASE = 'https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/POLICY%20BRIEFS';

const DOCS = [
  { id: 'brief-a', label: 'BRIEF A — Idaho ADS and Driverless Passenger Service Act', url: `${BASE}/brief-a.html`, type: 'html', limit: 15000 },
  { id: 'brief-b', label: 'BRIEF B — Boise Robot-Enabled Operations Pilot Ordinance', url: `${BASE}/brief-b.html`, type: 'html', limit: 15000 },
  { id: 'utah-hb101', label: 'REFERENCE — Utah HB 101 Autonomous Vehicle Regulations (Enrolled, 2019)', url: `${BASE}/utah-hb101-text.txt`, type: 'text', limit: 25000 },
  { id: 'texas-sb2807', label: 'REFERENCE — Texas SB 2807 Automated Motor Vehicles (Enrolled, 2025)', url: `${BASE}/texas-sb2807-text.txt`, type: 'text', limit: 25000 },
  { id: 'txdmv-ch220', label: 'REFERENCE — TxDMV Chapter 220 Implementing Rules (Adopted, Eff. Feb 2026)', url: `${BASE}/texas-ch220-text.txt`, type: 'text', limit: 20000 },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
  }

  const { message, history = [] } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const results = await Promise.all(
      DOCS.map(async (doc) => {
        try {
          const r = await fetch(doc.url);
          let text = await r.text();
          if (doc.type === 'html') {
            text = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
          }
          return { ...doc, content: text.slice(0, doc.limit) };
        } catch {
          return { ...doc, content: '' };
        }
      })
    );

    const docContext = results
      .filter(d => d.content.length > 0)
      .map(d => `=== ${d.label} ===\n${d.content}`)
      .join('\n\n');

    const systemPrompt = `You are the Micron House policy research assistant, powered by Claude Opus 4.6. You help users understand autonomous technology policy and legislation.

You have access to the following documents from the Micron House research archive (${results.filter(d => d.content).length} of 113+ total documents loaded):

${docContext}

Key entities: Lisa Wood Studio (author), Micron House (the proposed corporate autonomous residence in Boise), Micron Technology, Tesla (Optimus, Cybercab), Theo Wold (policy advisor).

Key vote records:
- Utah HB 101 (2019): House 70–0, Senate 23–0, signed by Governor Herbert
- Texas SB 2807 (2025): House 96–42, Senate 30–1, signed by Governor Abbott, effective 9/1/25
- TxDMV Chapter 220 implementing rules effective February 27, 2026

When answering:
- **Cite specific provisions** by section number when available (e.g., §545.451, §220.3)
- **Compare frameworks** across states when relevant — show how Idaho's proposed legislation builds on Utah and Texas precedent
- Use **bold** for key terms, names, vote counts, and important figures
- Use bullet points (- item) to break up lists of facts, provisions, or requirements
- Use short paragraphs separated by blank lines — never a wall of text
- Lead with the direct answer, then provide supporting detail
- Write in professional, concise language — the way a senior policy advisor speaks
- Affirmative framing only. Describe what provisions accomplish, how frameworks operate, what outcomes result.
- If asked about a document you have partial content for, cite what you can and note the user can open the full document from the reference panel.`;

    const messages = [
      ...history.map((h: any) => ({ role: h.role, content: h.content })),
      { role: 'user', content: message }
    ];

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
    return res.status(200).json({ response: assistantMessage });

  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
