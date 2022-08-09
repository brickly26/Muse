export interface Like {
  length: number;
  _id: string;
  type: string;
  name: string;
  by: string[];
  image: string;
  likedBy: {
    _id: string;
    userName: string;
    image: 'string';
  }[];
}

export interface IUser {
  _id: string;
  _type: string;
  userName: string;
  image: string;
  likes: {
    _id: string;
    name: string;
    image: string;
  }[];
  followers: {
    _id: string;
    userName: string;
    image: string
  }[];
  followering: {
    _id: string;
    userName: string;
    image: string
  }[]
}