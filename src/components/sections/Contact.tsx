import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import TextType from '../ui/TextType';

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialFormState: FormState = {
  name: '',
  email: '',
  message: '',
};

const formFields = [
  {
    key: 'name' as const,
    label: 'Name',
    type: 'text',
    placeholder: 'Your name',
  },
  {
    key: 'email' as const,
    label: 'Email',
    type: 'email',
    placeholder: 'your@email.com',
  },
  {
    key: 'message' as const,
    label: 'Message',
    placeholder: 'Tell me about your project...',
    rows: 4,
  },
];

export default function Contact() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadingOutRef = useRef(false);
  const resetTimeoutRef = useRef<number | null>(null);
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contacts = [
    {
      label: 'EMAIL',
      value: 'justinemharsmumar@gmail.com',
      href: 'mailto:justinemharsmumar@gmail.com',
    },
    {
      label: 'GITHUB',
      value: 'justinemhars123',
      href: 'https://github.com/justinemhars123',
    },
    {
      label: 'LINKEDIN',
      value: 'Justine Mhars',
      href: 'https://www.linkedin.com/in/justine-mhars-mumar-50b934375/?skipRedirect=true',
    },
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      if (!fadingOutRef.current) {
        video.style.opacity = '1';
      }
    };

    const handleTimeUpdate = () => {
      if (video.duration) {
        const timeLeft = video.duration - video.currentTime;

        if (timeLeft <= 0.8 && !fadingOutRef.current) {
          fadingOutRef.current = true;
          video.style.opacity = '0';
        }

        if (video.currentTime < 0.4 && fadingOutRef.current) {
          fadingOutRef.current = false;
          video.style.opacity = '1';
        }
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);

    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      setFormData(initialFormState);
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section
      className="relative flex min-h-[580px] flex-col justify-between overflow-hidden bg-black px-6 pt-24 pb-20 pr-6 md:px-24 md:pr-8"
      id="contact"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 z-0 h-full w-full object-cover object-[center_35%] transition-opacity duration-1000 ease-in-out saturate-[0.55] brightness-[0.85] contrast-[1.1]"
        style={{ opacity: 0 }}
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 z-1 bg-black/50" />
      <div className="absolute inset-0 z-3 opacity-20 mix-blend-overlay noise-overlay" />

      <div className="relative z-[4] mx-auto grid w-full max-w-[1200px] grid-cols-1 items-start gap-16 xl:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] xl:gap-24">
        <div className="flex min-h-full flex-col gap-12 md:gap-16">
          <div className="flex w-full flex-col items-center xl:items-start">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mb-4 font-sans text-[10px] font-light uppercase tracking-[0.2em] text-[#E1E0CC]/35"
            />

            <h2 className="flex items-baseline justify-center whitespace-nowrap font-sans text-4xl font-bold tracking-[-0.03em] text-[#E1E0CC] md:text-6xl lg:text-7xl xl:justify-start">
              <span className="mr-[0.2em] inline-block overflow-hidden">
                <motion.span
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  Let&apos;s
                </motion.span>
              </span>
              <span className="inline-block">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block"
                >
                  <TextType
                    text={['build', 'innovate', 'evolve', 'connect']}
                    typingSpeed={100}
                    deletingSpeed={100}
                    pauseDuration={2000}
                    showCursor={true}
                    cursorCharacter="_"
                    cursorClassName="text-[#E1E0CC]/50 ml-1"
                    className="inline-block"
                  />
                </motion.div>
              </span>
              <span className="ml-[-0.15em] inline-block overflow-hidden">
                <motion.span
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.16,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block font-serif text-[0.8em] font-light italic opacity-50"
                >
                  .
                </motion.span>
              </span>
            </h2>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center xl:items-start">
            <div className="flex w-full max-w-[540px] flex-col gap-4">
              {contacts.map((contact, i) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-[rgba(225,224,204,0.08)] bg-[rgba(225,224,204,0.03)] px-5 py-4 text-left transition-all duration-200 hover:border-[rgba(225,224,204,0.16)] hover:bg-[rgba(225,224,204,0.05)]"
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  <div className="min-w-0">
                    <span className="mb-2 block font-sans text-[10px] font-normal uppercase tracking-[0.2em] text-[#E1E0CC]/35 transition-colors duration-200 group-hover:text-[#E1E0CC]/60 md:text-[11px]">
                      {contact.label}
                    </span>
                    <span className="block break-words font-sans text-base font-medium leading-tight text-[#E1E0CC] transition-colors duration-200 md:text-lg">
                      {contact.value}
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[#E1E0CC]/40 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#E1E0CC]" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          onSubmit={handleSubmit}
          className="w-full rounded-2xl border border-[rgba(225,224,204,0.1)] bg-black/40 p-8 backdrop-blur-[12px] xl:mt-2 xl:max-w-[640px] xl:justify-self-end"
        >
          <div className="mb-6 font-sans text-[10px] tracking-[0.2em] text-[rgba(225,224,204,0.35)]">
            GET IN TOUCH
          </div>

          {formFields.map((field, index) => (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.38 + index * 0.08,
              }}
              className="mb-5"
            >
              <label
                htmlFor={field.key}
                className="mb-2 block text-[11px] uppercase tracking-[0.1em] text-[rgba(225,224,204,0.4)]"
              >
                {field.label}
              </label>

              {field.key === 'message' ? (
                <textarea
                  id={field.key}
                  name={field.key}
                  rows={field.rows}
                  placeholder={field.placeholder}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full resize-none rounded-lg border border-[rgba(225,224,204,0.1)] bg-[rgba(225,224,204,0.04)] px-4 py-3 font-sans text-sm text-[#E1E0CC] outline-none transition-[border-color,background] duration-200 ease-in-out placeholder:text-[rgba(225,224,204,0.25)] focus:border-[rgba(225,224,204,0.3)] focus:bg-[rgba(225,224,204,0.06)]"
                />
              ) : (
                <input
                  id={field.key}
                  name={field.key}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.key]}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-[rgba(225,224,204,0.1)] bg-[rgba(225,224,204,0.04)] px-4 py-3 font-sans text-sm text-[#E1E0CC] outline-none transition-[border-color,background] duration-200 ease-in-out placeholder:text-[rgba(225,224,204,0.25)] focus:border-[rgba(225,224,204,0.3)] focus:bg-[rgba(225,224,204,0.06)]"
                />
              )}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.38 + formFields.length * 0.08,
            }}
          >
            {isSubmitted ? (
              <p className="text-xs italic text-[rgba(225,224,204,0.5)]">
                Message sent — I&apos;ll get back to you soon.
              </p>
            ) : (
              <button
                type="submit"
                className="w-full cursor-pointer rounded-full border border-[rgba(225,224,204,0.2)] bg-[rgba(225,224,204,0.08)] px-6 py-3 font-sans text-xs tracking-[0.2em] text-[#E1E0CC] transition-all duration-200 ease-in-out hover:border-[rgba(225,224,204,0.4)] hover:bg-[rgba(225,224,204,0.15)]"
              >
                SEND MESSAGE
              </button>
            )}
          </motion.div>
        </motion.form>

        <div className="w-full pt-25 xl:col-span-2">
          <div className="mb-6 w-full border-t border-[#E1E0CC]/6" />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col items-center justify-between gap-4 md:flex-row"
          >
            <p className="font-sans text-[11px] text-[#E1E0CC]/40">
              © 2026 Justine Mhars Mumar. All rights reserved.
            </p>
            <p className="font-sans text-[11px] italic text-[#E1E0CC]/40">
              Designed & built with precision.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
