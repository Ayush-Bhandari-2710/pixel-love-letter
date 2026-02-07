import { useEffect, useState, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  duration: number;
  opacity: number;
  emoji: string;
}

const heartEmojis = ['❤️', '💕', '💖', '💗', '💓'];

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const isMobile = useIsMobile();
  const maxHearts = isMobile ? 10 : 20;

  const spawnHeart = useCallback(() => {
    const heart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      size: Math.random() * 12 + 10,
      duration: Math.random() * 6 + 12,
      opacity: Math.random() * 0.15 + 0.05,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
    };
    setHearts(prev => [...prev, heart].slice(-maxHearts));
  }, [maxHearts]);

  useEffect(() => {
    const interval = setInterval(spawnHeart, isMobile ? 2500 : 1500);
    for (let i = 0; i < (isMobile ? 3 : 6); i++) {
      setTimeout(spawnHeart, i * 500);
    }
    return () => clearInterval(interval);
  }, [spawnHeart, isMobile]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {hearts.map(heart => (
        <span
          key={heart.id}
          className="absolute bottom-[-20px] animate-float-up"
          style={{
            left: `${heart.x}%`,
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animationDuration: `${heart.duration}s`,
          }}
          onAnimationEnd={() => setHearts(prev => prev.filter(h => h.id !== heart.id))}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
