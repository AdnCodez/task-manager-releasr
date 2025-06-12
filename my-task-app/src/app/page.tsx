'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, RefreshCw } from 'lucide-react';
import { Task, TaskFilters } from '@/types/task';
import { TaskFormData } from '@/lib/schemas';
import { ApiService } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { SearchInput } from '@/components/search-input';
import { TaskFiltersComponent } from '@/components/task-filters';
import { TaskCard } from '@/components/task-card';
import { TaskForm } from '@/components/task-form';
import { TaskStats } from '@/components/task-stats';
import { toast } from 'sonner';

// Mock data
const mockTasks: Task[] = [
  {
    _id: '1',
    title: 'Design System Implementation',
    description: 'Create a comprehensive design system with components, tokens, and documentation for the new product.',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-01-15',
    assignedTo: 'John Doe',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
  },
  {
    _id: '2',
    title: 'API Documentation',
    description: 'Write comprehensive API documentation for all endpoints including examples and error handling.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2024-01-20',
    assignedTo: 'Jane Smith',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    _id: '3',
    title: 'User Authentication',
    description: 'Implement secure user authentication with JWT tokens and password reset functionality.',
    status: 'done',
    priority: 'high',
    assignedTo: 'Mike Johnson',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-08T00:00:00Z',
  },
  {
    _id: '4',
    title: 'Mobile Responsive Design',
    description: 'Ensure all pages are fully responsive and work seamlessly on mobile devices.',
    status: 'todo',
    priority: 'medium',
    dueDate: '2024-01-25',
    assignedTo: 'Sarah Wilson',
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z',
  },
  {
    _id: '5',
    title: 'Performance Optimization',
    description: 'Optimize application performance including lazy loading, caching, and bundle size reduction.',
    status: 'in-progress',
    priority: 'low',
    dueDate: '2024-02-01',
    assignedTo: 'Alex Brown',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-11T00:00:00Z',
  },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [filters, setFilters] = useState<TaskFilters>({
    search: '',
    status: undefined,
    priority: undefined,
    assignedTo: undefined,
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase()) &&
          !task.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.status && task.status !== filters.status) {
        return false;
      }
      if (filters.priority && task.priority !== filters.priority) {
        return false;
      }
      if (filters.assignedTo && task.assignedTo !== filters.assignedTo) {
        return false;
      }
      return true;
    });
  }, [tasks, filters]);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      // In a real app, you would uncomment the line below:
      // const fetchedTasks = await ApiService.getTasks();
      // setTasks(fetchedTasks);
      
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 500));
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
      // In a real app, you would uncomment the line below:
      // const newTask = await ApiService.createTask(data);
      
      // For now, we'll simulate creating a task
      const newTask: Task = {
        _id: 'Date.now().toString()',
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setTasks(prev => [newTask, ...prev]);
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
      // In a real app, you would uncomment the line below:
      // const updatedTask = await ApiService.updateTask(editingTask._id, data);
      
      // For now, we'll simulate updating a task
      const updatedTask: Task = {
        ...editingTask,
        ...data,
        updatedAt: new Date().toISOString(),
      };
      
      setTasks(prev => prev.map(task => 
        task._id === editingTask._id ? updatedTask : task
      ));
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
      // In a real app, you would uncomment the line below:
      // await ApiService.deleteTask(taskId);
      
      setTasks(prev => prev.filter(task => task._id !== taskId));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleStatusChange = async (taskId: string, status: Task['status']) => {
    try {
      // In a real app, you would uncomment the line below:
      // await ApiService.updateTask(taskId, { status });
      
      setTasks(prev => prev.map(task => 
        task._id === taskId ? { ...task, status, updatedAt: new Date().toISOString() } : task
      ));
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Task Releasr
            </h1>
            <p className="text-muted-foreground mt-2">
              Collaborative task management made simple
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={fetchTasks}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <ThemeToggle />
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>
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
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <SearchInput
                value={filters.search}
                onChange={(value) => setFilters(prev => ({ ...prev, search: value }))}
                placeholder="Search tasks by title or description..."
              />
            </div>
          </div>
          
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
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                {tasks.length === 0 ? 'No tasks yet' : 'No tasks match your filters'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {tasks.length === 0 
                  ? 'Create your first task to get started' 
                  : 'Try adjusting your search or filters'
                }
              </p>
              {tasks.length === 0 && (
                <Button onClick={() => setIsFormOpen(true)}>
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