import { useState } from 'react';

interface WalletConnectProps {
  onConnect: (address: string) => void;
  onDisconnect: () => void;
  currentAddress: string | null;
}

export default function WalletConnect({ onConnect, onDisconnect, currentAddress }: WalletConnectProps) {
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    setConnecting(true);
    setError(null);

    try {
      const provider = (window as any).opnet || (window as any).unisat;

      if (!provider) {
        throw new Error('OPWallet extension not installed or not detected. Please install from Chrome Web Store.');
      }

      let accounts: string[] = [];

      if (provider.requestAccounts) {
        accounts = await provider.requestAccounts();
      } else if (provider.request) {
        accounts = await provider.request({ method: 'eth_requestAccounts' });
      } else if (provider.enable) {
        accounts = await provider.enable();
      } else {
        throw new Error('No supported connect method found in OPWallet.');
      }

      if (accounts && accounts.length > 0) {
        const addr = accounts[0];
        onConnect(addr);
        console.log('Connected:', addr);
      } else {
        throw new Error('No accounts returned.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect OPWallet. Make sure it is installed, unlocked, and on testnet.');
      console.error(err);
    } finally {
      setConnecting(false);
    }
  };

  const disconnect = () => {
    onDisconnect();
  };

  if (currentAddress) {
    return (
      <div className="flex items-center gap-4">
        <div className="bg-green-900/50 px-5 py-3 rounded-xl border border-green-700 text-green-300 font-medium">
          {currentAddress.slice(0, 6)}...{currentAddress.slice(-4)}
        </div>
        <button
          onClick={disconnect}
          className="px-6 py-3 bg-red-600/70 hover:bg-red-700 rounded-xl transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={connectWallet}
        disabled={connecting}
        className={`px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg
          ${connecting ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl hover:scale-105'}`}
      >
        {connecting ? 'Connecting...' : 'Connect OPWallet'}
      </button>

      {error && (
        <p className="mt-4 text-red-400 text-sm max-w-xs">{error}</p>
      )}
    </div>
  );
}