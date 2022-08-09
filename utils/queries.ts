export const allUsersQuery = () => {
  const query = `*[_type == "user"]`

  return query
}

export const singleUserQuery = (userId: string | string[]) => {
  const query = `*[_type == "user" && _id == '${userId}']`;

  return query;
};

export const userLikesQuery = (userId: string | string[]) => {
  const query = `*[_type == "like" && likedBy == '${userId}']{
    name,
    _id,
    image,
    type,
    likedBy
  }`;

  return query;
};