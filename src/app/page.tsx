import { groq } from 'next-sanity';
import { sanityClient } from '@/lib/sanity';
import HomeClient, { type Project } from './HomeClient';

const categories = ['Kitchens', 'Bedrooms', 'Bathrooms', 'Apartments'] as const;
type Category = typeof categories[number];

// ---------------------------------------------------------------------------
// Static fallback — used when Sanity has no data or is unconfigured
// ---------------------------------------------------------------------------
const fallbackData: Record<Category, Project[]> = {
  Kitchens: [],
  Bathrooms: [],
  Apartments: [],
  Bedrooms: [],
};

// ---------------------------------------------------------------------------
// GROQ query — resolves image references directly to CDN URLs server-side
// ---------------------------------------------------------------------------
const PROJECTS_QUERY = groq`*[_type == "project"]{
  title,
  description,
  category,
  "imagePath": imagePath.asset->url,
  "gallery": gallery[].asset->url
}`;

interface SanityProject {
  title: string;
  description: string;
  category: string;
  imagePath: string | null;
  gallery: (string | null)[] | null;
}

async function fetchProjectsData(): Promise<Record<Category, Project[]>> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';

  // Skip fetch if the project ID hasn't been configured
  if (!projectId || projectId === 'YOUR_PROJECT_ID_HERE') {
    return fallbackData;
  }

  try {
    const raw: SanityProject[] = await sanityClient.fetch(PROJECTS_QUERY);

    if (!raw || raw.length === 0) return fallbackData;

    // Group by category and map image URLs
    const grouped: Record<Category, Project[]> = {
      Kitchens: [],
      Bedrooms: [],
      Bathrooms: [],
      Apartments: [],
    };

    for (const doc of raw) {
      const cat = doc.category as Category;
      if (!categories.includes(cat)) continue;

      grouped[cat].push({
        title: doc.title,
        description: doc.description,
        imagePath: doc.imagePath ?? '/placeholder.jpg',
        gallery: doc.gallery
          ? (doc.gallery.filter(Boolean) as string[])
          : undefined,
      });
    }

    // Fall back to static data for any empty category
    for (const cat of categories) {
      if (grouped[cat].length === 0) {
        grouped[cat] = fallbackData[cat];
      }
    }

    return grouped;
  } catch {
    // Network or query error — silently return static fallback
    return fallbackData;
  }
}

// ---------------------------------------------------------------------------
// Async Server Component — fetches data, renders the client shell
// ---------------------------------------------------------------------------
export default async function Home() {
  const projectsData = await fetchProjectsData();
  return <HomeClient projectsData={projectsData} />;
}
