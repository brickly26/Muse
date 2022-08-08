export interface Album {
  type: string;
  name: string;
  by: string;
  image: string;
  likedBy: {
    _id: string;
    userName: string;
    image: 'string';
  }[];
}

export interface Artist {
  type: string;
  name: string;
  image: string;
  likedBy: {
    _id: string;
    userName: string;
    image: 'string';
  }[];
}

export interface Song {
  type: string;
  name: string;
  by: string;
  image: string;
  likedBy: {
    _id: string;
    userName: string;
    image: 'string';
  }[];
}