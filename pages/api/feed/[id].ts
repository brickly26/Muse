import type { NextApiRequest, NextApiResponse } from 'next';
import { followingLikesQuery, userFollowingQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const { id } = req.query

    const response1 = await client.fetch(userFollowingQuery(id));

    const followingArr = response1[0].following.map((user:any) => user._id)
    
    const response = await client.fetch(followingLikesQuery(followingArr));

    res.status(200).json(response);
  }
}
