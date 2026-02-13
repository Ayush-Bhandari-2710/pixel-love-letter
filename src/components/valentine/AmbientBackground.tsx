import { useMemo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const AmbientBackground = () => {
  const isMobile = useIsMobile();
  const particleCount = isMobile ? 12 : 25;

  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 8,
        duration: Math.random() * 12 + 16,
      })),
    [particleCount]
  );

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Deep navy base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,40%,8%)] via-[hsl(230,35%,6%)] to-[hsl(220,40%,8%)]" />

      {/* Animated crimson glow blob - bottom right */}
      <div
        className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full animate-ambient-blob-1"
        style={{
          bottom: '-15%',
          right: '-10%',
          background: 'radial-gradient(circle, hsl(345 80% 45% / 0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Animated royal blue glow blob - top left */}
      <div
        className="absolute w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full animate-ambient-blob-2"
        style={{
          top: '-10%',
          left: '-10%',
          background: 'radial-gradient(circle, hsl(220 70% 40% / 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Secondary warm glow - center */}
      <div
        className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full animate-ambient-blob-3"
        style={{
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, hsl(345 70% 50% / 0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* Grain/noise overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.04,
        }}
      />

      {/* Floating soft particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white/20 animate-ambient-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
};

export default AmbientBackground;
