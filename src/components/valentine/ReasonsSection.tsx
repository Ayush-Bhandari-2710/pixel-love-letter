import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

const reasons = [
  {
    front: 'The way you say “hajur”',
    back: 'That soft little “hajur” when I call you. You don’t even realize how much comfort fits into that one word.',
  },
  {
    front: 'Your quiet strength',
    back: 'You’ve been through things that could have hardened you  but you still choose softness. That takes more courage than anyone sees.',
  },
  {
    front: 'Your honesty',
    back: 'You never pretend with me. Even when it’s uncomfortable. Even when it’s scary. That kind of truth is rare.',
  },
  {
    front: 'The way you care deeply',
    back: 'You act strong, but your heart feels everything. The world is gentler because you’re in it.',
  },
  {
    front: 'Your stubborn heart',
    back: 'You don’t give love easily. And that’s exactly why it means everything when you do.',
  },
  {
    front: 'The way you stay',
    back: 'In a world where people leave at the first difficulty, you try. You talk. You fix. You stay.',
  },
  {
    front: 'Your laugh at 2AM',
    back: 'When we’re half-asleep but still talking, and you laugh softly like the world doesn’t exist outside us.',
  },
  {
    front: 'The way you let me see you',
    back: 'The guarded parts. The unsure parts. The strong and the fragile. You let me in and that’s something I never take lightly.',
  },
];

interface HeartBurst {
  id: number;
  hearts: Array<{ x: number; y: number; rotate: number; scale: number; delay: number }>;
}

const ReasonsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [revealed, setRevealed] = useState(false);
  const [bursts, setBursts] = useState<HeartBurst[]>([]);

  const triggerBurst = useCallback(() => {
    const burst: HeartBurst = {
      id: Date.now(),
      hearts: Array.from({ length: 14 }, () => ({
        x: (Math.random() - 0.5) * 250,
        y: -(Math.random() * 200 + 50),
        rotate: Math.random() * 720 - 360,
        scale: Math.random() * 0.6 + 0.4,
        delay: Math.random() * 0.3,
      })),
    };

    setBursts(prev => [...prev, burst]);
    setTimeout(() => {
      setBursts(prev => prev.filter(b => b.id !== burst.id));
    }, 2500);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-40 px-4 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,45%,8%)] via-[hsl(330,35%,14%)] to-[hsl(210,45%,10%)]" />

      {/* Soft color glows */}
      <div className="absolute -top-20 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-emerald-400/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-rose-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center font-serif text-4xl md:text-5xl text-white mb-16 tracking-wide"
          style={{ textShadow: '0 0 30px rgba(255,120,150,0.4)' }}
        >
          🌹 Reasons I Love You
        </motion.h2>

        {!revealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center gap-5 mb-16"
          >
            <motion.button
              onClick={() => setRevealed(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="px-12 py-4 rounded-full bg-gradient-to-r from-rose-400 via-blue-500 to-emerald-400 text-white text-lg font-serif shadow-xl hover:shadow-2xl transition-all duration-500 animate-heartbeat"
            >
              Reasons I Love You ❤️
            </motion.button>

            <p className="text-white/50 text-l italic">
              No matter how many reasons I give… it will never be enough.
            </p>
          </motion.div>
        )}

        {revealed && (
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 18,
                  delay: index * 0.08,
                }}
                onClick={triggerBurst}
                className="flip-card h-56 cursor-pointer relative"
              >
                <div className="flip-card-inner rounded-2xl">

                  {/* Front */}
                  <div
                    className="flip-card-front rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-white/10 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500"
                    style={{
                      background:
                        index % 3 === 0
                          ? 'linear-gradient(145deg, rgba(255,100,150,0.08), rgba(255,100,150,0.03))'
                          : index % 3 === 1
                          ? 'linear-gradient(145deg, rgba(59,130,246,0.08), rgba(59,130,246,0.03))'
                          : 'linear-gradient(145deg, rgba(16,185,129,0.08), rgba(16,185,129,0.03))',
                    }}
                  >
                    <span
                      className="text-3xl mb-3 animate-heartbeat inline-block"
                      style={{ animationDelay: `${index * 0.4}s` }}
                    >
                      ❤️
                    </span>
                    <p className="font-serif text-white text-base">
                      {reason.front}
                    </p>
                  </div>

                  {/* Back */}
                  <div className="flip-card-back rounded-2xl p-6 flex items-center justify-center text-center backdrop-blur-xl bg-gradient-to-br from-rose-400/80 via-blue-500/60 to-emerald-400/60 shadow-2xl">
                    <p className="text-white text-sm leading-relaxed font-light">
                      {reason.back}
                    </p>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Heart bursts */}
      {bursts.map(burst => (
        <div key={burst.id} className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          {burst.hearts.map((heart, i) => (
            <motion.span
              key={i}
              initial={{ x: 0, y: 0, rotate: 0, scale: 0, opacity: 1 }}
              animate={{ x: heart.x, y: heart.y, rotate: heart.rotate, scale: heart.scale, opacity: 0 }}
              transition={{ duration: 2, delay: heart.delay, ease: 'easeOut' }}
              className="absolute text-xl"
            >
              💕
            </motion.span>
          ))}
        </div>
      ))}
    </section>
  );
};

export default ReasonsSection;
