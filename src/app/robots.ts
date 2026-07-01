import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Disallow any internal or API routes you don't want Google to index
      disallow: ['/api/'],
    },
    // Using the deployment URL from your configuration
    sitemap: 'https://michael-studio.vercel.app/sitemap.xml',
  };
}