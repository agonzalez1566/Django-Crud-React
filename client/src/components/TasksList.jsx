import React, { useEffect, useState } from 'react'; // Agregar 'React' al import
import { getAllTasks } from '../api/tasks.api.js';
import { TaskCard } from './TaskCard';

export function TasksList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function loadTasks() {
            const result = await getAllTasks();
            // Ordenar las tareas por el campo "created" en orden ascendente (la más antigua primero)
            const sortedTasks = result.data.sort((a, b) => new Date(a.created) - new Date(b.created));
            setTasks(sortedTasks);
            // setTasks(result.data);
        }
        loadTasks();
    }, []);

    return (
        <div className='grid grid-cols-3 gap-3'>
            {tasks.map(task => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}
