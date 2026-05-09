import { motion } from 'motion/react';
import { useRef } from 'react';
import Lanyard from '../ui/Lanyard';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const expertise = [
    {
      id: "01",
      category: "AI-Powered Applications",
      skills: ["Prompt Engineering", "AI Integration", "Automation", "AI Workflows"],
      description: "Integrating AI to automate complex workflows and create more human-like digital interactions through custom prompt engineering."
    },
    {
      id: "02",
      category: "Full-Stack Development",
      skills: ["React", "Laravel", "Python", "Tailwind CSS"],
      description: "Building responsive applications where frontend design meets backend logic, focusing on usability in real-world systems."
    },
    {
      id: "03",
      category: "UI/UX & Product Thinking",
      skills: ["Figma", "UX Design", "System Planning", "User Flows"],
      description: "Designing intuitive interfaces and mapping user journeys to ensure every product is as usable as it is functional."
    }
  ];

  return (
    <section ref={containerRef} className="relative px-6 md:px-24 py-16 bg-black overflow-visible" id="about">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] align-items-start gap-0 mb-4">
          <div className="w-full">
            {/* Section Label */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-sans text-[10px] font-light tracking-[0.15em] text-[#E1E0CC]/30 uppercase mb-6"
            >
              ABOUT ME
            </motion.div>

            {/* ZONE 1: HEADING */}
            <div className="mb-6">
              <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl text-[#E1E0CC] leading-[1.05] tracking-[-0.02em] font-bold text-left">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Building modern
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 0.7, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="block font-serif italic font-light opacity-70"
                >
                  AI-powered
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  className="block"
                >
                  digital experiences.
                </motion.span>
              </h2>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
                style={{ transformOrigin: "left center" }}
                className="mt-6 border-t border-[#E1E0CC]/[0.08] w-full"
              />
            </div>

            {/* ZONE 2: TWO PARAGRAPH COLUMNS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              >
                <p className="font-sans text-sm text-[#E1E0CC]/50 leading-relaxed font-light">
                  I turn ideas into usable systems by balancing creativity with functionality, focusing on digital experiences that feel natural from the first wireframe to the final AI integration.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
              >
                <p className="font-sans text-sm text-[#E1E0CC]/50 leading-relaxed font-light">
                  With a stack built on React, Laravel, and Python, I build products that prioritize the user's journey. I believe that modern development isn't just about code, it's about designing better ways for people to work and interact.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="hidden md:flex justify-center items-start h-[420px] overflow-x-visible overflow-y-hidden relative">
            <Lanyard position={[0, 0, 13]} fov={20} />
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
          style={{ transformOrigin: "left center" }}
          className="mt-8 mb-8 border-t border-[#E1E0CC]/[0.08] w-full"
        />

        {/* ZONE 3: 3-COLUMN EXPERTISE DOMAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {expertise.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#E1E0CC]/[0.03] border border-[#E1E0CC]/[0.08] rounded-xl p-5"
            >
              <div className="font-sans text-[10px] tracking-[0.2em] text-[#E1E0CC]/25 uppercase mb-3">
                {item.id}
              </div>
              <h4 className="font-semibold text-sm text-[#E1E0CC] mb-1.5">
                {item.category}
              </h4>
              <p className="font-sans text-xs text-[#E1E0CC]/45 leading-relaxed mb-3">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {item.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-sans font-light text-[#E1E0CC]/45 border border-[#E1E0CC]/15 px-2 py-0.5 rounded-full uppercase tracking-[0.08em]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#E1E0CC]/[0.06] z-10" />
    </section>
  );
}
