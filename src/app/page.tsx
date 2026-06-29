'use client';

import { useState, useEffect } from 'react';
import StaggeredMenu from '@/components/StaggeredMenu';
import GooeyNav from '@/components/GooeyNav';

const categories = ['Kitchens', 'Bathrooms', 'Apartments', 'Bedrooms'] as const;
type Category = typeof categories[number];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

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
          accentColor="hsl(169 34% 38%)" 
          colors={['hsl(167 20% 12%)', 'hsl(167 20% 23%)']}
          items={menuItems}
          socialItems={[
            { label: 'Insta', link: 'https://instagram.com' },
            { label: 'LinkedIn', link: 'https://linkedin.com' }
          ]}
          logoUrl="" // Empty string renders text fallback inside component
        />
        <button 
          onClick={() => setContactOpen(true)}
          className="absolute top-[24px] right-[85px] z-45 px-3 py-1.5 border border-[#B5B9F0] text-[10px] font-mono uppercase tracking-widest text-[#B5B9F0] bg-[#0B0909] hover:bg-[#B5B9F0] hover:text-[#0B0909] transition-all duration-300"
        >
          Contact
        </button>
      </div>

      {/* Left Panel - Bio (Desktop Only) */}
      <div className="hidden md:flex w-full md:w-[40%] h-full flex-col justify-between p-12 border-r border-[#2E4540] overflow-hidden shrink-0 select-none">
        <div className="flex flex-col gap-8">
          <div className="border border-[#2E4540] p-1 bg-[#167 20% 12%]">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80"
              alt="Michael"
              className="w-full h-[280px] object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[#408175] text-xs font-mono uppercase tracking-widest">// STUDIO FOCUS</span>
            <h1 className="text-4xl font-black tracking-tighter text-[#B5B9F0] uppercase leading-none">
              Michael
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
          © 2026 Michael. All Rights Reserved.
        </div>
      </div>

      {/* Right Panel - Interactive View */}
      <div className="w-full md:w-[60%] h-[calc(100dvh-80px)] md:h-full flex flex-col justify-between p-6 md:p-12 overflow-hidden bg-[#0B0909]">
        
        {/* Desktop Navbar (GooeyNav) */}
        <div className="hidden md:flex justify-between items-center w-full">
          <span className="text-lg font-black tracking-widest text-[#B5B9F0]">// MICHAEL</span>
          <div className="flex items-center gap-6">
            <GooeyNav items={navItems} />
            <button 
              onClick={() => setContactOpen(true)}
              className="px-6 py-2 border border-[#B5B9F0] text-xs font-mono uppercase tracking-widest text-[#B5B9F0] hover:bg-[#B5B9F0] hover:text-[#0B0909] transition-all duration-300 rounded-none cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Compact Profile Block (Mobile Only) */}
        <div className="flex items-center gap-3 md:hidden p-1 border-b border-[#2E4540]/30 pb-4 shrink-0 select-none">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
            alt="Michael"
            className="w-10 h-10 object-cover border border-[#2E4540] grayscale"
          />
          <div>
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-[#B5B9F0]">Michael Chen</h2>
            <p className="text-[10px] text-[#169 15% 65%]">Lead Spatial Architect</p>
          </div>
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
                className="group relative inline-block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase text-[#2E4540] hover:text-[#B5B9F0] transition-colors duration-500 leading-none"
              >
                <span className="relative z-10">{category}</span>
                <span className="absolute left-0 bottom-0 w-0 h-[4px] bg-[#B5B9F0] group-hover:w-full transition-all duration-500"></span>
              </a>
            ))}
          </nav>
        </div>

        {/* Footer (Mobile/Desktop credits) */}
        <div className="flex justify-between items-center text-[10px] font-mono text-[#2E4540] tracking-wider shrink-0 select-none">
          <span className="md:hidden">© 2026 MICHAEL CHEN</span>
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
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="border border-[#2E4540] p-4 bg-[#167 20% 12%] flex flex-col gap-4">
                {/* Mock Picture Box */}
                <div className="w-full h-64 bg-[#0B0909] border border-[#2E4540] flex items-center justify-center relative overflow-hidden group">
                  <span className="text-xs font-mono text-[#2E4540] tracking-widest uppercase group-hover:text-[#B5B9F0] transition-colors duration-300">
                    Mock Picture
                  </span>
                  <div className="absolute inset-0 bg-[#408175]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-[#B5B9F0] uppercase">
                    {activeCategory.slice(0, -1)} project {item}
                  </h3>
                  <p className="text-xs text-[#169 15% 65%] mt-1">
                    Brutalist structural exploration highlighting geometry, volume, and material truth.
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
                <a href="mailto:studio@michaelchen.arch" className="text-[#B5B9F0] hover:underline">studio@michaelchen.arch</a>
              </div>
              <div>
                <span className="text-[#408175] text-xs font-bold block mb-1">OFFICES</span>
                <span className="text-[#B5B9F0]">New York / Berlin / Tokyo</span>
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
