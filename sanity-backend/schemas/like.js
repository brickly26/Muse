export default {
  name: 'like',
  title: 'Like',
  type: 'document',
  fields: [
    {
      name: 'type',
      title: 'Type',
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
      name: 'by',
      title: 'By',
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