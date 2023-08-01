import { useEffect, useState } from 'react';
import { getAllTasks } from '../api/tasks.api.js'; // Asumiendo que existe la función getAllTasks
import { TaskCard } from './TaskCard.jsx';

export function TasksListDone() {
    const [doneTasks, setDoneTasks] = useState([]);

    useEffect(() => {
        async function DoneTasks() {
            try {
                const response = await getAllTasks();
                const doneTasks = response.data.filter(task => task.done);
                setDoneTasks(doneTasks);
            } catch (error) {
                console.error('Error fetching Done tasks:', error);
            }
        };
        DoneTasks();
    }, []);

    return (
        <div className='grid grid-cols-3 gap-3'>
            {doneTasks.map(task => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}
