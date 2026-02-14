import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const MUSIC_URL =
  'https://cdn.pixabay.com/audio/2024/11/29/audio_d27ac8c6f2.mp3';

const MusicToggle = () => {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.2;
    audioRef.current = audio;

    // Try autoplay
    audio.play().then(() => setPlaying(true)).catch(() => {});

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
      style={{
        boxShadow: playing
          ? '0 0 20px hsl(345 80% 60% / 0.3)'
          : '0 0 10px hsl(220 40% 30% / 0.3)',
      }}
      aria-label={playing ? 'Pause music' : 'Play music'}
    >
      <span className="text-lg">{playing ? '🎵' : '🔇'}</span>
    </motion.button>
  );
};

export default MusicToggle;
