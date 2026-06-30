"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { SafeImage } from "./SafeImage";

interface Project {
  title: string;
  imagePath: string;
  description: string;
  gallery?: string[];
}

export function ExpandableProjectCard({ 
  project,
  allProjects = [],
  projectIndex = 0
}: { 
  project: Project;
  allProjects?: Project[];
  projectIndex?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(projectIndex);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isExpanded) {
      setCurrentIndex(projectIndex);
    }
  }, [isExpanded, projectIndex]);

  const currentProject = allProjects[currentIndex] || project;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (allProjects.length === 0) return;
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(allProjects.length - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (allProjects.length === 0) return;
    if (currentIndex < allProjects.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <>
      <motion.div 
        layoutId={`card-container-${project.title.replace(/\s+/g, '-')}`}
        className="border border-border p-4 bg-card flex flex-col gap-4 cursor-pointer hover:bg-border/20 transition-colors duration-300"
        onClick={() => setIsExpanded(true)}
      >
        <motion.div layoutId={`card-image-container-${project.title.replace(/\s+/g, '-')}`} className="w-full h-64 bg-background border border-border relative overflow-hidden group">
          <SafeImage
            src={project.imagePath}
            alt={project.title}
            className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
            fallbackText="image to be added"
          />
          <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.div>
        <div>
          <motion.h3 layoutId={`card-title-${project.title.replace(/\s+/g, '-')}`} className="text-lg font-bold tracking-tight text-foreground uppercase">
            {project.title}
          </motion.h3>
          <motion.p layoutId={`card-desc-${project.title.replace(/\s+/g, '-')}`} className="text-xs text-muted-foreground mt-1">
            {project.description}
          </motion.p>
        </div>
      </motion.div>

      {mounted && createPortal(
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-background/90 backdrop-blur-sm"
            >
              <motion.div 
                layoutId={`card-container-${project.title.replace(/\s+/g, '-')}`}
                className="w-full max-w-6xl max-h-full bg-background border-2 border-foreground flex flex-col pointer-events-auto shadow-2xl overflow-hidden"
              >
                <div className="w-full h-full overflow-y-auto flex flex-col">
                  <div className="sticky top-0 z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 md:p-6 border-b border-border bg-background gap-4">
                     <motion.h3 
                       key={currentProject.title}
                       initial={{ opacity: 0, x: -10 }}
                       animate={{ opacity: 1, x: 0 }}
                       className="text-2xl md:text-4xl font-black uppercase text-foreground tracking-tighter"
                     >
                       {currentProject.title}
                     </motion.h3>
                     <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                       {allProjects.length > 1 && (
                         <div className="flex items-center border border-foreground divide-x divide-foreground bg-background">
                           <button
                             onClick={handlePrev}
                             className="px-4 py-2 text-xs font-mono uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all duration-300 cursor-pointer"
                             title="Previous Project"
                           >
                             ← Prev
                           </button>
                           <button
                             onClick={handleNext}
                             className="px-4 py-2 text-xs font-mono uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all duration-300 cursor-pointer"
                             title="Next Project"
                           >
                             Next →
                           </button>
                         </div>
                       )}
                       <button
                         onClick={() => setIsExpanded(false)}
                         className="px-4 py-2 border border-foreground text-xs font-mono uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all duration-300 cursor-pointer"
                       >
                         Close
                       </button>
                     </div>
                  </div>
                  
                  <div className="p-4 md:p-8 flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-1/3 flex flex-col gap-6">
                      <motion.div 
                        key={`img-${currentProject.title}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full aspect-[4/3] md:aspect-square bg-background border border-border relative overflow-hidden"
                      >
                        <SafeImage
                          src={currentProject.imagePath}
                          alt={currentProject.title}
                          className="w-full h-full object-cover"
                          fallbackText="image to be added"
                        />
                      </motion.div>
                      <motion.p 
                        key={`desc-${currentProject.title}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm md:text-base text-muted-foreground leading-relaxed font-mono"
                      >
                        {currentProject.description}
                      </motion.p>
                    </div>
                    
                    {currentProject.gallery && currentProject.gallery.length > 0 && (
                      <motion.div 
                        key={`gallery-${currentProject.title}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="w-full lg:w-2/3 columns-1 md:columns-2 gap-4 space-y-4"
                      >
                        {currentProject.gallery.map((imgSrc, idx) => (
                          <div key={idx} className="w-full bg-background border border-border relative overflow-hidden group break-inside-avoid">
                            <SafeImage
                              fill={false}
                              src={imgSrc}
                              alt={`${currentProject.title} gallery ${idx + 1}`}
                              className="w-full h-auto grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute top-2 left-2 px-2 py-1 bg-background/80 border border-border text-[9px] font-mono text-accent uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                              View 0{idx + 1}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
