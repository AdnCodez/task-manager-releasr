'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, Edit, MoreHorizontal, Trash2, User } from 'lucide-react';
import { format } from 'date-fns';
import { Task } from '@/types/task';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: Task['status']) => void;
}

const statusColors = {
  todo: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  done: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

const priorityColors = {
  low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn(
        'h-full transition-all duration-200 hover:shadow-lg',
        isOverdue && 'border-red-200 dark:border-red-800'
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg leading-tight mb-2 truncate">
                {task.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge className={statusColors[task.status]}>
                  {task.status === 'in-progress' ? 'In Progress' : 
                   task.status === 'todo' ? 'To Do' : 'Done'}
                </Badge>
                {/* <Badge variant="outline" className={priorityColors[task.priority]}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Badge> */}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(task)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onStatusChange(task._id, 
                    task.status === 'todo' ? 'in-progress' : 
                    task.status === 'in-progress' ? 'done' : 'todo'
                  )}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Change Status
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(task._id)}
                  className="text-red-600 dark:text-red-400"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {task.description}
          </p>
          
          <div className="space-y-2">
            {task.dueDate && (
              <div className={cn(
                'flex items-center gap-2 text-sm',
                isOverdue ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'
              )}>
                <Calendar className="h-4 w-4" />
                <span>Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                {isOverdue && <span className="text-xs">(Overdue)</span>}
              </div>
            )}
            
            {task.assignedTo && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Assigned to: {task.assignedTo}</span>
              </div>
            )}
           
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}