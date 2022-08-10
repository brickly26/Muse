import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';
import { userFollowingQuery } from '../../../utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const { userId } = req.query;

    console.log(userId)

    const response = await client.fetch(userFollowingQuery(userId));

    console.log(response)

    res.status(200).json(response);
  }
}
