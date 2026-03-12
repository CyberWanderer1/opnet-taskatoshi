import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Landing Page - Full-screen hero with glowing logo, Enter button, and ambient background music
 */
export default function LandingPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-play ambient music on mount with low volume
    if (audioRef.current) {
      audioRef.current.volume = 0.18;
      audioRef.current.play().catch((err) => {
        console.log('Auto-play blocked by browser:', err);
      });
    }

    // Cleanup: pause music on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleEnter = () => {
    // Resume music on user interaction if paused
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(() => console.log('Music resume failed'));
    }
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b0d] via-[#0f0f1f] to-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Subtle animated radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,121,1,0.08)_0%,transparent_60%)] opacity-70 animate-pulse-slow" />

      {/* Glowing Logo - Center */}
      <div className="relative z-10 text-center mb-20">
        <div className="w-80 h-80 md:w-[500px] md:h-[500px] mx-auto relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#fe7901]/30 via-[#FF8A3D]/20 to-transparent blur-3xl animate-pulse-slow" />

          {/* Logo Image from public folder */}
          <img
            src="/logo.png"
            alt="Taskatoshi Logo - Bitcoin with Checklist Neon Glow"
            className="w-full h-full object-contain drop-shadow-[0_0_60px_rgba(254,121,1,0.9)] animate-pulse-scale"
          />
        </div>

        <h1 className="mt-12 text-7xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#fe7901] via-[#FF8A3D] to-[#fe7901] animate-gradient-x">
          Taskatoshi
        </h1>
      </div>

      {/* Large Enter Button */}
      <button
        onClick={handleEnter}
        className="relative z-10 px-20 py-8 text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#fe7901] to-[#FF8A3D] text-black rounded-3xl shadow-2xl hover:shadow-[0_0_80px_rgba(254,121,1,0.8)] hover:scale-105 transition-all duration-500 transform"
      >
        Enter App
      </button>

      {/* Ambient Background Music - Auto-play on load */}
      <audio
        ref={audioRef}
        loop
        // Royalty-free calming ambient track (change if needed)
        src="https://cdn.pixabay.com/download/audio/2022/05/13/audio_abcdef123456.mp3?filename=calm-ambient-relax-12345.mp3"
      />

      {/* Small footer text */}
      <p className="absolute bottom-8 text-gray-500 text-sm z-10">
        Built for OP_NET Vibecode Competition • 2026
      </p>
    </div>
  );
}