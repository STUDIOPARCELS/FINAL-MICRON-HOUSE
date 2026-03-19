import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = 'https://acwgirrldntjpzrhqmdh.supabase.co/storage/v1/object/public/MICRON%20HOUSE/POLICY%20BRIEFS';

// Pre-built list of all policy brief filenames for context
const BRIEF_INDEX_URL = `${SUPABASE_URL}/brief-a.html`;
const BRIEF_B_URL = `${SUPABASE_URL}/brief-b.html`;

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
    // Fetch both featured brief HTML contents for context
    const [briefARes, briefBRes] = await Promise.all([
      fetch(BRIEF_INDEX_URL).then(r => r.text()).catch(() => ''),
      fetch(BRIEF_B_URL).then(r => r.text()).catch(() => ''),
    ]);

    // Strip HTML tags for plain text context
    const stripHtml = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const briefAText = stripHtml(briefARes).slice(0, 12000);
    const briefBText = stripHtml(briefBRes).slice(0, 12000);

    const systemPrompt = `You are the Micron House Policy Assistant. You help users understand autonomous technology policy briefs prepared by Lisa Wood Studio for Idaho and Boise.

You have access to two primary policy briefs:

BRIEF A — Idaho Automated Driving Systems and Driverless Passenger Service Act:
${briefAText}

BRIEF B — Boise Robot-Enabled Operations Pilot Ordinance:
${briefBText}

Additional context: The Supabase bucket contains 97 policy-related documents including bill texts, fiscal notes, staff analyses, executive summaries, research compilations, legislative packages, and methodology documents. These cover Idaho ADS legislation modeled on Utah HB 101, Boise robot-enabled building operations pilots, and supporting research on autonomous technology policy across U.S. states.

Key entities: Lisa Wood Studio (author), Micron House (the proposed corporate autonomous residence in Boise), Micron Technology, Tesla (Optimus, Cybercab), Theo Wold (policy advisor, former Trump White House, Palantir, Heritage Foundation).

Rules:
- Answer factual questions about the briefs precisely, citing specific provisions, vote counts, and data points.
- Keep answers concise — 2-4 sentences unless the user asks for detail.
- If asked about documents you have no content for, say which document likely covers it and suggest they download it.
- Affirmative framing only. Describe what things are, what they do, what they accomplish.`;

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
        max_tokens: 1024,
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
