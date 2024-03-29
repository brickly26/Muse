import axios from 'axios';
import jwt_decode from 'jwt-decode'
import { Like } from '../types';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const createOrGetUser = async (response: any, addUser: any, fetchUserLikes: any, setRender: any, fetchUserFollowers: any, router: any) => {
  const decoded: { name: string, picture: string, sub: string} = jwt_decode(response.credential);

  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: 'user',
    userName: name, 
    image: picture,
    likes: [],
    followers: [],
    following: []
  }

  addUser(user);
  fetchUserFollowers(user._id);
  fetchUserLikes(user._id);
  setRender('2');
  await axios.post(`${BASE_URL}/api/auth`, user);
  router.reload()
};

export const checkIfAlreadyLiked = (post: any, userLikes: any) => {
  let alreadyLikedId = ''
  const filteredLikes = userLikes.filter((like: Like) => like.spotifyId === post.spotifyId);

  if(filteredLikes.length === 1) {
    alreadyLikedId = filteredLikes[0]._id
  }

  return alreadyLikedId
}

export const checkIfAlreadyFollowing = (user: any, userFollowers: any) => {
  const filteredFollowing = userFollowers[0]?.following.filter((following: any) => user === following._id)

  if(filteredFollowing?.length === 0) {
    return true
  } else {
    return false
  }
}