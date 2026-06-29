'use client';

import { useState, useEffect, useRef } from 'react';
import StaggeredMenu from '@/components/StaggeredMenu';
import GooeyNav from '@/components/GooeyNav';
import VerticalCutReveal from '@/components/fancy/text/vertical-cut-reveal';
import { DiaTextReveal } from '@/components/magicui/dia-text-reveal';

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const BehanceIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M4.654 3c.461 0 .887.035 1.278.14.39.07.711.216.996.391s.497.426.641.747c.14.32.216.711.216 1.137 0 .496-.106.922-.356 1.242-.215.32-.566.606-.997.817.606.176 1.067.496 1.348.922s.461.957.461 1.563c0 .496-.105.922-.285 1.278a2.3 2.3 0 0 1-.782.887c-.32.215-.711.39-1.137.496a5.3 5.3 0 0 1-1.278.176L0 12.803V3zm-.285 3.978c.39 0 .71-.105.957-.285.246-.18.355-.497.355-.887 0-.216-.035-.426-.105-.567a1 1 0 0 0-.32-.355 1.8 1.8 0 0 0-.461-.176c-.176-.035-.356-.035-.567-.035H2.17v2.31c0-.005 2.2-.005 2.2-.005zm.105 4.193c.215 0 .426-.035.606-.07.176-.035.356-.106.496-.216s.25-.215.356-.39c.07-.176.14-.391.14-.641 0-.496-.14-.852-.426-1.102-.285-.215-.676-.32-1.137-.32H2.17v2.734h2.305zm6.858-.035q.428.427 1.278.426c.39 0 .746-.106 1.032-.286q.426-.32.53-.64h1.74c-.286.851-.712 1.457-1.278 1.848-.566.355-1.243.566-2.06.566a4.1 4.1 0 0 1-1.527-.285 2.8 2.8 0 0 1-1.137-.782 2.85 2.85 0 0 1-.712-1.172c-.175-.461-.25-.957-.25-1.528 0-.531.07-1.032.25-1.493.18-.46.426-.852.747-1.207.32-.32.711-.606 1.137-.782a4 4 0 0 1 1.493-.285c.606 0 1.137.105 1.598.355.46.25.817.532 1.102.958.285.39.496.851.641 1.348.07.496.105.996.07 1.563h-5.15c0 .58.21 1.11.496 1.396m2.24-3.732c-.25-.25-.642-.391-1.103-.391-.32 0-.566.07-.781.176s-.356.25-.496.39a.96.96 0 0 0-.25.497c-.036.175-.07.32-.07.46h3.196c-.07-.526-.25-.882-.497-1.132zm-3.127-3.728h3.978v.957h-3.978z" />
  </svg>
);

const categories = ['Kitchens', 'Bathrooms', 'Apartments', 'Bedrooms'] as const;
type Category = typeof categories[number];

interface Project {
  title: string;
  imagePath: string;
  description: string;
}

const projectsData: Record<Category, Project[]> = {
  Kitchens: [
    {
      title: "Minimalist Matte Kitchen",
      imagePath: "/assets/projects/kitchens/minimalist-matte-01.jpg",
      description: "A study in matte textures, integrated storage partitions, and monolithic granite workspaces."
    },
    {
      title: "Monolithic Stone Kitchen",
      imagePath: "/assets/projects/kitchens/monolithic-island-01.jpg",
      description: "Raw marble countertops balanced with custom darkened oak panel overlays."
    },
    {
      title: "Brutalist Concrete Galley",
      imagePath: "/assets/projects/kitchens/brutalist-concrete-01.jpg",
      description: "Cast-in-place concrete surfaces integrated with industrial steel fixtures."
    }
  ],
  Bathrooms: [
    {
      title: "Concrete Spa Chamber",
      imagePath: "/assets/projects/bathrooms/concrete-spa-01.jpg",
      description: "Polished concrete walls offset by warm cedar slats and a sunken stone tub."
    },
    {
      title: "Terrazzo Sanctuary",
      imagePath: "/assets/projects/bathrooms/terrazzo-monolith-01.jpg",
      description: "Monolithic custom terrazzo basin set against brushed stainless plumbing frameworks."
    },
    {
      title: "Minimalist Wetroom",
      imagePath: "/assets/projects/bathrooms/minimalist-wetroom-01.jpg",
      description: "Floor-to-ceiling slate tiles with integrated rain shower apertures."
    }
  ],
  Apartments: [
    {
      title: "Industrial Loft Apartment",
      imagePath: "/assets/projects/apartments/industrial-loft-01.jpg",
      description: "Exposed structural beams, double-height glazing profiles, and modular partition boundaries."
    },
    {
      title: "Tribeca Residence",
      imagePath: "/assets/projects/apartments/tribeca-residence-01.jpg",
      description: "A high-end loft conversion highlighting clean plaster finishes and solid oak floors."
    },
    {
      title: "Brutalist Flat",
      imagePath: "/assets/projects/apartments/brutalist-flat-01.jpg",
      description: "Textured raw concrete ceilings paired with minimalist gallery-style lighting profiles."
    }
  ],
  Bedrooms: [
    {
      title: "Editorial Suite",
      imagePath: "/assets/projects/bedrooms/editorial-suite-01.jpg",
      description: "A master bedroom featuring an integrated concrete platform bed and linear shadow gaps."
    },
    {
      title: "Minimalist Retreat",
      imagePath: "/assets/projects/bedrooms/minimalist-retreat-01.jpg",
      description: "Low-profile furnishings set against raw acoustic wood paneling contours."
    },
    {
      title: "Concrete Alcove Bedroom",
      imagePath: "/assets/projects/bedrooms/concrete-alcove-01.jpg",
      description: "Recessed sleeping alcove formed from board-marked architectural concrete."
    }
  ]
};

const SafeImage = ({
  src,
  alt,
  className,
  type = "project",
  fallbackText = "image to be added",
  fallbackClassName = ""
}: {
  src: string;
  alt: string;
  className: string;
  type?: "person" | "project";
  fallbackText?: string;
  fallbackClassName?: string;
}) => {
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img) {
      if (img.complete && img.naturalWidth === 0) {
        setError(true);
      }
    }
  }, [src]);

  if (error) {
    if (type === "person") {
      return (
        <div className={`flex items-center justify-center bg-[#0d0d0d] border border-[#2E4540]/50 p-2 text-center select-none ${className} ${fallbackClassName}`}>
          <div className="w-2/3 h-2/3 max-w-[120px] aspect-square flex items-center justify-center opacity-85">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-[#408175]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Le Corbusier style glasses + turtleneck architect icon */}
              <circle cx="50" cy="35" r="18" />
              <circle cx="44" cy="35" r="5" className="stroke-[#B5B9F0]" />
              <circle cx="56" cy="35" r="5" className="stroke-[#B5B9F0]" />
              <line x1="49" y1="35" x2="51" y2="35" className="stroke-[#B5B9F0]" />
              <path d="M25 80 C25 65 35 55 50 55 C65 55 75 65 75 80" />
              <path d="M44 55 H56 V62 H44 Z" className="fill-[#0B0909]" />
            </svg>
          </div>
        </div>
      );
    }

    return (
      <div className={`flex items-center justify-center bg-[#0d0d0d] border border-[#2E4540]/50 p-2 text-center select-none ${className} ${fallbackClassName}`}>
        <span className="text-[9px] font-mono text-[#408175] tracking-wider uppercase leading-tight">
          {fallbackText}
        </span>
      </div>
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

  const activeIndex = activeCategory ? categories.indexOf(activeCategory) : -1;

  // Sync category state with URL Hash for robust routing (back button, deep link support)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const matched = categories.find(c => c.toLowerCase() === hash.toLowerCase());
      if (matched) {
        setActiveCategory(matched);
      } else {
        setActiveCategory(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run once on mount
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const closeCategory = () => {
    window.location.hash = '';
  };

  const menuItems = categories.map(cat => ({
    label: cat,
    link: `#${cat.toLowerCase()}`
  }));

  const navItems = categories.map(cat => ({
    label: cat,
    href: `#${cat.toLowerCase()}`
  }));

  return (
    <main className="w-full h-dvh overflow-hidden flex flex-col md:flex-row relative bg-[#0B0909] text-[#B5B9F0] font-sans">

      {/* Mobile Navbar Block (StaggeredMenu) */}
      <div className="md:hidden w-full h-[80px] shrink-0 relative z-40 bg-[#0B0909]">
        <StaggeredMenu
          isFixed={true}
          position="right"
          accentColor="hsl(236 67% 83%)"
          colors={['hsl(167 20% 12%)', 'hsl(167 20% 23%)']}
          items={menuItems}
          socialItems={[
            { label: 'Insta', link: 'https://instagram.com/mickel_medhat' },
            { label: 'Behance', link: 'https://behance.net' }
          ]}
          logoUrl="" // Empty string renders text fallback inside component
          onContactClick={() => setContactOpen(true)}
        />
      </div>

      {/* Left Panel - Bio (Desktop Only) */}
      <div className="hidden md:flex w-full md:w-[40%] h-full flex-col justify-between p-12 border-r border-[#2E4540] overflow-hidden shrink-0 select-none">
        <div className="flex flex-col gap-8">
          <div className="border border-[#2E4540] p-1 bg-[#167 20% 12%]">
            <SafeImage
              src="/profile_photo.jpeg"
              alt="Michael Medhat"
              className="w-full h-[280px] object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
              type="person"
              fallbackText="image to be added"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[#408175] text-xs font-mono uppercase tracking-widest">// STUDIO FOCUS</span>
            <h1 className="text-4xl font-black tracking-tighter text-[#B5B9F0] uppercase leading-none">
              Michael Medhat
            </h1>
            <div className="flex flex-col gap-1 mt-2 text-xs font-mono text-[#169 15% 65%]">
              <p><VerticalCutReveal staggerDuration={0.04} splitBy="characters">• SPATIAL DIRECTOR</VerticalCutReveal></p>
              <p><VerticalCutReveal staggerDuration={0.04} splitBy="characters" transition={{ type: 'spring', stiffness: 190, damping: 22, delay: 0.25 }}>• STRUCTURAL SCHEMES</VerticalCutReveal></p>
              <p><VerticalCutReveal staggerDuration={0.04} splitBy="characters" transition={{ type: 'spring', stiffness: 190, damping: 22, delay: 0.5 }}>• BRUTALIST ORCHESTRATIONS</VerticalCutReveal></p>
            </div>
          </div>
          <p className="text-[#169 15% 65%] text-sm leading-relaxed max-w-sm">
            <VerticalCutReveal splitBy="words" staggerDuration={0.06} transition={{ type: 'spring', stiffness: 160, damping: 22, delay: 0.6 }}>
              Crafting architectural statements that fuse raw structural honesty with refined details. Transforming domestic spaces into curated spatial experiences.
            </VerticalCutReveal>
          </p>
        </div>

        {/* Footer (Left-pinned metadata) */}
        <div className="text-[10px] font-mono text-[#2E4540] tracking-wider uppercase">
          © 2026 Michael Medhat. All Rights Reserved.
        </div>
      </div>

      {/* Right Panel - Interactive View */}
      <div className="w-full md:w-[60%] h-[calc(100dvh-80px)] md:h-full flex flex-col justify-between p-6 md:p-12 overflow-hidden bg-[#0B0909]">

        {/* Desktop Navbar (GooeyNav) */}
        <div className="hidden md:flex justify-between items-center w-full">
          <span className="text-lg font-black tracking-widest text-[#B5B9F0]">// Michael</span>
          <div className="flex items-center gap-6">
            <GooeyNav
              items={navItems}
              activeIndex={activeIndex}
              onChange={(index) => {
                window.location.hash = categories[index].toLowerCase();
              }}
            />
            <button
              onClick={() => setContactOpen(true)}
              className="px-6 py-2 border border-[#B5B9F0] text-xs font-mono uppercase tracking-widest text-[#B5B9F0] hover:bg-[#B5B9F0] hover:text-[#0B0909] transition-all duration-300 rounded-none cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Compact Profile Block (Mobile Only) */}
        <div className="flex flex-col gap-2 md:hidden p-1 border-b border-[#2E4540]/30 pb-4 shrink-0 select-none">
          <div className="flex items-center gap-3">
            <SafeImage
              src="/profile_photo.jpeg"
              alt="Michael Medhat"
              className="w-10 h-10 object-cover border border-[#2E4540] grayscale"
              type="person"
              fallbackText="pending"
            />
            <div>
              <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-[#B5B9F0]">Michael Medhat</h2>
              <p className="text-[10px] text-[#169 15% 65%]">Lead Spatial Architect</p>
            </div>
          </div>
          <p className="text-[11px] leading-relaxed text-[#169 15% 65%] mt-1">
            <VerticalCutReveal splitBy="words" staggerDuration={0.05} transition={{ type: 'spring', stiffness: 170, damping: 22, delay: 0.3 }}>
              Crafting architectural statements that fuse raw structural honesty with refined details.
            </VerticalCutReveal>
          </p>
        </div>

        {/* Dynamic Center Arena (Massive Category Links) */}
        <div className="flex-1 flex flex-col justify-center gap-6 md:gap-8">
          <div className="text-[10px] font-mono text-[#408175] tracking-widest uppercase mb-1">
            // SELECT PORTFOLIO
          </div>
          <nav className="flex flex-col gap-2 md:gap-4">
            {categories.map((category, catIdx) => (
              <a
                key={category}
                href={`#${category.toLowerCase()}`}
                className="group relative inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase leading-none"
              >
                <DiaTextReveal
                  text={category}
                  textColor="#408175"
                  colors={['#B5B9F0', '#408175', '#c6ffd0', '#B5B9F0']}
                  duration={1.2}
                  delay={0.3 + catIdx * 0.2}
                  className="group-hover:opacity-80 transition-opacity duration-300"
                />
                <span className="absolute left-0 bottom-0 w-0 h-[4px] bg-[#B5B9F0] group-hover:w-full transition-all duration-500"></span>
              </a>
            ))}
          </nav>
        </div>

        {/* Footer (Mobile/Desktop credits) */}
        <div className="flex justify-between items-center text-[10px] font-mono text-[#2E4540] tracking-wider shrink-0 select-none border-t border-[#2E4540]/30 pt-4">
          <span className="md:hidden">© 2026 Michael Medhat</span>
          <span>SPATIAL DESIGN SHOWCASE</span>

          {/* Desktop Social Links */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://instagram.com/mickel_medhat"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center border border-[#2E4540] hover:border-[#B5B9F0] text-[#408175] hover:text-[#B5B9F0] bg-[#0d0d0d] transition-all duration-300 pointer-events-auto"
              title="Instagram"
            >
              <InstagramIcon size={14} />
            </a>
            <a
              href="https://behance.net"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center border border-[#2E4540] hover:border-[#B5B9F0] text-[#408175] hover:text-[#B5B9F0] bg-[#0d0d0d] transition-all duration-300 pointer-events-auto"
              title="Behance"
            >
              <BehanceIcon size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Category Full Takeover Project View */}
      {activeCategory && (
        <div className="fixed inset-0 z-50 bg-[#0B0909] text-[#B5B9F0] overflow-y-auto flex flex-col p-6 md:p-16 border-4 border-[#2E4540]">
          {/* Takeover Header */}
          <div className="flex justify-between items-center border-b border-[#2E4540] pb-6 mb-8">
            <div>
              <span className="text-xs font-mono text-[#408175] tracking-widest uppercase">// EXPLORE SPECIMENS</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#B5B9F0]">{activeCategory}</h2>
            </div>
            <button
              onClick={closeCategory}
              className="px-6 py-3 border-2 border-[#B5B9F0] bg-transparent text-sm font-mono uppercase tracking-widest text-[#B5B9F0] hover:bg-[#B5B9F0] hover:text-[#0B0909] transition-all duration-300 rounded-none cursor-pointer"
            >
              Close [X]
            </button>
          </div>

          {/* Project Specimen Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projectsData[activeCategory].map((project) => (
              <div key={project.title} className="border border-[#2E4540] p-4 bg-[#167 20% 12%] flex flex-col gap-4">
                {/* Mock Picture Box */}
                <div className="w-full h-64 bg-[#0B0909] border border-[#2E4540] relative overflow-hidden group">
                  <SafeImage
                    src={project.imagePath}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                    fallbackText="image to be added"
                  />
                  <div className="absolute inset-0 bg-[#408175]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-[#B5B9F0] uppercase">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#169 15% 65%] mt-1">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Studio Overlay */}
      {contactOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0B0909]/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#167 20% 12%] border-2 border-[#B5B9F0] p-8 max-w-md w-full relative">
            <button
              onClick={() => setContactOpen(false)}
              className="absolute top-4 right-4 text-xs font-mono text-[#B5B9F0] hover:text-[#408175] uppercase cursor-pointer"
            >
              [Close]
            </button>
            <h3 className="text-2xl font-black uppercase text-[#B5B9F0] tracking-tighter mb-4">// CONTACT STUDIO</h3>
            <div className="flex flex-col gap-4 text-sm font-mono text-[#169 15% 65%]">
              <div>
                <span className="text-[#408175] text-xs font-bold block mb-1">EMAIL</span>
                <a href="mailto:michael@arch.com" className="text-[#B5B9F0] hover:underline">michael@arch.com</a>
              </div>
              <div>
                <span className="text-[#408175] text-xs font-bold block mb-1">OFFICES</span>
                <span className="text-[#B5B9F0]">Cairo / Minya</span>
              </div>
              <div className="border-t border-[#2E4540] pt-4 mt-2">
                <p className="text-xs">Available for selective private residential commissions.</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
