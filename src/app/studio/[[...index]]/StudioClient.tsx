'use client';

import dynamic from 'next/dynamic';
import type { Config } from 'sanity';

const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false },
);

export function StudioClient({ config }: { config: Config }) {
  return <NextStudio config={config} />;
}
