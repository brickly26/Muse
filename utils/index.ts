import axios from 'axios';
import jwt_decode from 'jwt-decode'
import { Like } from '../types';
import useAuthStore from '../store/authStore';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const createOrGetUser = async (response: any, addUser: any, fetchUserLikes: any, router: any) => {
  const decoded: { name: string, picture: string, sub: string} = jwt_decode(response.credential);

  const { name, picture, sub } = decoded;

  const user = {
    _id: sub,
    _type: 'user',
    userName: name, 
    image: picture,
    followers: [],
    following: []
  }

  addUser(user);
  await axios.post(`${BASE_URL}/api/auth`, user);
  router.push('/')
};

export const checkIfAlreadyLiked = (post: any) => {
  const { userLikes } = useAuthStore();
  let alreadyLikedId = ''
  const filteredLikes = userLikes.filter((like: Like) => like.image === post.image);
  if(filteredLikes.length > 0) {
    filteredLikes.forEach((like: Like) => {
      if (post.type === like.type && post.name === like.name) {
        alreadyLikedId = like._id
      }
    })
  }

  return alreadyLikedId
}