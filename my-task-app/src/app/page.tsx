import { ApiService } from '@/lib/api';
import Tasks from './tasks';

const fetchTasks = async () => await ApiService.getTasks();

export default async function Home() {
	const mockTasks = await fetchTasks();
	return (
		<>
			<Tasks tasksData={mockTasks} />
		</>
	);
}
