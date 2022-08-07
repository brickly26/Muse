export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'User Name',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'string'
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'like' }]
        },
      ],
    },
    {
      name: 'followers',
      title: 'Followers',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'user' }]
        }
      ]
    },
    {
      name: 'followering',
      title: 'Followering',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'user' }]
        }
      ]
    }
  ]
}