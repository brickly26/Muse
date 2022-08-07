export default {
  name: 'like',
  title: 'Like',
  type: 'document',
  fields: [
    {
      name: 'category',
      title: 'category',
      type: 'string',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'string',
    },
    {
      name: 'likedBy',
      title: 'LikedBy',
      type: 'reference',
      to: [{ type: 'user' }]
    }
  ]
}