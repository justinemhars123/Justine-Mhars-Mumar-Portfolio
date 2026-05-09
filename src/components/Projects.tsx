import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { ExternalLink, Github, X } from 'lucide-react';
import { CardStack } from './ui/card-stack';

const IMAGE_ROTATION_MS = 4500;
const IMAGE_TRANSITION_SECONDS = 1.9;

type ProjectItem = {
  id: number;
  title: string;
  description: string;
  images: string[];
  tag: string;
  techStack: string[];
  highlights: string[];
  demoHref: string | null;
  githubHref: string | null;
};

const projectItems: ProjectItem[] = [
  {
    id: 1,
    title: 'Lifewood Web',
    description:
      "A React and Supabase powered platform that combines Lifewood’s public website, contact and careers funnel, and a role-based user/admin dashboard, including an AI-assisted applicant interview workflow with analytics and hiring back-office tools.",
    images: [
      '/Assets/images/Lifewood-web/Screenshot 1.png',
      '/Assets/images/Lifewood-web/Screenshot 2.png',
      '/Assets/images/Lifewood-web/Screenshot 3.png',
      '/Assets/images/Lifewood-web/Screenshot 4.png',
      '/Assets/images/Lifewood-web/Screenshot 5.png',
    ],
    tag: 'Full Stack / AI Integration',
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS via CDN', 'Supabase'],
    highlights: [
      'Unified the public website, careers flow, and internal dashboard in one platform.',
      'Included AI-assisted applicant interviews with analytics for hiring teams.',
      'Combined marketing, operations, and candidate workflows in a single experience.',
    ],
    demoHref: null,
    githubHref: null,
  },
  {
    id: 2,
    title: 'LifeSights',
    description:
      'A React/Vite analytics dashboard that connects to Google Drive, opens Excel or Google Sheets workbooks, and delivers KPI cards, charts, filters, saved analysis tabs, and an AI assistant for querying workbook data.',
    images: [
      '/Assets/images/LifeSights/Screenshot 1.png',
      '/Assets/images/LifeSights/Screenshot 2.png',
      '/Assets/images/LifeSights/Screenshot 3 .png',
      '/Assets/images/LifeSights/Screenshot 4.png',
      '/Assets/images/LifeSights/Screenshot 5.png',
    ],
    tag: 'AI Integration',
    techStack: ['React', 'Vite', 'JavaScript', 'Tailwind CSS', 'Firebase', 'React Router', 'Recharts', 'Google Drive API'],
    highlights: [
      'Pulled workbook data from Drive into KPI cards, charts, and saved analysis views.',
      'Added filtering and AI-powered querying for faster spreadsheet exploration.',
      'Focused the interface on fast operational reporting from familiar tools.',
    ],
    demoHref: null,
    githubHref: 'https://github.com/darinjan13/daily-headcount-ai',
  },
  {
    id: 3,
    title: 'AccessLaw',
    description:
      'AI-powered legal support platform for the Philippines that helps clients get legal guidance, connect with verified lawyers, manage case intake and tracking, exchange secure messages and files, receive calendar reminders, and support admin-side reporting and user management.',
    images: [
      '/Assets/images/AccessLaw/Screenshot 1.png',
      '/Assets/images/AccessLaw/Screenshot 2.png',
      '/Assets/images/AccessLaw/Screenshot 3.png',
      '/Assets/images/AccessLaw/Screenshot 4.png',
      '/Assets/images/AccessLaw/Screenshot 5.png',
    ],
    tag: 'AI Integration',
    techStack: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'Alpine.js', 'Vite'],
    highlights: [
      'Built a Philippines-focused legal support platform with role-based flows for clients, lawyers, and admins.',
      'Integrated AI-assisted legal guidance, lawyer matching, case intake/tracking, notifications, and calendar reminders.',
      'Added secure chat, file sharing, verification workflows, and admin reporting/management features.',
    ],
    demoHref: null,
    githubHref: 'https://github.com/FrancisDave123/AccessLaw2',
  },
  {
    id: 4,
    title: 'NoteAgent',
    description:
      'A progressive web app built with Node.js and Express that transforms messy notes into structured action plans using AI. Designed for speed and clarity, it helps users turn general notes, meeting notes, and voice input into organized tasks and summaries.',
    images: [
      '/Assets/images/NoteAgent/Screenshot 1.png',
      '/Assets/images/NoteAgent/Screenshot 2.png',
      '/Assets/images/NoteAgent/Screenshot 3.png'
    ],
    tag: 'AI Productivity Web App',
    techStack: ['Node.js', 'Express.js', 'JavaScript', 'Groq API', 'PWA'],
    highlights: [
      'Turned unstructured notes into prioritized action plans using AI.',
      'Supported multiple output modes for task lists, meeting action items, and email-style summaries.',
      'Added voice input, task history, shareable results, Markdown export, calendar export, and browser reminders.',
      'Built as an installable PWA with offline support for static assets.',
    ],
    demoHref: null,
    githubHref: null,
  },
  {
    id: 5,
    title: 'The Last Ritual',
    description:
      'A first-person horror survival game in Unity where the player lights ritual candles, gathers offerings, solves sigil and rhythm puzzles, and completes an ancient rite before time runs out while evading a roaming monster.',
    images: [
      '/Assets/images/The-Last-Ritual/Screenshot 1.png',
      '/Assets/images/The-Last-Ritual/Screenshot 2.png',
      '/Assets/images/The-Last-Ritual/Screenshot 3.png',
      '/Assets/images/The-Last-Ritual/Screenshot 4.png',
      '/Assets/images/The-Last-Ritual/Screenshot 5.png',
    ],
    tag: 'Unity Horror Game',
    techStack: ['Unity', 'Puzzle Design', 'Enemy AI', 'Atmosphere'],
    highlights: [
      'Built a survival-horror loop around ritual completion and time pressure.',
      'Mixed puzzle solving, gathering, and evasion into one tense experience.',
      'Used pacing and environmental storytelling to strengthen the game feel.',
    ],
    demoHref: null,
    githubHref: null,
  },
];

function ProjectCard({
  item,
  active,
  imgIndex,
}: {
  item: ProjectItem;
  active: boolean;
  imgIndex: number;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#161616]">
      <AnimatePresence>
        {item.images.map((src, index) =>
          index === imgIndex ? (
            <motion.img
              key={src}
              src={src}
              alt={`${item.title} screenshot ${index + 1}`}
              className="absolute inset-0 h-full w-full object-cover object-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: IMAGE_TRANSITION_SECONDS, ease: [0.4, 0, 0.2, 1] }}
              loading={active ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
            />
          ) : null,
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

      {/* Subtle dark tint: lighter on active cards, slightly deeper on inactive ones to focus the center */}
      <div className={`absolute inset-0 pointer-events-none z-10 transition-colors duration-500 ${active ? 'bg-black/10' : 'bg-black/30'}`} />
    </div>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectItem;
  onClose: () => void;
}) {
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const selectedImage = project.images[modalImageIndex];

  const paginate = (newDirection: number) => {
    const nextIndex = (modalImageIndex + newDirection + project.images.length) % project.images.length;
    setDirection(newDirection);
    setModalImageIndex(nextIndex);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-8 md:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      data-lenis-prevent
    >
      <motion.div
        className="absolute inset-0 bg-black/85 backdrop-blur-[12px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="relative z-10 w-[90vw] max-w-4xl flex flex-col overflow-hidden rounded-2xl border border-[#E1E0CC]/[0.08] bg-[#0a0a0a] shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
        style={{ maxHeight: '90vh' }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 z-50 flex h-8 w-8 items-center justify-center rounded-full border border-[#E1E0CC]/20 bg-black/50 text-[#E1E0CC]/70 backdrop-blur-[4px] transition-all duration-200 hover:border-[#E1E0CC]/50 hover:text-[#E1E0CC]"
        >
          <X size={14} />
        </button>

        <div className="flex flex-col min-h-0">
          {/* Top: Image Section */}
          <div className="relative h-[240px] md:h-[380px] w-full shrink-0 overflow-hidden rounded-t-2xl bg-black">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={modalImageIndex}
                src={selectedImage}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                alt={`${project.title} screenshot ${modalImageIndex + 1}`}
                className="absolute inset-0 h-full w-full cursor-grab object-cover object-top active:cursor-grabbing"
                transition={{
                  x: { type: 'spring', stiffness: 450, damping: 38 },
                  opacity: { duration: 0.15 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset }) => {
                  const swipe = offset.x;
                  if (swipe < -50) paginate(1);
                  else if (swipe > 50) paginate(-1);
                }}
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </AnimatePresence>

            {/* Bottom blend gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-[80px] bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-10" />

            {/* Subtle pagination overlay */}
            <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setDirection(i > modalImageIndex ? 1 : -1);
                    setModalImageIndex(i);
                  }}
                  className={`h-1 rounded-full transition-all duration-300 ${i === modalImageIndex
                    ? 'w-6 bg-[#E1E0CC]'
                    : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Bottom: Content Section */}
          <div 
            className="flex-1 flex flex-col gap-6 overflow-y-auto bg-[#0a0a0a] p-8 pb-12 hide-scrollbar min-h-0"
          >
            <div>
              <span className="mb-1 block text-[10px] uppercase tracking-[0.2em] text-[#E1E0CC]/35">
                {project.tag}
              </span>
              <h3 className="text-2xl font-semibold text-[#E1E0CC]">
                {project.title}
              </h3>
            </div>

            <div className="border-t border-[#E1E0CC]/[0.08] pt-4">
              <span className="mb-2 block text-[10px] uppercase tracking-[0.2em] text-[#E1E0CC]/30">
                Project Overview
              </span>
              <p className="text-sm leading-relaxed text-[#E1E0CC]/55">
                {project.description}
              </p>
            </div>

            <div className="border-t border-[#E1E0CC]/[0.08] pt-4">
              <span className="mb-3 block text-[10px] uppercase tracking-[0.2em] text-[#E1E0CC]/30">
                Key Highlights
              </span>
              <div className="flex flex-col gap-2">
                {project.highlights.map((highlight) => (
                  <div key={highlight} className="flex gap-2">
                    <span className="text-sm text-[#E1E0CC]/50">›</span>
                    <p className="text-sm leading-relaxed text-[#E1E0CC]/50">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#E1E0CC]/[0.08] pt-4">
              <span className="mb-3 block text-[10px] uppercase tracking-[0.2em] text-[#E1E0CC]/30">
                Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((entry) => (
                  <span
                    key={entry}
                    className="rounded-full border border-[#E1E0CC]/15 px-3 py-1 text-[10px] uppercase tracking-[0.1em] text-[#E1E0CC]/50"
                  >
                    {entry}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-[#E1E0CC]/[0.08] pt-4">
              {project.demoHref ? (
                <a
                  href={project.demoHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center rounded-full border border-[#E1E0CC]/20 px-4 py-2 text-xs uppercase tracking-[0.1em] text-[#E1E0CC] transition-all duration-200 hover:bg-[#E1E0CC]/5"
                >
                  Live Demo <ExternalLink size={12} className="ml-1.5" />
                </a>
              ) : null}

              {project.githubHref ? (
                <a
                  href={project.githubHref}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center rounded-full border border-[#E1E0CC]/20 px-4 py-2 text-xs uppercase tracking-[0.1em] text-[#E1E0CC] transition-all duration-200 hover:bg-[#E1E0CC]/5"
                >
                  GitHub <Github size={12} className="ml-1.5" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const activeProject = projectItems[activeProjectIndex];
  const expandedProject = expandedProjectIndex !== null ? projectItems[expandedProjectIndex] : null;

  const activateProject = (index: number) => {
    setActiveProjectIndex(index);
    setActiveImageIndex(0);
  };

  const closeProjectModal = () => setExpandedProjectIndex(null);

  useEffect(() => {
    if (expandedProjectIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeProjectModal();
      }
    };

    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [expandedProjectIndex]);

  useEffect(() => {
    if (!isInView || expandedProjectIndex !== null) return;

    const atLastImage = activeImageIndex >= activeProject.images.length - 1;
    const timeoutId = window.setTimeout(() => {
      if (atLastImage) {
        activateProject((activeProjectIndex + 1) % projectItems.length);
        return;
      }

      setActiveImageIndex((prev) => prev + 1);
    }, IMAGE_ROTATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [
    activeImageIndex,
    activeProject.images.length,
    activeProjectIndex,
    expandedProjectIndex,
    isInView,
  ]);

  return (
    <section
      className="bg-[#161616] px-6 md:px-24 pt-20 pb-32 overflow-visible"
      id="projects"
      ref={containerRef}
    >
      <motion.div
        className="max-w-7xl mx-auto w-full overflow-visible"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-[10px] font-normal tracking-[0.2em] text-[#E1E0CC]/35 uppercase mb-8 text-left"
          >
            PROJECTS
          </motion.div>
        </div>

        <motion.div
          className="w-full overflow-visible"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {(() => {
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            const cWidth = isMobile ? Math.min(window.innerWidth - 48, 480) : 640;
            const cHeight = isMobile ? cWidth * 0.65 : 360;
            
            return (
              <CardStack
                items={projectItems}
                index={activeProjectIndex}
                autoAdvance={false}
                pauseOnHover={false}
                showDots={false}
                cardWidth={cWidth}
                cardHeight={cHeight}
                overlap={isMobile ? 0.3 : 0.45}
                spreadDeg={isMobile ? 20 : 44}
                maxVisible={isMobile ? 3 : 5}
                depthPx={isMobile ? 30 : 50}
                tiltXDeg={5}
                activeLiftPx={16}
                activeScale={1.04}
                inactiveScale={0.93}
                perspectivePx={1400}
                springStiffness={190}
                springDamping={30}
                loop={true}
                onChangeIndex={(index) => activateProject(index)}
                onCardClick={(_, { index }) => setExpandedProjectIndex(index)}
                renderCard={(item, { active }) => (
                  <ProjectCard
                    item={item as ProjectItem}
                    active={active}
                    imgIndex={active && item.id === activeProject.id ? activeImageIndex : 0}
                  />
                )}
              />
            );
          })()}
        </motion.div>

        <div className="mx-auto mt-4 max-w-lg px-6 text-center">
          <div className="mx-auto mt-6 mb-8 h-[1px] w-full max-w-xs border-b border-[#E1E0CC]/10" />
          <div className="min-h-[240px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <span className="mb-3 block text-[10px] uppercase tracking-[0.2em] text-[#E1E0CC]/35">
                  {activeProject.tag}
                </span>
                <h3 className="mb-3 text-2xl font-semibold tracking-tight text-[#E1E0CC]">
                  {activeProject.title}
                </h3>
                <p className="mx-auto mb-4 max-w-md text-sm leading-relaxed text-[#E1E0CC]/50">
                  {activeProject.description}
                </p>
                <div className="flex items-center justify-center gap-3">
                  {activeProject.demoHref ? (
                    <a
                      href={activeProject.demoHref}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center rounded-full border border-[#E1E0CC]/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#E1E0CC] transition-all duration-200 hover:border-[#E1E0CC]/50 hover:bg-[#E1E0CC]/5"
                    >
                      Live Demo <ExternalLink size={12} className="ml-1.5" />
                    </a>
                  ) : null}

                  {activeProject.githubHref ? (
                    <a
                      href={activeProject.githubHref}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center rounded-full border border-[#E1E0CC]/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#E1E0CC] transition-all duration-200 hover:border-[#E1E0CC]/50 hover:bg-[#E1E0CC]/5"
                    >
                      GitHub <Github size={12} className="ml-1.5" />
                    </a>
                  ) : null}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-2 flex gap-4 justify-center">
          {projectItems.map((item) => {
            const isActive = item.id === activeProject.id;

            return (
              <button
                key={item.id}
                onClick={() => activateProject(projectItems.findIndex((project) => project.id === item.id))}
                className={`w-3 h-3 rounded-full transition-all duration-300 border ${isActive
                  ? 'bg-[#E1E0CC] border-[#E1E0CC] scale-110 shadow-[0_0_10px_rgba(225,224,204,0.3)]'
                  : 'bg-transparent border-[#E1E0CC]/30 hover:border-[#E1E0CC]/60 hover:bg-[#E1E0CC]/10'
                  }`}
                aria-label={`Go to project ${item.title}`}
              />
            );
          })}
        </div>
      </motion.div>

      <AnimatePresence>{expandedProject ? <ProjectModal project={expandedProject} onClose={closeProjectModal} /> : null}</AnimatePresence>
    </section>
  );
}
