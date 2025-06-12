'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Task } from '@/types/task';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Edit,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

const statusColors = {
  todo: 'bg-blue-900/40 text-blue-200 border border-blue-800',
  'in-progress': 'bg-yellow-900/30 text-yellow-200 border border-yellow-800',
  done: 'bg-emerald-900/30 text-emerald-200 border border-emerald-800',
};

export function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== 'done';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={cn(
          'h-full rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-100 shadow-lg transition-all duration-200 hover:shadow-xl',
          isOverdue && 'border-red-500'
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg leading-tight mb-2 truncate">
                {task.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge className={cn('px-2 py-0.5 text-xs font-semibold rounded', statusColors[task.status])}>
                  {task.status === 'in-progress'
                    ? 'In Progress'
                    : task.status === 'todo'
                    ? 'To Do'
                    : 'Done'}
                </Badge>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-zinc-400 hover:text-zinc-100">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-zinc-100 rounded-lg shadow-lg">
                <DropdownMenuItem onClick={() => onEdit(task)} className="hover:bg-zinc-800 hover:text-blue-400">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    onStatusChange(
                      task._id,
                      task.status === 'todo'
                        ? ('in-progress' as Task['status'])
                        : task.status === 'in-progress'
                        ? ('done' as Task['status'])
                        : ('todo' as Task['status'])
                    )
                  }
                  className="hover:bg-zinc-800 hover:text-yellow-300"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Change Status
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDelete(task._id)}
                  className="hover:bg-zinc-800 hover:text-red-400 text-red-500"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-zinc-400 mb-4 line-clamp-3">
            {task.description}
          </p>
          <div className="space-y-2">
            {task.dueDate && (
              <div
                className={cn(
                  'flex items-center gap-2 text-sm',
                  isOverdue ? 'text-red-400' : 'text-zinc-400'
                )}
              >
                <Calendar className="h-4 w-4" />
                <span>
                  Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                </span>
                {isOverdue && <span className="text-xs">(Overdue)</span>}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}