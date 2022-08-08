import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../utils/client';
import { uuid } from 'uuidv4';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'PUT') {
    const { userId, likeId, like } = req.body;

    console.log(like);

    const newLike = client.createIfNotExists()

    const data = like ? await client
      .patch(userId)
      .setIfMissing({ likes: [] })
      .insert('after', 'likes[-1]', [
        {
          _key: uuid(),
          _ref: newLike?._id
        }
      ])
      .commit()
    : await client
      .patch(userId)
      .unset([`likedBy`])

    res.status(200).json(data);
  }
}
