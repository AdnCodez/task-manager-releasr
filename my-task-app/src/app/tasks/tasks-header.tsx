'use client';

import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';

export default function TasksHeader({
  fetchTasks,
  isLoading,
  setIsFormOpen,
}: {
  fetchTasks: () => void;
  isLoading: boolean;
  setIsFormOpen: (open: boolean) => void;
}) {
  return (
    <header className="flex w-full items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 shadow-lg mb-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-1 flex items-center gap-2">
          <span className="inline-block w-2 h-6 bg-blue-600 mr-2 rounded-full" />
          Task Releasr 
        </h1>
        <p className="text-zinc-400 text-base max-w-2xl">
          Manage, organize, and track your tasks effortlessly. Quick add, smart search, and intuitive filters help you stay productive.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="border-zinc-700 text-zinc-200 hover:bg-zinc-800"
          onClick={fetchTasks}
          disabled={isLoading}
          aria-label="Refresh"
        >
          <RefreshCw className={`h-5 w-5`} />
        </Button>
        <Button
          className="bg-blue-700 hover:bg-blue-600 text-white font-semibold shadow-xl"
          onClick={() => setIsFormOpen(true)}
        >
          <Plus className="h-5 w-5 mr-2" />
          New Task
        </Button>
      </div>
    </header>
  );
}