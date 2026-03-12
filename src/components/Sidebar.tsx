import { Link } from 'react-router-dom';

interface SidebarProps {
  walletAddress: string | null;
}

export default function Sidebar({ walletAddress }: SidebarProps) {
  const menuItems = [
    { name: 'Home', icon: '🏠', path: '/app' },
    { name: 'Create Task', icon: '➕', path: '/create' }, // future page
    { name: 'My Tasks', icon: '📋', path: '/my-tasks' },
    { name: 'Leaderboard', icon: '🏆', path: '/leaderboard' },
    { name: 'Docs', icon: '📖', path: '/docs' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-72 bg-gray-900/90 backdrop-blur-xl border-r border-gray-800 h-screen sticky top-0 overflow-y-auto">
      <div className="p-8 border-b border-gray-800">
        <h2 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
          Taskatoshi
        </h2>
      </div>

      <nav className="flex-1 px-4 py-8">
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="flex items-center gap-4 px-6 py-4 rounded-xl text-gray-300 hover:bg-gray-800/70 hover:text-white transition-all"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 border-t border-gray-800 text-sm text-gray-500">
        <p>Connected: {walletAddress ? 'Yes' : 'No'}</p>
        <p className="mt-1">OP_NET Testnet</p>
      </div>
    </aside>
  );
}