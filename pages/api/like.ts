import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";
import { uuid } from "uuidv4";
import { arrayBuffer } from "stream/consumers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { userId, post, like, alreadyPosted } = req.body;

    if(alreadyPosted.length <= 0) {

      delete post._id;
      post._type = "like";

      const newLike = await client.create(post);

      await client.patch(newLike._id)
        .setIfMissing({ likedBy: [] })
        .insert('after', 'likedBy[-1]', [
          {
            _key: uuid(),
            _ref: userId
          }
        ])
        .commit()

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
    } else {
      if(!like) {

        console.log('1')

        await client
          .patch(userId)
          .setIfMissing({ likes: [] })
          .insert('after', 'likes[-1]', [
            {
              _key: uuid(),
              _ref: alreadyPosted
            }
          ])
          .commit()

        console.log('2')
  
        const data = await client
          .patch(alreadyPosted)
          .setIfMissing({ likedBy: [] })
          .insert('after', 'likedBy[-1]', [
            {
              _key: uuid(),
              _ref: userId
            }
          ])
          .commit()

        console.log('3')
  
        res.status(200).json(data)
      } else  {
        await client
        .patch(userId)
        .unset([`likes[_ref=="${post._id}"]`])
        .commit();
  
        const data = await client
          .patch(post._id)
          .unset([`likedBy[_ref=="${userId}"]`])
          .commit();
  
        res.status(200).json(data)
      }
  
    }
  }
}
