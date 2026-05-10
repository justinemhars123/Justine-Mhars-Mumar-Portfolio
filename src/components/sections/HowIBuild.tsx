import { motion } from 'motion/react';
import { useState } from 'react';
import { Code2, Zap, Layout, Server, Terminal, Sparkles, Bot, Rocket, Settings2 } from 'lucide-react';

const technologies = [
  {
    name: 'React',
    icon: Layout,
    category: 'Frontend',
    hoverIconColor: '#61DAFB',
    hoverCircleBackground: 'rgba(97,218,251,0.12)',
    hoverBorderColor: 'rgba(97,218,251,0.2)',
  },
  {
    name: 'Laravel',
    icon: Server,
    category: 'Framework',
    hoverIconColor: '#FF2D20',
    hoverCircleBackground: 'rgba(255,45,32,0.12)',
    hoverBorderColor: 'rgba(255,45,32,0.2)',
  },
  {
    name: 'Python',
    icon: Terminal,
    category: 'Logic',
    hoverIconColor: '#3776AB',
    hoverCircleBackground: 'rgba(55,118,171,0.12)',
    hoverBorderColor: 'rgba(55,118,171,0.2)',
  },
  {
    name: 'Tailwind CSS',
    icon: Zap,
    category: 'Styling',
    hoverIconColor: '#38BDF8',
    hoverCircleBackground: 'rgba(56,189,248,0.12)',
    hoverBorderColor: 'rgba(56,189,248,0.2)',
  },
  {
    name: 'AI Integration',
    icon: Sparkles,
    category: 'Intelligence',
    hoverIconColor: '#A78BFA',
    hoverCircleBackground: 'rgba(167,139,250,0.12)',
    hoverBorderColor: 'rgba(167,139,250,0.2)',
  },
  {
    name: 'Prompt Engineering',
    icon: Bot,
    category: 'AI UX',
    hoverIconColor: '#A78BFA',
    hoverCircleBackground: 'rgba(167,139,250,0.12)',
    hoverBorderColor: 'rgba(167,139,250,0.2)',
  },
];

const methodology = [
  {
    step: '01',
    title: 'Product Planning',
    description: 'I map out features and intuitive user journeys through system thinking and Figma, ensuring the core experience is designed for usability from day one.',
    icon: Settings2
  },
  {
    step: '02',
    title: 'Creative Development',
    description: 'I build responsive, modern interfaces where frontend design meets backend logic, maintaining a perfect balance between visual aesthetics and system performance.',
    icon: Code2
  },
  {
    step: '03',
    title: 'AI Integration',
    description: 'I power web applications with intelligent workflows and custom prompt engineering to automate complex tasks and create more human-like digital interactions.',
    icon: Bot
  },
  {
    step: '04',
    title: 'Iteration & Improvement',
    description: 'I continuously refine the user experience by testing real-world workflows and evolving the product based on how people actually interact with it.',
    icon: Rocket
  }
];

export default function HowIBuild() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="py-40 bg-[#161616] px-16 md:px-24" id="how-i-build">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-left">
          <span className="block font-sans text-[10px] tracking-[0.2em] text-[#E1E0CC]/35 uppercase mb-4">
            HOW I BUILD
          </span>
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold text-[#E1E0CC] leading-[1.05] tracking-tight mb-3">
            Process & <span className="font-serif italic font-light">craft.</span>
          </h2>
          <p className="font-sans text-sm text-[#E1E0CC]/45 max-w-xl">
            From concept to deployment, built with precision.
          </p>
        </div>

        {/* Tech Stack Marquee */}
        <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden mb-32 py-10 select-none">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#161616] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#161616] to-transparent z-10" />
          
          <motion.div 
            className="flex gap-4 w-max px-4"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{ 
              duration: 30, 
              ease: "linear", 
              repeat: Infinity 
            }}
          >
            {[...technologies, ...technologies, ...technologies].map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                onMouseEnter={() => setHoveredCard(`${tech.name}-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
                className="rounded-xl p-8 flex flex-col items-center justify-center gap-5 min-w-[240px]"
                style={{
                  background: hoveredCard === `${tech.name}-${index}`
                    ? 'rgba(225, 224, 204, 0.07)'
                    : 'rgba(225, 224, 204, 0.04)',
                  border: `1px solid ${hoveredCard === `${tech.name}-${index}`
                    ? tech.hoverBorderColor ?? 'rgba(225,224,204,0.2)'
                    : 'rgba(225, 224, 204, 0.08)'}`,
                  transform: hoveredCard === `${tech.name}-${index}` ? 'translateY(-2px)' : 'translateY(0)',
                  boxShadow: hoveredCard === `${tech.name}-${index}`
                    ? '0 8px 24px rgba(0,0,0,0.3)'
                    : 'none',
                  transition:
                    'transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <div
                  className="p-4 rounded-full"
                  style={{
                    background: hoveredCard === `${tech.name}-${index}`
                      ? tech.hoverCircleBackground ?? 'rgba(225,224,204,0.12)'
                      : 'rgba(225, 224, 204, 0.06)',
                    border: '1px solid rgba(225, 224, 204, 0.08)',
                    transition:
                      'color 0.3s ease, background 0.3s ease, border-color 0.3s ease',
                  }}
                >
                  <tech.icon
                    className="w-10 h-10"
                    style={{
                      color: hoveredCard === `${tech.name}-${index}`
                        ? tech.hoverIconColor ?? 'rgba(225,224,204,1)'
                        : 'rgba(225, 224, 204, 0.7)',
                      transition:
                        'color 0.3s ease, background 0.3s ease, border-color 0.3s ease',
                    }}
                  />
                </div>
                <div className="text-center">
                  <p
                    className="font-sans text-sm font-medium tracking-[0.2em] mb-1.5 uppercase"
                    style={{
                      color: hoveredCard === `${tech.name}-${index}`
                        ? 'rgba(225, 224, 204, 1)'
                        : 'rgba(225, 224, 204, 0.7)',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {tech.name}
                  </p>
                  <p
                    className="font-sans text-[10px] font-bold tracking-[0.15em] uppercase"
                    style={{
                      color: hoveredCard === `${tech.name}-${index}`
                        ? 'rgba(225, 224, 204, 0.5)'
                        : 'rgba(225, 224, 204, 0.3)',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {tech.category}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Methodology List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {methodology.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="flex gap-8 group"
            >
              <div className="flex flex-col items-center">
                <span className="font-sans text-[10px] font-black tracking-widest text-[#E1E0CC]/20 mb-4 group-hover:text-[#E1E0CC] transition-colors duration-500">
                  {item.step}
                </span>
                <div className="w-[1px] flex-grow bg-gradient-to-b from-[#E1E0CC]/10 to-transparent" />
              </div>
              <div className="pb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-[#1a1a1a] rounded-lg border border-[#E1E0CC]/5 group-hover:border-[#E1E0CC]/20 transition-all duration-500">
                    <item.icon className="w-5 h-5 text-[#E1E0CC] opacity-70" />
                  </div>
                  <h3 className="font-sans text-xl font-bold text-[#E1E0CC] tracking-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="font-sans text-[#E1E0CC]/40 leading-relaxed max-w-md">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
