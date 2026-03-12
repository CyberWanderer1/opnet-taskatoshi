// src/components/Footer.tsx

export default function Footer() {
  return (
    <footer className="w-full mt-auto relative">
      {/* Glowing yellow-orange gradient separator line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 shadow-[0_0_20px_rgba(254,121,1,0.6)] opacity-80 animate-pulse-slow"></div>

      {/* Footer content - center aligned */}
      <div className="py-6 px-4 bg-gradient-to-t from-black/50 to-transparent text-center text-gray-500 text-sm">
        <p>
          Built with <span className="text-red-500 font-medium">❤️</span> for OP_NET • 2026
        </p>
        <p className="mt-1 text-gray-600">
          Taskatoshi – Task & Bounty Platform on OP_NET
        </p>
      </div>
    </footer>
  );
}