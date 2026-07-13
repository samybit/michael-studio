import { groq } from 'next-sanity';
import { sanityClient } from '@/lib/sanity';
import HomeClient, { type Project } from './HomeClient';

const categories = ['Kitchens', 'Bedrooms', 'Bathrooms', 'Apartments'] as const;
type Category = typeof categories[number];

// ---------------------------------------------------------------------------
// Static fallback — used when Sanity has no data or is unconfigured
// ---------------------------------------------------------------------------
const fallbackData: Record<Category, Project[]> = {
  Kitchens: [
    {
      title: 'Minimalist Matte Kitchen',
      imagePath: '/placeholder.jpg',
      description: 'A study in matte textures, integrated storage partitions, and monolithic granite workspaces.',
    },
    {
      title: 'Monolithic Stone Kitchen',
      imagePath: '/placeholder.jpg',
      description: 'Raw marble countertops balanced with custom darkened oak panel overlays.',
    },
    {
      title: 'Brutalist Concrete Galley',
      imagePath: '/placeholder.jpg',
      description: 'Cast-in-place concrete surfaces integrated with industrial steel fixtures.',
    },
  ],
  Bathrooms: [
    {
      title: 'Concrete Spa Chamber',
      imagePath: '/projects/bathrooms/bathroom-1/bathroom-1.jpg',
      description: 'Polished concrete walls offset by warm cedar slats and a sunken stone tub.',
      gallery: [
        '/projects/bathrooms/bathroom-1/image-1.jpg',
        '/projects/bathrooms/bathroom-1/image-2.jpg',
        '/projects/bathrooms/bathroom-1/image-3.jpg',
        '/projects/bathrooms/bathroom-1/image-4.jpg',
      ],
    },
  ],
  Apartments: [
    {
      title: 'Brutalist Concrete Loft',
      imagePath: '/projects/apartments/apartment-1/apartment-1.jpg',
      description: 'A study in material honesty, featuring board-marked concrete structures, double-height volumes, and minimalist furnishings that frame open urban views.',
      gallery: [
        '/projects/apartments/apartment-1/image-1.jpg',
      ],
    },
    {
      title: 'Minimalist Plaster Penthouse',
      imagePath: '/projects/apartments/apartment-2/apartment-2.jpg',
      description: 'An expansive high-floor residence defined by off-white textured plaster partitions, monolithic stone islands, and structural frames that embrace city skyline silhouettes.',
      gallery: [
        '/projects/apartments/apartment-2/image-1.jpg',
      ],
    },
  ],
  Bedrooms: [
    {
      title: 'Editorial Suite',
      imagePath: '/projects/bedrooms/bedroom-1/bedroom-1.jpg',
      description: 'A master bedroom featuring an integrated concrete platform bed and linear shadow gaps.',
      gallery: [
        '/projects/bedrooms/bedroom-1/image-1.jpg',
        '/projects/bedrooms/bedroom-1/image-2.jpg',
        '/projects/bedrooms/bedroom-1/image-3.jpg',
        '/projects/bedrooms/bedroom-1/image-4.jpg',
      ],
    },
  ],
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
