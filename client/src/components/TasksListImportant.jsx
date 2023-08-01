import { useEffect, useState } from 'react';
import { getAllTasks } from '../api/tasks.api.js'; // Asumiendo que existe la función getAllTasks
import { TaskCard } from './TaskCard';

export function TasksListImportant() {
    const [importantTasks, setImportantTasks] = useState([]);

    useEffect(() => {
        async function ImportantTasks() {
            try {
                const response = await getAllTasks();
                const importantTasks = response.data.filter(task => task.important);
                setImportantTasks(importantTasks);
            } catch (error) {
                console.error('Error fetching important tasks:', error);
            }
        };
        ImportantTasks();
    }, []);

    return (
        <div className='grid grid-cols-3 gap-3'>
            {importantTasks.map(task => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}
