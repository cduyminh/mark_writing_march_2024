import redis from '../../lib/redis';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { vote, id } = req.body;
    
    if (vote && id) {
      const key = `row:${id}:${vote}`;
      await redis.incr(key);
      return res.status(200).json({ success: true });
    }

    return res.status(400).json({ error: 'Invalid request' });
  }
  
  res.setHeader('Allow', ['POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
