import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';
import { allUsersQuery, singleUserQuery } from '../../../utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const { userId } = req.query;

    const user = await client.fetch(singleUserQuery(userId));
    
    res.status(200).json(user);
  }
}
