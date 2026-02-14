import { useEffect } from "react";

interface YouTubeAudioProps {
  videoId: string;
}

const YouTubeAudio = ({ videoId }: YouTubeAudioProps) => {
  return (
    <iframe
      title="Background Music"
      width="0"
      height="0"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&disablekb=1`}
      allow="autoplay"
      style={{ display: "none" }}
    />
  );
};

export default YouTubeAudio;
