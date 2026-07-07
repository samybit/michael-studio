/**
 * Embedded Sanity Studio — available at /studio
 *
 * Metadata lives here (server component). The heavy Studio bundle
 * is loaded in StudioClient via dynamic() + ssr:false (client component).
 */
import type { Metadata } from 'next';
import config from '../../../../sanity.config';
import { StudioClient } from './StudioClient';

export const metadata: Metadata = {
  title: 'Sanity Studio — Michael Medhat',
  robots: { index: false },
};

export default function StudioPage() {
  return <StudioClient config={config} />;
}

