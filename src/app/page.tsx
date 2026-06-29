'use client';

import { useState, useEffect } from 'react';
import StaggeredMenu from '@/components/StaggeredMenu';
import GooeyNav from '@/components/GooeyNav';

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
  fallbackText = "image to be added",
  fallbackClassName = ""
}: {
  src: string;
  alt: string;
  className: string;
  fallbackText?: string;
  fallbackClassName?: string;
}) => {
  const [error, setError] = useState(false);

  if (error) {
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
            { label: 'Insta', link: 'https://instagram.com' },
            { label: 'LinkedIn', link: 'https://linkedin.com' }
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
              fallbackText="image to be added"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[#408175] text-xs font-mono uppercase tracking-widest">// STUDIO FOCUS</span>
            <h1 className="text-4xl font-black tracking-tighter text-[#B5B9F0] uppercase leading-none">
              Michael Medhat
            </h1>
            <div className="flex flex-col gap-1 mt-2 text-xs font-mono text-[#169 15% 65%]">
              <p>• SPATIAL DIRECTOR</p>
              <p>• STRUCTURAL SCHEMES</p>
              <p>• BRUTALIST ORCHESTRATIONS</p>
            </div>
          </div>
          <p className="text-[#169 15% 65%] text-sm leading-relaxed max-w-sm">
            Crafting architectural statements that fuse raw structural honesty with refined brutalist details. Transforming domestic spaces into curated spatial experiences.
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
          <span className="text-lg font-black tracking-widest text-[#B5B9F0]">// Michael Medhat</span>
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
              fallbackText="pending"
            />
            <div>
              <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-[#B5B9F0]">Michael Medhat</h2>
              <p className="text-[10px] text-[#169 15% 65%]">Lead Spatial Architect</p>
            </div>
          </div>
          <p className="text-[11px] leading-relaxed text-[#169 15% 65%] mt-1">
            Crafting architectural statements that fuse raw structural honesty with refined brutalist details.
          </p>
        </div>

        {/* Dynamic Center Arena (Massive Category Links) */}
        <div className="flex-1 flex flex-col justify-center gap-6 md:gap-8">
          <div className="text-[10px] font-mono text-[#408175] tracking-widest uppercase mb-1">
            // SELECT PORTFOLIO
          </div>
          <nav className="flex flex-col gap-2 md:gap-4">
            {categories.map((category) => (
              <a
                key={category}
                href={`#${category.toLowerCase()}`}
                className="group relative inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase text-[#408175] hover:text-[#B5B9F0] transition-colors duration-500 leading-none"
              >
                <span className="relative z-10">{category}</span>
                <span className="absolute left-0 bottom-0 w-0 h-[4px] bg-[#B5B9F0] group-hover:w-full transition-all duration-500"></span>
              </a>
            ))}
          </nav>
        </div>

        {/* Footer (Mobile/Desktop credits) */}
        <div className="flex justify-between items-center text-[10px] font-mono text-[#2E4540] tracking-wider shrink-0 select-none">
          <span className="md:hidden">© 2026 Michael Medhat</span>
          <span>SPATIAL DESIGN SHOWCASE</span>
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
