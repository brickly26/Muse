import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST') {
    const user = req.body;
    
    await client.createIfNotExists(user);

    res.status(200).json('Login success');
  }
}
