import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be less than 500 characters'),
  status: z.enum(['todo', 'in-progress', 'done'], {
    required_error: 'Status is required',
  }),
  priority: z.enum(['low', 'medium', 'high'], {
    required_error: 'Priority is required',
  }),
  dueDate: z.string().optional(),
  assignedTo: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export type TaskFormData = z.infer<typeof taskSchema>;