export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Kitchens', value: 'Kitchens' },
          { title: 'Bedrooms', value: 'Bedrooms' },
          { title: 'Bathrooms', value: 'Bathrooms' },
          { title: 'Apartments', value: 'Apartments' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'imagePath',
      title: 'Main Thumbnail',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'imagePath',
    },
  },
};
