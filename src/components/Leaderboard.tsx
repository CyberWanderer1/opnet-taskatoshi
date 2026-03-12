import { useState, useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  bounty: number;
  creator: string;
}

interface LeaderboardEntry {
  address: string;
  totalBounty: number;
  taskCount: number;
}

/**
 * Leaderboard page showing top task creators by bounty.
 */
export default function Leaderboard() {  // ← default export yahan hai
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('taskatoshi_tasks');
    if (savedTasks) {
      const tasks: Task[] = JSON.parse(savedTasks);
      const leaderboardMap = tasks.reduce((acc, task) => {
        if (!acc[task.creator]) {
          acc[task.creator] = { address: task.creator, totalBounty: 0, taskCount: 0 };
        }
        acc[task.creator].totalBounty += task.bounty;
        acc[task.creator].taskCount += 1;
        return acc;
      }, {} as Record<string, LeaderboardEntry>);
      const leaderboardArray = Object.values(leaderboardMap).sort(
        (a, b) => b.totalBounty - a.totalBounty
      );
      setLeaderboard(leaderboardArray);
    }
  }, []);

  return (
    <div className="mt-16 w-full max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-indigo-400 mb-10">
        Leaderboard - Top Task Creators
      </h2>

      {leaderboard.length === 0 ? (
        <div className="text-center text-gray-400 text-xl bg-gray-800/50 p-10 rounded-2xl border border-gray-700">
          No tasks yet. Create some to appear on the leaderboard!
        </div>
      ) : (
        <div className="bg-gray-800/70 p-8 rounded-2xl border border-gray-600 backdrop-blur-sm">
          <div className="grid grid-cols-4 gap-4 text-gray-300 font-semibold mb-4">
            <span>Rank</span>
            <span>Address</span>
            <span>Total Bounty</span>
            <span>Tasks Created</span>
          </div>
          {leaderboard.map((entry, index) => (
            <div
              key={entry.address}
              className="grid grid-cols-4 gap-4 py-4 border-t border-gray-700 text-gray-300"
            >
              <span>{index + 1}</span>
              <span>{entry.address.slice(0, 6)}...{entry.address.slice(-4)}</span>
              <span className="text-yellow-400">{entry.totalBounty.toLocaleString()} satoshis</span>
              <span>{entry.taskCount}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}