export const allUsersQuery = () => {
  const query = `*[_type == "user"]`

  return query
}

export const singleUserQuery = (userId: string | string[]) => {
  const query = `*[_type == "user" && _id == '${userId}']`;

  return query;
};

export const profileUserQuery = (userId: string | string[]) => {
  const query = `*[_type == "user" && _id == '${userId}']{
    _id,
    userName,
    image,
    likes[]->,
    following[]->,
    followers[]->
  }`;

  return query;
};

export const userLikesQuery = (userId: string | string[]) => {
  const query = `*[_type == "like"  && likedBy._ref == '${userId}']{
    name,
    _id,
    image,
    type,
    likedBy
  }`;

  return query;
};

export const userFollowersQuery = (userId: string | string[]) => {
  const query = `*[_type == "user"]{
    followers[]->
  }`;

  return query;
};