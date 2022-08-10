import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../utils/client";
import { uuid } from "uuidv4";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { currUser, userToFollow, follow } = req.body;

    if(!follow) {
      await client.patch(currUser)
        .setIfMissing({ following: [] })
        .insert('after', 'following[-1]',  [
          {
            _key: uuid(),
            _ref: userToFollow
          }
        ])
        .commit()

      await client.patch(userToFollow)
        .setIfMissing({ followers: [] })
        .insert('after', 'followers[-1]',  [
          {
            _key: uuid(),
            _ref: currUser
          }
        ])
        .commit()

    res.status(200).json('User followed Success')
    } else  {
      await client
        .patch(currUser)
        .unset([`following[_ref=="${userToFollow}"]`])
        .commit();

      await client
        .patch(userToFollow)
        .unset([`followers[_ref=="${currUser}"]`])
        .commit();

      res.status(200).json('User unfollowed success')
    }
  }
}
