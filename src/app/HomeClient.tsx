'use client';

import { useState, useEffect, useRef } from 'react';
import StaggeredMenu from '@/components/StaggeredMenu';
import GooeyNav from '@/components/GooeyNav';
import VerticalCutReveal from '@/components/fancy/text/vertical-cut-reveal';
import { DiaTextReveal } from '@/components/magicui/dia-text-reveal';
import { ExpandableProjectCard } from '@/components/ExpandableProjectCard';
import { SafeImage } from '@/components/SafeImage';
import { Logo } from '@/components/Logo';
import TrailingImage from '@/components/animata/image/trailing-image';

const backgroundImages = ['/bg.jpg', '/bg2.jpg', '/bg3.jpg'];

const projectImages = [
  "/projects/bathrooms/image-1.jpg",
  "/projects/bathrooms/image-2.jpg",
  "/projects/bathrooms/image-3.jpg",
  "/projects/bathrooms/image-4.jpg",
  "/projects/bathrooms/bathroom-1.jpg",
  "/projects/bedrooms/bedroom-1/bedroom-1.jpg",
  "/projects/bedrooms/bedroom-1/image-1.jpg",
  "/projects/bedrooms/bedroom-1/image-2.jpg",
  "/projects/bedrooms/bedroom-1/image-3.jpg",
  "/projects/bedrooms/bedroom-1/image-4.jpg",
];

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

const categories = ['Kitchens', 'Bedrooms', 'Bathrooms', 'Apartments'] as const;
type Category = typeof categories[number];

export interface Project {
  title: string;
  imagePath: string;
  description: string;
  gallery?: string[];
}

const ThemeContrastIcon = ({ activeTheme }: { activeTheme: string }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    className={`transition-transform duration-500 ease-out ${activeTheme === 'navy' ? 'rotate-180' : ''}`}
  >
    <rect x="3" y="3" width="18" height="18" />
    <polygon points="3,21 21,21 21,3" fill="currentColor" />
  </svg>
);

interface HomeClientProps {
  projectsData: Record<Category, Project[]>;
}

export default function HomeClient({ projectsData }: HomeClientProps) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [theme, setTheme] = useState<'charcoal' | 'navy'>('charcoal');
  const categoriesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'charcoal' | 'navy';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(`theme-${savedTheme}`);
    } else {
      document.documentElement.classList.add('theme-charcoal');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'charcoal' ? 'navy' : 'charcoal';
    setTheme(newTheme);
    document.documentElement.classList.remove('theme-charcoal', 'theme-navy');
    document.documentElement.classList.add(`theme-${newTheme}`);
    localStorage.setItem('theme', newTheme);
  };

  // the State for the background cycle
  const [bgLoaded, setBgLoaded] = useState(false);
  const [bgImage, setBgImage] = useState(backgroundImages[0]);

  // the State to track finger movement on mobile
  const [touchHoveredCategory, setTouchHoveredCategory] = useState<string | null>(null);

  // Function to detect which category is currently under the moving finger
  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const category = element?.closest('[data-category]')?.getAttribute('data-category');

    if (category) {
      setTouchHoveredCategory(category);
    } else {
      setTouchHoveredCategory(null);
    }
  };

  const activeIndex = activeCategory ? categories.indexOf(activeCategory) : -1;

  // the Cycle logic effect
  useEffect(() => {
    // Read the last used index
    const storedIndex = localStorage.getItem('michael_bg_index');

    // Calculate the next index in the sequence (0 -> 1 -> 2 -> 0)
    const nextIndex = storedIndex ? (parseInt(storedIndex, 10) + 1) % backgroundImages.length : 0;

    // Save it for the next refresh
    localStorage.setItem('michael_bg_index', nextIndex.toString());

    // Apply the image and trigger the fade-in
    setBgImage(backgroundImages[nextIndex]);
    setBgLoaded(true);
  }, []);

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
    <main className="w-full h-dvh overflow-hidden flex flex-col md:flex-row relative bg-background text-foreground font-sans">

      {/* Blurred Background Image */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-cover bg-center blur-md scale-110 transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: `url('${bgImage}')`,
          opacity: bgLoaded ? 0.25 : 0
        }}
      />



      {/* Mobile Navbar Block (StaggeredMenu) */}
      <div className="md:hidden w-full h-[80px] shrink-0 relative z-40 bg-background">
        <StaggeredMenu
          isFixed={true}
          position="right"
          accentColor="var(--accent)"
          // Pass a sequence of colors to create the staggered trail
          colors={['var(--accent)', 'var(--secondary)', 'var(--muted)', 'var(--card)']}
          items={menuItems}
          socialItems={[
            { label: 'Insta', link: 'https://instagram.com/mickel_medhat' },
            { label: 'Behance', link: 'https://behance.net' }
          ]}
          logo={<Logo className="h-6 w-auto text-foreground" />}
          onContactClick={() => setContactOpen(true)}
          theme={theme}
          onThemeToggle={toggleTheme}
        />
      </div>

      {/* Left Panel - Bio (Desktop Only) */}
      <div className="hidden md:flex w-full md:w-[40%] h-full flex-col justify-between p-12 border-r border-border overflow-hidden shrink-0 select-none">
        <div className="flex flex-col gap-8">
          <div className="border border-border p-1 bg-card">
            <div className="w-full h-[280px] relative overflow-hidden">
              <SafeImage
                src="/profile_photo.jpg"
                alt="Michael Medhat"
                className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                type="person"
                fallbackText="image to be added"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-accent text-xs font-mono uppercase tracking-widest">// STUDIO FOCUS</span>
            <h1 className="text-4xl font-black tracking-tighter text-foreground uppercase leading-none">
              Michael Medhat
            </h1>
            <div className="flex flex-col gap-1 mt-2 text-xs font-mono text-muted-foreground">
              <p><VerticalCutReveal staggerDuration={0.04} splitBy="characters">• SPATIAL DIRECTOR</VerticalCutReveal></p>
              <p><VerticalCutReveal staggerDuration={0.04} splitBy="characters" transition={{ type: 'spring', stiffness: 190, damping: 22, delay: 0.25 }}>• STRUCTURAL SCHEMES</VerticalCutReveal></p>
              <p><VerticalCutReveal staggerDuration={0.04} splitBy="characters" transition={{ type: 'spring', stiffness: 190, damping: 22, delay: 0.5 }}>• BRUTALIST ORCHESTRATIONS</VerticalCutReveal></p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
            <VerticalCutReveal splitBy="words" staggerDuration={0.06} transition={{ type: 'spring', stiffness: 160, damping: 22, delay: 0.6 }}>
              Crafting architectural statements that fuse raw structural honesty with refined details. Transforming domestic spaces into curated spatial experiences.
            </VerticalCutReveal>
          </p>
        </div>

        {/* Footer (Left-pinned metadata) */}
        <div className="text-[10px] font-mono text-muted-foreground/60 tracking-wider uppercase">
          © 2026 Michael Medhat. All Rights Reserved.
        </div>
      </div>

      {/* Right Panel - Interactive View */}
      <div className="w-full md:w-[60%] h-[calc(100dvh-80px)] md:h-full flex flex-col justify-between p-6 md:p-12 overflow-hidden bg-transparent">

        {/* Desktop Navbar (GooeyNav) */}
        <div className="hidden md:flex justify-between items-center w-full">
          <div className="h-10 flex items-center shrink-0 gap-3">
            <Logo className="h-10 w-auto text-foreground" />
            <button
              onClick={toggleTheme}
              className="w-7 h-7 flex items-center justify-center border border-border text-foreground hover:bg-foreground hover:text-background transition-all duration-300 cursor-pointer overflow-hidden"
              aria-label="Toggle Theme"
              title={theme === 'charcoal' ? 'Switch to Cream Red' : 'Switch to Warm Charcoal'}
            >
              <ThemeContrastIcon activeTheme={theme} />
            </button>
          </div>
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
              className="px-6 py-2 border border-foreground text-xs font-mono uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all duration-300 rounded-none cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Compact Profile Block (Mobile Only) */}
        <div className="flex flex-col gap-2 md:hidden p-1 border-b border-border/30 pb-4 shrink-0 select-none">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative overflow-hidden shrink-0">
              <SafeImage
                src="/profile_photo.jpg"
                alt="Michael Medhat"
                className="w-full h-full object-cover border border-border grayscale"
                type="person"
                fallbackText="pending"
              />
            </div>
            <div>
              <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-foreground">Michael Medhat</h2>
              <p className="text-[10px] text-muted-foreground">Lead Spatial Architect</p>
            </div>
          </div>
          <p className="text-[11px] leading-relaxed text-muted-foreground mt-1">
            <VerticalCutReveal splitBy="words" staggerDuration={0.05} transition={{ type: 'spring', stiffness: 170, damping: 22, delay: 0.3 }}>
              Crafting architectural statements that fuse raw structural honesty with refined details.
            </VerticalCutReveal>
          </p>
        </div>

        {/* Dynamic Center Arena (Massive Category Links) */}
        <TrailingImage
          images={projectImages}
          maxTrailZIndex={5}
          className="flex-1 flex flex-col justify-center gap-6 md:gap-8"
        >
          <div className="text-[10px] font-mono text-accent tracking-widest uppercase mb-1 relative z-10">
            // SELECT PORTFOLIO
          </div>
          <nav
            ref={categoriesContainerRef}
            className="flex flex-col gap-2 md:gap-4 select-none touch-none relative"
            onTouchStart={handleTouchMove}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setTouchHoveredCategory(null)}
            onMouseLeave={() => setTouchHoveredCategory(null)}
          >
            {categories.map((category, catIdx) => {
              const isHovered = touchHoveredCategory === category;

              return (
                <a
                  key={category}
                  href={`#${category.toLowerCase()}`}
                  data-category={category}
                  className="group relative z-10 inline-block text-[11.5vw] sm:text-7xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase leading-none text-accent"
                >
                  <span className={`transition-colors duration-300 pr-2 md:pr-4 group-hover:text-foreground ${isHovered ? 'text-foreground' : ''}`}>
                    {category}
                  </span>
                  <span className={`absolute left-0 bottom-0 h-[4px] bg-foreground transition-all duration-500 group-hover:w-full ${isHovered ? 'w-full' : 'w-0'}`}></span>
                </a>
              );
            })}
          </nav>
        </TrailingImage>

        {/* Footer (Mobile/Desktop credits) */}
        <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground/60 tracking-wider shrink-0 select-none border-t border-border/30 pt-4">
          <span className="md:hidden">© 2026 Michael Medhat</span>
          <span>SHOWCASE</span>

          {/* Desktop Social Links */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://instagram.com/mickel_medhat"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center border border-border hover:border-foreground text-accent hover:text-foreground bg-card transition-all duration-300 pointer-events-auto"
              title="Instagram"
            >
              <InstagramIcon size={14} />
            </a>
            <a
              href="https://behance.net"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center border border-border hover:border-foreground text-accent hover:text-foreground bg-card transition-all duration-300 pointer-events-auto"
              title="Behance"
            >
              <BehanceIcon size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Category Full Takeover Project View */}
      {activeCategory && (
        <div className="fixed inset-0 z-50 bg-background text-foreground overflow-y-auto flex flex-col p-6 md:p-16 border-4 border-border">
          {/* Takeover Header */}
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-6 border-b border-border pb-6 mb-8">
            <div>
              <span className="text-xs font-mono text-accent tracking-widest uppercase">// EXPLORE DESIGNS</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground">{activeCategory}</h2>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-8 w-full md:w-auto mt-2 sm:mt-0">
              {/* Category Switcher Navigation */}
              <nav className="flex flex-wrap items-center gap-4 md:gap-5 text-xs font-mono uppercase tracking-widest w-full sm:w-auto">
                <span className="text-muted-foreground/60 hidden md:inline">// BROWSE:</span>
                {categories.map((cat) => {
                  if (cat === activeCategory) return null;
                  return (
                    <a
                      key={cat}
                      href={`#${cat.toLowerCase()}`}
                      className="text-accent hover:text-foreground transition-colors duration-300 border-b border-border hover:border-foreground pb-0.5"
                    >
                      {cat}
                    </a>
                  );
                })}
              </nav>

              <button
                onClick={closeCategory}
                className="w-full sm:w-auto px-5 py-2.5 border border-foreground bg-transparent text-xs font-mono uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all duration-300 rounded-none cursor-pointer shrink-0"
              >
                Close [X]
              </button>
            </div>
          </div>

          {/* Project Specimen Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projectsData[activeCategory].map((project, idx) => (
              <ExpandableProjectCard
                key={project.title}
                project={project}
                allProjects={projectsData[activeCategory]}
                projectIndex={idx}
              />
            ))}
          </div>
        </div>
      )}

      {/* Contact Studio Overlay */}
      {contactOpen && (
        <div
          onClick={() => setContactOpen(false)}
          className="fixed inset-0 z-[60] bg-background/75 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-card border-2 border-foreground p-8 max-w-md w-full relative cursor-default"
          >
            <button
              onClick={() => setContactOpen(false)}
              className="absolute top-4 right-4 text-xs font-mono text-foreground hover:text-accent uppercase cursor-pointer"
            >
              [Close]
            </button>
            <h3 className="text-2xl font-black uppercase text-foreground tracking-tighter mb-4">// CONTACT STUDIO</h3>
            <div className="flex flex-col gap-4 text-sm font-mono text-muted-foreground">
              <div>
                <span className="text-accent text-xs font-bold block mb-1">EMAIL</span>
                <a href="mailto:michael@arch.com" className="text-foreground hover:underline">michael@arch.com</a>
              </div>
              <div>
                <span className="text-accent text-xs font-bold block mb-1">OFFICES</span>
                <span className="text-foreground">Cairo / Minya</span>
              </div>
              <div className="border-t border-border pt-4 mt-2">
                <p className="text-xs">Available for selective private residential commissions.</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
