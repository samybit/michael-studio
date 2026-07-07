/**
 * Embedded Sanity Studio — available at /studio
 *
 * The catch-all segment [[...index]] lets the Studio router handle
 * all sub-paths (/studio/desk, /studio/vision, etc.).
 * Dynamic import with ssr:false keeps the heavy Studio bundle out of
 * the main app chunk.
 */
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import config from '../../../../sanity.config';

export const metadata: Metadata = {
  title: 'Sanity Studio — Michael Medhat',
  robots: { index: false },
};

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false },
);

export default function StudioPage() {
  return <NextStudio config={config} />;
}
