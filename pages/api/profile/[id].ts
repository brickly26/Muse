import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';
import { profileUserQuery } from '../../../utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const { id } = req.query;

    const user = await client.fetch(profileUserQuery(id));
    
    res.status(200).json(user);
  }
}
