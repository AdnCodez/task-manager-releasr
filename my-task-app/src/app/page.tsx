'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {

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
            <ThemeToggle />
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>
        </motion.div>

        {/* Tasks Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          HERE GOES THE TASKS GRID
        </motion.div>
      </div>
    </div>
  );
}