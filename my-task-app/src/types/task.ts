export enum Status {
	TODO = 'todo',
	IN_PROGRESS = 'in-progress',
	DONE = 'done',
}
export enum Priority {
	LOW = 'low',
	MEDIUM = 'medium',
	HIGH = 'high',
}

export interface Task {
	_id: string;
	title: string;
	description: string;
	status: Status;
	priority: Priority;
	dueDate?: string;
	createdAt: string;
	updatedAt: string;
}

export interface TaskFormData {
	title: string;
	description: string;
	status: Status;
	priority: Priority;
	dueDate?: string;
}

export interface TaskFilters {
	status?: string;
	priority?: string;
	search: string;
}