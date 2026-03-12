import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

export default function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const handleConnect = (address: string) => {
    setWalletAddress(address);
  };

  const handleDisconnect = () => {
    setWalletAddress(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0b0d] to-black flex flex-col">
      <Header
        walletAddress={walletAddress}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      <div className="flex flex-1 pt-16">
        <Sidebar walletAddress={walletAddress} />

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}