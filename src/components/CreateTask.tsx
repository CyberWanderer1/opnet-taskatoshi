import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNewTask } from './MyTasks';

interface TaskFormProps {
  creatorAddress: string;
}

interface TaskFormData {
  title: string;
  description: string;
  deadline: string;
  bounty: string;
}

/**
 * Form component for creating new tasks
 * Validates input, persists to local storage, and provides user feedback
 */
export default function TaskForm({ creatorAddress }: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    deadline: '',
    bounty: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) return setErrorMessage('Task title is required');
    if (!formData.description.trim()) return setErrorMessage('Description is required');
    if (!formData.deadline) return setErrorMessage('Deadline is required');
    if (!formData.bounty || Number(formData.bounty) <= 0) {
      return setErrorMessage('Bounty must be a positive number');
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      addNewTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
        deadline: formData.deadline,
        bounty: Number(formData.bounty),
        creator: creatorAddress,
      });

      setIsSuccess(true);
      setFormData({ title: '', description: '', deadline: '', bounty: '' });
    } catch (err) {
      console.error('Task creation failed:', err);
      setErrorMessage('Failed to create task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateAnother = () => {
    setIsSuccess(false);
  };

  const handleViewMyTasks = () => {
    navigate('/my-tasks');
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-center text-indigo-400 mb-10">
        Create New Task
      </h2>

      {isSuccess ? (
        <div className="bg-green-900/40 p-10 rounded-2xl border border-green-700 text-center backdrop-blur-sm">
          <svg
            className="w-20 h-20 mx-auto mb-6 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-3xl font-bold text-green-300 mb-4">
            Congratulations!
          </h3>
          <p className="text-xl text-gray-200 mb-6">
            Your task has been created successfully!
          </p>
          <p className="text-gray-300 mb-10">
            (On-chain persistence with OP_NET coming soon)
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleCreateAnother}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-10 rounded-xl text-lg font-semibold transition-all shadow-lg hover:scale-105"
            >
              Create Another Task
            </button>

            <button
              onClick={handleViewMyTasks}
              className="bg-green-600 hover:bg-green-700 text-white py-4 px-10 rounded-xl text-lg font-semibold transition-all shadow-lg hover:scale-105"
            >
              View My Tasks
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800/50 p-8 rounded-2xl border border-gray-700 backdrop-blur-sm">
          {errorMessage && (
            <div className="bg-red-900/40 border border-red-700 text-red-300 px-6 py-4 rounded-lg text-center">
              {errorMessage}
            </div>
          )}

          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Task Title <span className="text-red-400">*</span>
            </label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Audit OP_NET contract"
              className="w-full px-5 py-4 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-5 py-4 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-y"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Deadline <span className="text-red-400">*</span>
              </label>
              <input
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-gray-900 border border-gray-600 rounded-lg text-white cursor-pointer focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:filter-none [&::-webkit-calendar-picker-indicator]:cursor-pointer hover:[&::-webkit-calendar-picker-indicator]:opacity-80"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Bounty (satoshis) <span className="text-red-400">*</span>
              </label>
              <input
                name="bounty"
                type="number"
                value={formData.bounty}
                onChange={handleChange}
                min="1"
                step="1000"
                className="w-full px-5 py-4 bg-gray-900 border border-gray-600 rounded-lg text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-auto [&::-webkit-inner-spin-button]:opacity-100 [&::-webkit-inner-spin-button]:text-white [&::-webkit-outer-spin-button]:appearance-auto [&::-webkit-outer-spin-button]:opacity-100 [&::-webkit-outer-spin-button]:text-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-5 px-10 rounded-xl text-xl font-bold transition-all duration-300 shadow-xl ${
              isSubmitting
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 hover:scale-[1.02]'
            }`}
          >
            {isSubmitting ? 'Creating...' : 'Create Task on Bitcoin L1'}
          </button>
        </form>
      )}
    </div>
  );
}