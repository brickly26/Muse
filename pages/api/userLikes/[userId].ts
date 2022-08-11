import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';
import { userLikesQuery } from '../../../utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const { userId } = req.query

    console.log('1', userId)

    const data = await client.fetch(userLikesQuery(userId));

    console.log('2', data)
    
    res.status(200).json(data);
  }
}
