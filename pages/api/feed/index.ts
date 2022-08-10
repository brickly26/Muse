import type { NextApiRequest, NextApiResponse } from 'next';
import { allLikesQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    
    const response = await client.fetch(allLikesQuery());

    res.status(200).json(response);
  }
}
