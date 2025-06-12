'use client';

import { Button } from '@/components/ui/button';
import { Priority, Status } from '@/types/task';

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { TaskFormData, taskSchema } from '@/lib/schemas';
import { Task } from '@/types/task';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface TaskFormProps {
	task?: Task;
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: TaskFormData) => void;
	isLoading?: boolean;
}
const defaultTaskValues: TaskFormData = {
	title: '',
	description: '',
	status: 'todo',
	priority: 'low',
	dueDate: '',
};
export function TaskForm({
	task,
	isOpen,
	onClose,
	onSubmit,
	isLoading,
}: TaskFormProps) {
	const form = useForm<TaskFormData>({
		resolver: zodResolver(taskSchema),
		defaultValues: defaultTaskValues,
	});

	useEffect(() => {
		if (task) {
			form.reset({
				title: task.title,
				description: task.description,
				status: task.status,
				priority: task.priority,
				dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
			});
		} else {
			form.reset(defaultTaskValues);
		}
	}, [task, form]);

	const handleSubmit = (data: TaskFormData): void => {
		onSubmit(data);
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto'>
				<DialogHeader>
					<DialogTitle>{task ? 'Edit Task' : 'Create New Task'}</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className='space-y-6'>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder='Enter task title' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder='Enter task description'
											className='min-h-[100px]'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='grid grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='status'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Status</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select status' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.values(Status).map((status) => (
													<SelectItem key={status} value={status}>
														{status
															.replace('-', ' ')
															.replace(/\b\w/g, (char) => char.toUpperCase())}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='priority'
								defaultValue='low'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Priority</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder='Select priority' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{Object.values(Priority).map((priority) => (
													<SelectItem key={priority} value={priority}>
														{priority.charAt(0).toUpperCase() +
															priority.slice(1)}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							<FormField
								control={form.control}
								name='dueDate'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Due Date</FormLabel>
										<FormControl>
											<Input type='date' {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<DialogFooter>
							<Button type='button' variant='outline' onClick={onClose}>
								Cancel
							</Button>
							<Button type='submit' disabled={isLoading}>
								{isLoading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
