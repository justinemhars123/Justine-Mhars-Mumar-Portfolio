import { useRef, type CSSProperties } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';

const TEXT =
  'Every great product starts with someone who dared to imagine it.';

export default function TextReveal({
  backgroundColor = '#000000',
  padding = '96px 24px',
  maxWidth = 1120,
  minHeight,
  progress,
  opacity,
}: {
  backgroundColor?: string;
  padding?: string;
  maxWidth?: number;
  minHeight?: CSSProperties['minHeight'];
  progress?: MotionValue<number>;
  opacity?: MotionValue<number>;
}) {
  const container = useRef<HTMLElement | null>(null);

  const { scrollYProgress: localProgress } = useScroll({
    target: container,
    offset: ['start 0.9', 'end 0.3'],
  });
  const scrollYProgress = progress ?? localProgress;

  const words = TEXT.split(' ');

  return (
    <motion.section
      ref={container}
      style={{
        backgroundColor,
        padding,
        position: 'relative',
        zIndex: 10,
        minHeight,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        opacity,
      }}
    >
      <div
        style={{
          margin: '0 auto',
          maxWidth,
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'relative',
            padding: 'clamp(28px, 5vw, 56px)',
            background: 'transparent',
            boxShadow: 'none',
            backdropFilter: 'none',
          }}
        >
        <p
          style={{
            color: '#E1E0CC',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px 12px',
            fontFamily: '"Instrument Serif", serif',
            fontSize: 'clamp(2.4rem, 4.8vw, 5.6rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            letterSpacing: '-0.025em',
            lineHeight: 1.2,
            margin: 0,
            textAlign: 'center',
            textWrap: 'balance',
          }}
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = (i + 1) / words.length;
            return (
              <Word
                key={`${word}-${i}`}
                word={word}
                progress={scrollYProgress}
                range={[start, end]}
                isLast={i === words.length - 1}
              />
            );
          })}
        </p>
        </div>
      </div>
    </motion.section>
  );
}

function Word({
  word,
  progress,
  range,
  isLast,
}: {
  word: string;
  progress: any;
  range: [number, number];
  isLast: boolean;
}) {
  const opacity = useTransform(progress, range, [0, 1]);
  const color = useTransform(
    progress,
    range,
    ['rgba(225,224,204,0)', 'rgba(225,224,204,1)']
  );
  const filter = useTransform(
    progress,
    range,
    ['blur(10px)', 'blur(0px)']
  );
  const textShadow = useTransform(
    progress,
    range,
    [
      '0 0 0px rgba(225,224,204,0)',
      isLast
        ? '0 0 30px rgba(225,224,204,0.4)'
        : '0 0 0px rgba(225,224,204,0)',
    ]
  );

  return (
    <motion.span
      style={{
        color,
        opacity,
        filter,
        textShadow,
        display: 'inline-block',
      }}
    >
      {word}
    </motion.span>
  );
}
