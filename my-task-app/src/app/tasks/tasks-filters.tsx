'use client';

import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { TaskFilters } from '@/types/task';
import { Filter } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { SearchInput } from '../../components/search-input';

interface TaskFiltersProps {
	filters: TaskFilters;
	onFiltersChange: Dispatch<SetStateAction<TaskFilters>>;
}

export function TaskFiltersComponent({
	filters,
	onFiltersChange,
}: TaskFiltersProps) {
	const handleFilterChange = (key: keyof TaskFilters, value: string) => {
		onFiltersChange({
			...filters,
			[key]: value === 'all' ? undefined : value,
		});
	};

	const clearFilters = () => {
		onFiltersChange({
			search: '',
			status: undefined,
			priority: undefined,
		});
	};

	const hasActiveFilters =
		filters.status || filters.priority;

	return (
		<>
			<div className='flex flex-col lg:flex-row gap-4'>
				<div className='flex-1'>
					<SearchInput
						value={filters.search}
						onChange={(value) =>
							onFiltersChange((prev) => ({ ...prev, search: value }))
						}
						placeholder='Search tasks by title or description...'
					/>
				</div>
			</div>
			<div className='flex flex-wrap gap-4 items-center'>
				<div className='flex items-center gap-2'>
					<Filter className='h-4 w-4 text-muted-foreground' />
					<span className='text-sm text-muted-foreground'>Filters:</span>
				</div>

				<Select
					value={filters.status || 'all'}
					onValueChange={(value) => handleFilterChange('status', value)}>
					<SelectTrigger className='w-[130px]'>
						<SelectValue placeholder='Status' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>All Status</SelectItem>
						<SelectItem value='todo'>To Do</SelectItem>
						<SelectItem value='in-progress'>In Progress</SelectItem>
						<SelectItem value='done'>Done</SelectItem>
					</SelectContent>
				</Select>

				<Select
					value={filters.priority || 'all'}
					onValueChange={(value) => handleFilterChange('priority', value)}>
					<SelectTrigger className='w-[130px]'>
						<SelectValue placeholder='Priority' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>All Priority</SelectItem>
						<SelectItem value='high'>High</SelectItem>
						<SelectItem value='medium'>Medium</SelectItem>
						<SelectItem value='low'>Low</SelectItem>
					</SelectContent>
				</Select>

				{hasActiveFilters && (
					<Button variant='outline' size='sm' onClick={clearFilters}>
						Clear Filters
					</Button>
				)}
			</div>
		</>
	);
}
