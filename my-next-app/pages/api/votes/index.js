import redis from '../../../lib/redis';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Fetch votes for a range of IDs
    const { ids } = req.query;
    const rowIds = ids.split(',');
    
    const keysUp = rowIds.map(id => `row:${id}:up`);
    const keysDown = rowIds.map(id => `row:${id}:down`);

    // Fetch all upvotes and downvotes in parallel
    const [upVotes, downVotes] = await Promise.all([
      redis.mget(...keysUp),
      redis.mget(...keysDown),
    ]);

    // Transform the results into a structured response
    const results = rowIds.map((id, index) => ({
      id,
      up: parseInt(upVotes[index], 10) || 0,
      down: parseInt(downVotes[index], 10) || 0,
    }));

    return res.status(200).json(results);
  }

  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
