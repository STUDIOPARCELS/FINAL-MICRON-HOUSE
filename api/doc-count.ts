import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = 'https://acwgirrldntjpzrhqmdh.supabase.co';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;
  if (!serviceKey) {
    return res.status(200).json({ count: 0 });
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/storage/v1/object/list/MICRON%20HOUSE`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({ prefix: 'POLICY BRIEFS/', limit: 500 }),
    });

    const data = await response.json();
    
    if (Array.isArray(data)) {
      const count = data.filter((f: any) => f.metadata).length;
      return res.status(200).json({ count });
    }
    
    return res.status(200).json({ count: 0 });
  } catch {
    return res.status(200).json({ count: 0 });
  }
}
