import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://michael-studio.vercel.app/'),
  title: "Michael Medhat | Spatial Director",
  description: "Crafting architectural statements that fuse raw structural honesty with refined details.",
  openGraph: {
    title: "Michael Medhat | Spatial Director",
    description: "Crafting architectural statements that fuse raw structural honesty with refined details.",
    siteName: "Michael Medhat Portfolio",
    images: [
      {
        url: "/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Michael Medhat - Spatial Design Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Medhat | Spatial Director",
    description: "Crafting architectural statements that fuse raw structural honesty with refined details.",
    images: ["/opengraph.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
