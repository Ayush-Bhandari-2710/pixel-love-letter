import { useState, useRef, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const messages = [
  {
    title: 'When You Feel Insecure',
    emoji: '🤍',
    message: `
There will be nights when you stand in front of the mirror a little longer.

You’ll look at yourself and notice things you wish were different.
You’ll replay conversations in your head.
You’ll wonder if you were “too much.”
Or maybe not enough.

And in those quiet, heavy moments,
when your thoughts are louder than your confidence,
I want you to imagine something.

Imagine me sitting beside you.
Not judging.
Not correcting.
Just looking at you the way I always do.

Because the girl you criticize is the girl I adore.

I see the softness you try to hide.
I see the strength you pretend is normal.
I see the way you care so deeply it scares you.

“You are not hard to love. You are deeply human.”

The world may have made you question your worth.
Past experiences may have made you shrink yourself.

But I will not.

Even on the days you feel fragile,
even on the days you feel replaceable,
even on the days you think you are fading —

You are still the only one I see.

And nothing about you needs fixing to deserve love.
    `,
  },

  {
    title: 'When You Feel Tired',
    emoji: '🌙',
    message: `
Some days will feel heavier than others.

You’ll wake up already exhausted.
Your mind will run faster than your body.
Your responsibilities will feel endless.
And you’ll try to carry it all quietly, like you always do.

But love,
you don’t have to be the strong one every day.

Imagine this:

It’s late.
The world is silent.
You’re sitting there, drained.
And instead of expecting more from you,
I just sit next to you.

No advice.
No pressure.
Just presence.

“You are allowed to pause without apologizing.”

If your shoulders are tired,
let me carry the emotional weight.
If your heart feels overwhelmed,
let me be your stillness.

You don’t have to impress me with strength.
You don’t have to prove resilience.
You don’t have to earn rest.

Even when you are quiet,
even when you are distant,
even when you are too tired to be your usual self —

You are still loved exactly the same.
    `,
  },

  {
    title: 'When We Disagree',
    emoji: '🤝',
    message: `
There may be moments when our words don’t land softly.

When something small feels bigger than it should.
When frustration shows up before understanding.
When we both need space to breathe.

But here is what will never change:

I am not your opponent.

I am not here to win.
I am not here to dominate.
I am not here to walk away when things get uncomfortable.

Imagine this instead:

Two people sitting on opposite sides of a table,
not fighting each other —
but placing the problem in the middle.

“We solve it together. We don’t attack each other.”

My ego is not more important than us.
Being right is not more important than staying.
Temporary emotion is not stronger than long-term love.

If voices rise,
we lower them.
If tension builds,
we soften.
If misunderstandings happen,
we untangle them.

Because choosing you is not something I do only when things are easy.

I choose you especially when things require effort.
    `,
  },

  {
    title: 'When You Feel Alone',
    emoji: '💗',
    message: `
There may be days when the world feels distant.

When the room is full but your heart feels empty.
When your thoughts spiral and no one seems to understand them.
When you feel like you are fighting battles silently.

In those moments,
close your eyes.

Picture me standing beside you.
Not in front of you.
Not behind you.

Beside you.

“You do not walk through life alone anymore.”

If the world feels loud,
I will be your quiet.
If people misunderstand you,
I will listen.
If you feel like withdrawing,
I will gently stay.

My presence in your life is not temporary.
My care is not seasonal.
My loyalty is not fragile.

Even if distance exists.
Even if circumstances change.
Even if life tests us.

You will always have a place where you are not too much,
not misunderstood,
not alone.

And that place is with me.
    `,
  },
];


const FloatingHearts = () => {
  const hearts = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 14 + 10,
        duration: Math.random() * 15 + 18,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.12 + 0.04,
        emoji: ['💌', '💝', '💖', '🎀'][Math.floor(Math.random() * 4)],
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map(h => (
        <span
          key={h.id}
          className="absolute bottom-[-20px] animate-float-up"
          style={{
            left: `${h.x}%`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
};

const FutureMessagesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="py-32 md:py-48 px-4 relative overflow-hidden">
      {/* Dreamy background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-valentine-lavender/5 to-transparent" />
      
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(280 70% 55% / 0.15) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(345 75% 60% / 0.12) 0%, transparent 70%)',
            filter: 'blur(90px)',
            right: '15%',
            top: '20%',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <FloatingHearts />

      {/* Decorative corner elements */}
      <motion.div
        className="absolute top-20 left-10 text-5xl opacity-8"
        animate={{
          rotate: [0, 10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        💌
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 text-5xl opacity-8"
        animate={{
          rotate: [0, -10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      >
        💝
      </motion.div>

      <div className="max-w-3xl mx-auto relative">
        {/* Header with personal touch */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          {/* Decorative top accent */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <span className="text-xl opacity-40">✨</span>
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-valentine-lavender/40 to-valentine-lavender/40 rounded-full" />
            <span className="text-2xl">💌</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent via-valentine-lavender/40 to-valentine-lavender/40 rounded-full" />
            <span className="text-xl opacity-40">✨</span>
          </motion.div>

          <h2 
            className="font-serif text-4xl md:text-5xl text-primary-foreground mb-5 relative inline-block"
            style={{
              background: 'linear-gradient(135deg, hsl(280 70% 75%), hsl(345 75% 75%), hsl(280 70% 75%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            For The Days You'll Need This
            <motion.div
              className="absolute -inset-3 bg-gradient-to-r from-valentine-lavender/10 via-valentine-rose/10 to-valentine-lavender/10 rounded-2xl -z-10"
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ filter: 'blur(15px)' }}
            />
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-primary-foreground/50 font-serif text-lg md:text-xl italic"
          >
            Open when you need to hear it most
          </motion.p>

          {/* Subtitle with heart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full"
            style={{
              background: 'linear-gradient(135deg, hsl(280 70% 50% / 0.08), hsl(345 75% 50% / 0.08))',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            <span className="text-sm font-serif text-primary-foreground/60">
              Letters from my heart to yours
            </span>
            <span className="text-base">💝</span>
          </motion.div>
        </motion.div>

        {/* Message cards - envelope style */}
        <div className="space-y-5">
          {messages.map((msg, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Envelope/Letter card */}
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient border on hover */}
                  <div className="absolute inset-0 rounded-2xl p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: 'linear-gradient(135deg, hsl(280 70% 60% / 0.3), hsl(345 75% 60% / 0.3))',
                      }}
                    />
                  </div>

                  <motion.button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="relative w-full text-left px-7 py-6 rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden"
                    style={{
                      background: isOpen
                        ? 'linear-gradient(135deg, hsl(280 70% 15% / 0.4), hsl(345 75% 15% / 0.4))'
                        : 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(20px)',
                      border: isOpen
                        ? '1px solid rgba(255, 255, 255, 0.15)'
                        : '1px solid rgba(255, 255, 255, 0.06)',
                    }}
                  >
                    {/* Shimmer effect on hover */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, transparent 0%, hsl(280 70% 60% / 0.05) 50%, transparent 100%)',
                      }}
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />

                    {/* Sealed/Unsealed indicator */}
                    <div className="absolute top-4 right-4">
                      <motion.div
                        className={`text-2xl ${isOpen ? 'opacity-100' : 'opacity-40'}`}
                        animate={{
                          rotate: isOpen ? 360 : 0,
                          scale: isOpen ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {isOpen ? '💌' : '✉️'}
                      </motion.div>
                    </div>

                    <div className="flex items-center justify-between pr-12">
                      <div className="flex items-center gap-4">
                        {/* Emoji badge */}
                        <motion.div
                          className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg"
                          style={{
                            background: 'linear-gradient(135deg, hsl(280 70% 50% / 0.2), hsl(345 75% 50% / 0.2))',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                          }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {msg.emoji}
                        </motion.div>

                        <div>
                          <h3 className="font-serif text-xl md:text-2xl text-primary-foreground mb-1">
                            {msg.title}
                          </h3>
                          <p className="text-sm text-primary-foreground/40 italic">
                            {isOpen ? 'Opened with love' : 'Tap to open'}
                          </p>
                        </div>
                      </div>

                      {/* Arrow/Plus indicator */}
                      <motion.div
                        animate={{
                          rotate: isOpen ? 180 : 0,
                        }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-3xl text-primary-foreground/30"
                      >
                        ↓
                      </motion.div>
                    </div>
                  </motion.button>

                  {/* Message content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-7 pt-6 pb-8 relative">
                          {/* Decorative quote marks */}
                          <div className="absolute top-4 left-4 text-6xl text-valentine-lavender/10 font-serif leading-none">
                            "
                          </div>
                          <div className="absolute bottom-4 right-4 text-6xl text-valentine-rose/10 font-serif leading-none rotate-180">
                            "
                          </div>

                          {/* Message text with handwritten feel */}
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="relative z-10"
                          >
                            <p className="font-serif text-xl md:text-2xl text-primary-foreground/90 leading-relaxed italic text-center mb-6 px-8">
                              {msg.message}
                            </p>

                            {/* Signature line */}
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: 0.4, duration: 0.8 }}
                              className="h-[1px] bg-gradient-to-r from-transparent via-valentine-lavender/40 to-transparent mb-4"
                            />

                            {/* Personal sign-off */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6, duration: 0.5 }}
                              className="flex items-center justify-center gap-2 text-primary-foreground/50"
                            >
                              <span className="font-serif italic text-sm">Always yours</span>
                              <span className="text-base">{msg.emoji}</span>
                            </motion.div>

                            {/* Floating sparkles */}
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 0.6 }}
                              transition={{ delay: 0.7, type: 'spring' }}
                              className="absolute -top-2 right-12 text-lg"
                            >
                              ✨
                            </motion.span>
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 0.6 }}
                              transition={{ delay: 0.85, type: 'spring' }}
                              className="absolute -bottom-2 left-12 text-lg"
                            >
                              ✨
                            </motion.span>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 px-8 py-4 rounded-full"
            style={{
              background: 'linear-gradient(135deg, hsl(280 70% 50% / 0.1), hsl(345 75% 50% / 0.1))',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <span className="font-serif text-lg text-primary-foreground/60 italic">
              You are never alone in this
            </span>
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="text-xl"
            >
              💝
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FutureMessagesSection;