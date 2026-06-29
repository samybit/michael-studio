"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SafeImage } from "./SafeImage";

interface Project {
  title: string;
  imagePath: string;
  description: string;
  gallery?: string[];
}

export function ExpandableProjectCard({ project }: { project: Project }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <motion.div 
        layoutId={`card-container-${project.title.replace(/\s+/g, '-')}`}
        className="border border-[#2E4540] p-4 bg-[#167 20% 12%] flex flex-col gap-4 cursor-pointer hover:bg-[#2E4540]/20 transition-colors duration-300"
        onClick={() => setIsExpanded(true)}
      >
        <motion.div layoutId={`card-image-container-${project.title.replace(/\s+/g, '-')}`} className="w-full h-64 bg-[#0B0909] border border-[#2E4540] relative overflow-hidden group">
          <SafeImage
            src={project.imagePath}
            alt={project.title}
            className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
            fallbackText="image to be added"
          />
          <div className="absolute inset-0 bg-[#408175]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </motion.div>
        <div>
          <motion.h3 layoutId={`card-title-${project.title.replace(/\s+/g, '-')}`} className="text-lg font-bold tracking-tight text-[#B5B9F0] uppercase">
            {project.title}
          </motion.h3>
          <motion.p layoutId={`card-desc-${project.title.replace(/\s+/g, '-')}`} className="text-xs text-[#169 15% 65%] mt-1">
            {project.description}
          </motion.p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-[#0B0909]/90 backdrop-blur-sm"
          >
            <motion.div 
              layoutId={`card-container-${project.title.replace(/\s+/g, '-')}`}
              className="w-full max-w-6xl max-h-full overflow-y-auto bg-[#0B0909] border-2 border-[#B5B9F0] flex flex-col pointer-events-auto shadow-2xl"
            >
              <div className="sticky top-0 z-10 flex justify-between items-center p-4 md:p-6 border-b border-[#2E4540] bg-[#0B0909]">
                 <motion.h3 layoutId={`card-title-${project.title.replace(/\s+/g, '-')}`} className="text-2xl md:text-4xl font-black uppercase text-[#B5B9F0] tracking-tighter">
                   {project.title}
                 </motion.h3>
                 <button
                   onClick={() => setIsExpanded(false)}
                   className="px-4 py-2 border border-[#B5B9F0] text-xs font-mono uppercase tracking-widest text-[#B5B9F0] hover:bg-[#B5B9F0] hover:text-[#0B0909] transition-all duration-300 cursor-pointer"
                 >
                   Close
                 </button>
              </div>
              
              <div className="p-4 md:p-8 flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/3 flex flex-col gap-6">
                  <motion.div layoutId={`card-image-container-${project.title.replace(/\s+/g, '-')}`} className="w-full aspect-[4/3] md:aspect-square bg-[#0B0909] border border-[#2E4540] relative overflow-hidden">
                    <SafeImage
                      src={project.imagePath}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      fallbackText="image to be added"
                    />
                  </motion.div>
                  <motion.p layoutId={`card-desc-${project.title.replace(/\s+/g, '-')}`} className="text-sm md:text-base text-[#169 15% 65%] leading-relaxed font-mono">
                    {project.description}
                  </motion.p>
                </div>
                
                {project.gallery && project.gallery.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {project.gallery.map((imgSrc, idx) => (
                      <div key={idx} className="w-full aspect-square bg-[#0B0909] border border-[#2E4540] relative overflow-hidden group">
                        <SafeImage
                          src={imgSrc}
                          alt={`${project.title} gallery ${idx + 1}`}
                          className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute top-2 left-2 px-2 py-1 bg-[#0B0909]/80 border border-[#2E4540] text-[9px] font-mono text-[#408175] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                          View 0{idx + 1}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
