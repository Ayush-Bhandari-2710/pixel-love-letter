import { useRef, useMemo, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const HeartSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [beatPhase, setBeatPhase] = useState<'expand' | 'contract'>('contract');
  const [whisperShown, setWhisperShown] = useState(false);
  const [whisperVisible, setWhisperVisible] = useState(false);

  // Heartbeat cycle
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setBeatPhase(p => (p === 'expand' ? 'contract' : 'expand'));
    }, 1500);
    return () => clearInterval(interval);
  }, [isInView]);

  // Whisper on first view
  useEffect(() => {
    if (isInView && !whisperShown) {
      setWhisperShown(true);
      setWhisperVisible(true);
      setTimeout(() => setWhisperVisible(false), 3000);
    }
  }, [isInView, whisperShown]);

  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 4,
        duration: Math.random() * 8 + 10,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.15 + 0.05,
      })),
    []
  );

  // 10 placeholder images
  const images = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: 15 + Math.random() * 70,
        y: 15 + Math.random() * 70,
        size: 40 + Math.random() * 30,
        parallaxX: (Math.random() - 0.5) * 8,
        parallaxY: (Math.random() - 0.5) * 8,
      })),
    []
  );

  const visibleCount = beatPhase === 'expand' ? 10 : 4;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20"
      style={{
        background:
          'linear-gradient(180deg, hsl(220 40% 8%) 0%, hsl(340 50% 15%) 50%, hsl(220 35% 10%) 100%)',
      }}
    >
      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, hsl(220 40% 5% / 0.7) 100%)',
        }}
      />

      {/* Particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'hsl(345 80% 65%)',
            filter: 'blur(2px)',
            opacity: 0,
          }}
          animate={
            isInView
              ? {
                  opacity: [0, p.opacity, 0],
                  y: [0, -60, -120],
                }
              : {}
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Whisper */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: whisperVisible ? 1 : 0 }}
        transition={{ duration: 1.5 }}
        className="absolute top-[15%] z-20 font-serif text-xl md:text-2xl text-primary-foreground/50 italic"
      >
        Look closely…
      </motion.p>

      {/* Section title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="relative z-10 font-serif text-3xl md:text-5xl text-primary-foreground mb-12 text-center px-6"
        style={{ textShadow: '0 0 40px hsl(345 80% 60% / 0.4)' }}
      >
        You Are The Only One Inside My Heart
      </motion.h2>

      {/* Beating heart container */}
      <motion.div
        className="relative z-10"
        animate={{
          scale: beatPhase === 'expand' ? 1.08 : 1,
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* Glow behind heart */}
        <motion.div
          className="absolute inset-0 -m-8"
          animate={{
            opacity: beatPhase === 'expand' ? 0.6 : 0.3,
            scale: beatPhase === 'expand' ? 1.2 : 1,
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            background:
              'radial-gradient(circle, hsl(345 80% 55% / 0.4) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Heart SVG with clipped images */}
        <div className="relative w-64 h-64 md:w-80 md:h-80">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{
              filter:
                'drop-shadow(0 0 20px hsl(345 80% 55% / 0.5)) drop-shadow(0 0 60px hsl(345 80% 55% / 0.2))',
            }}
          >
            <defs>
              <clipPath id="heartClip">
                <path d="M50 88 C25 65, 2 45, 2 28 C2 14, 14 2, 28 2 C38 2, 46 8, 50 18 C54 8, 62 2, 72 2 C86 2, 98 14, 98 28 C98 45, 75 65, 50 88Z" />
              </clipPath>
            </defs>

            {/* Heart fill */}
            <path
              d="M50 88 C25 65, 2 45, 2 28 C2 14, 14 2, 28 2 C38 2, 46 8, 50 18 C54 8, 62 2, 72 2 C86 2, 98 14, 98 28 C98 45, 75 65, 50 88Z"
              fill="hsl(345 70% 45%)"
            />

            {/* Images clipped inside heart */}
            <g clipPath="url(#heartClip)">
              {images.map((img, i) => (
                <motion.image
                  key={img.id}
                  href={`https://picsum.photos/seed/valentine${i}/200/200`}
                  x={img.x - img.size / 2}
                  y={img.y - img.size / 2}
                  width={img.size}
                  height={img.size}
                  preserveAspectRatio="xMidYMid slice"
                  animate={{
                    opacity: i < visibleCount ? (beatPhase === 'expand' ? 0.85 : 0.6) : 0,
                    x:
                      img.x -
                      img.size / 2 +
                      (beatPhase === 'expand' ? img.parallaxX : 0),
                    y:
                      img.y -
                      img.size / 2 +
                      (beatPhase === 'expand' ? img.parallaxY : 0),
                  }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  style={{ filter: 'brightness(0.7) saturate(1.3)' }}
                />
              ))}
            </g>

            {/* Shimmer overlay */}
            <motion.path
              d="M50 88 C25 65, 2 45, 2 28 C2 14, 14 2, 28 2 C38 2, 46 8, 50 18 C54 8, 62 2, 72 2 C86 2, 98 14, 98 28 C98 45, 75 65, 50 88Z"
              fill="url(#shimmer)"
              animate={{ opacity: [0.05, 0.15, 0.05] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <defs>
              <linearGradient id="shimmer" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                <stop offset="50%" stopColor="white" stopOpacity="0" />
                <stop offset="100%" stopColor="white" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>

      {/* Text below */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, delay: 1 }}
        className="relative z-10 text-center mt-12 px-6 max-w-lg"
      >
        <p
          className="font-serif text-xl md:text-2xl text-primary-foreground/80 leading-relaxed"
          style={{ textShadow: '0 0 20px hsl(345 80% 60% / 0.3)' }}
        >
          You are the only one inside my heart…
          <br />
          <span className="text-valentine-rose">And it beats for you.</span>
        </p>
      </motion.div>
    </section>
  );
};

export default HeartSection;
