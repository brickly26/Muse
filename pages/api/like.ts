import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";
import { uuid } from "uuidv4";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { userId, post, like } = req.body;

    console.log(like)

    if(!like) {
      delete post._id;
      post._type = "like";
      post.likedBy = {
        _type: 'reference',
        _ref: userId
      }

      console.log('1');

      const newLike = await client.create(post);

      console.log('2');

      console.log(newLike)

      await client.patch(userId)
        .setIfMissing({ likes: [] })
        .insert('after', 'likes[-1]',  [
          {
            _key: uuid(),
            _ref: newLike._id
          }
        ])
        .commit()

      res.status(200).json(newLike)
    } else  {
      await client
        .patch(userId)
        .unset([`likes[_ref=="${post._id}"]`])
        .commit();

      const data = await client.delete(post._id)

      res.status(200).json(data)
    }
  }
}
