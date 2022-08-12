import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';
import { userLikesQuery } from '../../../utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const { userId } = req.query

    const data = await client.fetch(userLikesQuery(userId));
    
    res.status(200).json(data);
  }
}
