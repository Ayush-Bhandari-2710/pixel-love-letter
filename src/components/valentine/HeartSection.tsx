import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';

import img0 from '../../assets/image.png';
import img1 from '../../assets/image1.png';
import img2 from '../../assets/image2.png';
import img3 from '../../assets/image3.png';
import img4 from '../../assets/image4.png';
import img5 from '../../assets/image5.png';
import img6 from '../../assets/image6.png';
import img7 from '../../assets/image7.png';
import img8 from '../../assets/image8.jpg';

const HeartSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [isBeat, setIsBeat] = useState(false);

  // Faster heartbeat (750ms)
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setIsBeat(prev => !prev);
    }, 750);

    return () => clearInterval(interval);
  }, [isInView]);

  const images = [
    img0,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
  ];

  // Optimized positions - no overlap, full coverage, organic layout
  const imageLayout = useMemo(() => {
    const positions = [
      // Top row - 3 images across the lobes
      { x: 22, y: 18, size: 26, rotation: -3 },  // Top left
      { x: 50, y: 22, size: 24, rotation: 2 },   // Top center
      { x: 78, y: 18, size: 26, rotation: 3 },   // Top right
      
      // Upper middle row - 3 images
      { x: 25, y: 40, size: 28, rotation: -2 },  // Left
      { x: 50, y: 42, size: 26, rotation: 1 },   // Center
      { x: 75, y: 40, size: 28, rotation: 2 },   // Right
      
      // Lower middle row - 2 images
      { x: 38, y: 62, size: 30, rotation: -4 },  // Left
      { x: 62, y: 62, size: 30, rotation: 4 },   // Right
      
      // Bottom - 1 image at the point
      { x: 50, y: 80, size: 22, rotation: 0 },   // Bottom point
    ];

    return positions.map((pos, index) => ({
      src: images[index],
      x: pos.x,
      y: pos.y,
      width: pos.size,
      height: pos.size,
      rotation: pos.rotation,
      scale: 1,
      zIndex: index,
    }));
  }, [images]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24"
      style={{
        background:
          'linear-gradient(180deg, hsl(220 45% 8%) 0%, hsl(340 50% 14%) 50%, hsl(220 40% 10%) 100%)',
      }}
    >
      {/* Ambient Glow */}
      <div className="absolute w-[500px] h-[500px] bg-rose-500/20 blur-3xl rounded-full" />

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="relative z-10 font-serif text-3xl md:text-5xl text-white mb-16 text-center px-6"
        style={{ textShadow: '0 0 40px rgba(255,100,150,0.5)' }}
      >
        You Are The Only One Inside My Heart
      </motion.h2>

      {/* Heart Container */}
      <motion.div
        className="relative z-10"
        animate={{ scale: isBeat ? 1.08 : 1 }}
        transition={{ duration: 0.85, ease: 'easeInOut' }}
      >
        {/* Glow pulse */}
        <motion.div
          className="absolute inset-0 -m-10 rounded-full"
          animate={{
            opacity: isBeat ? 0.7 : 0.4,
            scale: isBeat ? 1.3 : 1,
          }}
          transition={{ duration: 0.35 }}
          style={{
            background:
              'radial-gradient(circle, rgba(255,90,130,0.6) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        <div className="relative w-80 h-80 md:w-[420px] md:h-[420px]">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{
              filter:
                'drop-shadow(0 0 35px rgba(255,100,150,0.7)) drop-shadow(0 0 80px rgba(255,100,150,0.3))',
            }}
          >
            <defs>
              {/* Heart clip path */}
              <clipPath id="heartClip">
                <path d="M50 88 C25 65, 2 45, 2 28 C2 14, 14 2, 28 2 C38 2, 46 8, 50 18 C54 8, 62 2, 72 2 C86 2, 98 14, 98 28 C98 45, 75 65, 50 88Z" />
              </clipPath>

              {/* Soft edge mask - radial gradient for vignette effect */}
              <radialGradient id="softEdgeMask">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="50%" stopColor="white" stopOpacity="1" />
                <stop offset="85%" stopColor="white" stopOpacity="0.6" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>

              {/* Mask definition using the gradient */}
              <mask id="vignetteEllipse">
                <ellipse cx="50" cy="50" rx="50" ry="50" fill="url(#softEdgeMask)" />
              </mask>

              {/* Individual masks for each image with feathered edges */}
              {imageLayout.map((item, index) => (
                <mask key={`mask-${index}`} id={`imageMask${index}`}>
                  <ellipse
                    cx={item.x}
                    cy={item.y}
                    rx={item.width / 2}
                    ry={item.height / 2}
                    fill="url(#softEdgeMask)"
                  />
                </mask>
              ))}
            </defs>

            {/* Background fill */}
            <path
              d="M50 88 C25 65, 2 45, 2 28 C2 14, 14 2, 28 2 C38 2, 46 8, 50 18 C54 8, 62 2, 72 2 C86 2, 98 14, 98 28 C98 45, 75 65, 50 88Z"
              fill="rgba(255,60,110,0.15)"
            />

            {/* Images - Mosaic layout with soft edges */}
            <g clipPath="url(#heartClip)">
              {imageLayout.map((item, index) => {
                const halfWidth = item.width / 2;
                const halfHeight = item.height / 2;

                return (
                  <motion.g
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.08,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    <motion.image
                      href={item.src}
                      x={item.x - halfWidth}
                      y={item.y - halfHeight}
                      width={item.width}
                      height={item.height}
                      preserveAspectRatio="xMidYMid slice"
                      mask={`url(#imageMask${index})`}
                      animate={{
                        scale: isBeat ? 1.03 : 1,
                      }}
                      transition={{ duration: 0.35 }}
                      style={{
                        transformOrigin: `${item.x}px ${item.y}px`,
                        filter: 'brightness(1.08) contrast(1.1) saturate(1.15)',
                      }}
                      transform={`rotate(${item.rotation} ${item.x} ${item.y})`}
                    />
                  </motion.g>
                );
              })}
            </g>

            {/* Heart Stroke - Drawn on top */}
            <path
              d="M50 88 C25 65, 2 45, 2 28 C2 14, 14 2, 28 2 C38 2, 46 8, 50 18 C54 8, 62 2, 72 2 C86 2, 98 14, 98 28 C98 45, 75 65, 50 88Z"
              fill="none"
              stroke="rgba(255,120,160,0.98)"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* Inner glow stroke for depth */}
            <path
              d="M50 88 C25 65, 2 45, 2 28 C2 14, 14 2, 28 2 C38 2, 46 8, 50 18 C54 8, 62 2, 72 2 C86 2, 98 14, 98 28 C98 45, 75 65, 50 88Z"
              fill="none"
              stroke="rgba(255,180,200,0.6)"
              strokeWidth="1.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{
                filter: 'blur(2px)',
              }}
            />
          </svg>
        </div>
      </motion.div>

      {/* Bottom Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="relative z-10 text-center mt-16 px-6 max-w-xl"
      >
        <p
          className="font-serif text-xl md:text-2xl text-white/80 leading-relaxed"
          style={{ textShadow: '0 0 20px rgba(255,100,150,0.4)' }}
        >
          You are the only one inside my heart…
          <br />
          <span className="text-rose-400 font-semibold">
            And it beats for you.
          </span>
        </p>
      </motion.div>
    </section>
  );
};

export default HeartSection;