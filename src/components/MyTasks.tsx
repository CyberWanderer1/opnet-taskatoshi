import { useState, useEffect } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  bounty: number;
  creator: string;
}

/**
 * Displays the list of open tasks loaded from localStorage.
 */
export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage when component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem('taskatoshi_tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  return (
    <div className="mt-16 w-full max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-indigo-400 mb-10">
        Open Tasks on Bitcoin L1
      </h2>

      {tasks.length === 0 ? (
        <div className="text-center text-gray-400 text-xl bg-gray-800/50 p-10 rounded-2xl border border-gray-700">
          No tasks yet. Create one above!
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-gray-800/70 p-8 rounded-2xl border border-gray-600 backdrop-blur-sm hover:border-indigo-500 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-4">{task.title}</h3>
              <p className="text-gray-300 mb-4">{task.description}</p>
              <div className="flex justify-between text-sm text-gray-400 mb-4">
                <span>Deadline: {task.deadline}</span>
                <span className="text-yellow-400 font-semibold">
                  Bounty: {task.bounty.toLocaleString()} satoshis
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Created by: {task.creator.slice(0, 8)}...{task.creator.slice(-6)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Adds a new task to localStorage and refreshes the page.
 * Used by CreateTask component.
 */
export const addNewTask = (task: Omit<Task, 'id'>) => {
  const saved = localStorage.getItem('taskatoshi_tasks');
  const current = saved ? JSON.parse(saved) : [];
  const newList = [...current, { ...task, id: Date.now() }];
  localStorage.setItem('taskatoshi_tasks', JSON.stringify(newList));
  window.location.reload(); // Temporary refresh to show new task
};