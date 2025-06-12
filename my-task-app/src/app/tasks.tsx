'use client';

import { TaskCard } from '@/app/tasks/tasks-card';
import { TaskFiltersComponent } from '@/app/tasks/tasks-filters';
import { TaskForm } from '@/app/tasks/tasks-form';
import { TaskStats } from '@/components/task-stats';
import { Button } from '@/components/ui/button';
import { ApiService } from '@/lib/api';
import { Task, TaskFilters, TaskFormData } from '@/types/task';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import TasksHeader from './tasks/tasks-header';

export default function Tasks({ tasksData }: { tasksData: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [filters, setFilters] = useState<TaskFilters>({
    search: '',
    status: undefined,
    priority: undefined,
  });

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        if (
          filters.search &&
          !task.title.toLowerCase().includes(filters.search.toLowerCase()) &&
          !task.description.toLowerCase().includes(filters.search.toLowerCase())
        ) {
          return false;
        }
        if (filters.status && task.status !== filters.status) {
          return false;
        }
        if (filters.priority && task.priority !== filters.priority) {
          return false;
        }
        return true;
      }),
    [tasks, filters]
  );

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const fetchedTasks = await ApiService.getTasks();
      setTasks(fetchedTasks);

      toast.success('Tasks refreshed successfully');
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (data: TaskFormData) => {
    try {
      setIsLoading(true);
      const newTask = await ApiService.createTask(data);

      setTasks((prev) => [newTask, ...prev]);
      setIsFormOpen(false);
      toast.success('Task created successfully');
    } catch (error) {
      toast.error('Failed to create task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask = async (data: TaskFormData) => {
    if (!editingTask) return;

    try {
      setIsLoading(true);
      const updatedTask = await ApiService.updateTask(editingTask._id, data);

      setTasks((prev) =>
        prev.map((task) => (task._id === editingTask._id ? updatedTask : task))
      );
      setEditingTask(undefined);
      setIsFormOpen(false);
      toast.success('Task updated successfully');
    } catch (error) {
      toast.error('Failed to update task');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await ApiService.deleteTask(taskId);

      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleStatusChange = async (taskId: string, status: Task['status']) => {
    try {
      await ApiService.updateTask(taskId, { status });

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId
            ? { ...task, status, updatedAt: new Date().toISOString() }
            : task
        )
      );
      toast.success('Task status updated');
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  const handleFormSubmit = (data: TaskFormData) => {
    if (editingTask) {
      handleUpdateTask(data);
    } else {
      handleCreateTask(data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 text-zinc-100 transition-colors">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			className="mb-8"
		>
			<TasksHeader
				fetchTasks={fetchTasks}
				isLoading={isLoading}
				setIsFormOpen={setIsFormOpen}
			/>
		</motion.div>

        {/* Stats */}
        <TaskStats tasks={tasks} />

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          <TaskFiltersComponent
            filters={filters}
            onFiltersChange={setFilters}
          />
        </motion.div>

        {/* Tasks Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredTasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-semibold text-slate-400 mb-2">
                {tasks.length === 0
                  ? 'No tasks yet'
                  : 'No tasks match your filters'}
              </h3>
              <p className="text-slate-500 mb-4">
                {tasks.length === 0
                  ? 'Create your first task to get started'
                  : 'Try adjusting your search or filters'}
              </p>
              {tasks.length === 0 && (
                <Button
                  className="mt-4"
                  onClick={() => setIsFormOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Task
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={handleEdit}
                    onDelete={handleDeleteTask}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Task Form Modal */}
        <TaskForm
          task={editingTask}
          isOpen={isFormOpen}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}