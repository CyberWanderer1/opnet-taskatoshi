import WalletConnect from './WalletConnect';

interface HeaderProps {
  walletAddress: string | null;
  onConnect: (address: string) => void;
  onDisconnect: () => void;
}

export default function Header({ walletAddress, onConnect, onDisconnect }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo left */}
        <div className="flex-shrink-0">
          <img
            src="/logo.png"           // ← apna actual logo path yahan daalen
            alt="Taskatoshi"
            className="h-9 w-auto object-contain drop-shadow-md"
          />
        </div>

        {/* Wallet connect right */}
        <div className="flex-shrink-0">
          <WalletConnect
            onConnect={onConnect}
            onDisconnect={onDisconnect}
            currentAddress={walletAddress}
          />
        </div>
      </div>
    </header>
  );
}