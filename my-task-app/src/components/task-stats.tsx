'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, ListTodo, TrendingUp } from 'lucide-react';
import { Task } from '@/types/task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const iconBg = {
  todo: 'from-sky-400 to-blue-600 bg-gradient-to-tr',
  inProgress: 'from-amber-400 to-yellow-500 bg-gradient-to-tr',
  done: 'from-emerald-500 to-green-700 bg-gradient-to-tr',
  total: 'from-yellow-300 to-fuchsia-600 bg-gradient-to-tr',
};

interface TaskStatsProps {
  tasks: Task[];
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const stats = {
    total: tasks.length,
    todo: tasks.filter(task => task.status === 'todo').length,
    inProgress: tasks.filter(task => task.status === 'in-progress').length,
    done: tasks.filter(task => task.status === 'done').length,
  };

  const completionRate = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: ListTodo,
      color: 'text-fuchsia-200',
      bg: iconBg.total,
    },
    {
      title: 'To Do',
      value: stats.todo,
      icon: Clock,
      color: 'text-sky-100',
      bg: iconBg.todo,
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: TrendingUp,
      color: 'text-amber-100',
      bg: iconBg.inProgress,
    },
    {
      title: 'Completed',
      value: stats.done,
      icon: CheckCircle,
      color: 'text-emerald-100',
      bg: iconBg.done,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="bg-zinc-900 border border-zinc-800 shadow-lg rounded-2xl overflow-hidden backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold text-slate-50">
                {stat.title}
              </CardTitle>
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center shadow ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="flex flex-row items-center space-x-2">
              <div className="text-2xl font-bold text-slate-100">{stat.value}</div>
              {stat.title === 'Completed' && (
                <p className="text-slate-400 text-sm">
                  ({completionRate}% completion rate)
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}