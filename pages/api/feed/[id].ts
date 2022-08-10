import type { NextApiRequest, NextApiResponse } from 'next';
import { followingLikesQuery, userFollowingQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const { id } = req.query

    console.log('1:',id)

    const response1 = await client.fetch(userFollowingQuery(id));

    console.log('2:', response1);
    
    const response = await client.fetch(followingLikesQuery(id));

    res.status(200).json(response1);
  }
}
