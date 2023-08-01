import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export function TaskCard({ task }) {
    const navigate = useNavigate();
    const isCompleted = task.done
    const isImportant = task.important
    const formatDateCreated = format(new Date(task.created), 'dd/MM/yyyy HH:mm:ss');
    const formatDateCompleted = isCompleted ? format(new Date(task.datecomplete), 'dd/MM/yyyy') : null;



    return (<div
        className={`p-3 ${isCompleted ? 'bg-green-300' : isImportant ? 'bg-yellow-300' : 'bg-zinc-800'
            } hover:bg-zinc-700`}
        onClick={() => navigate(`/tasks/${task.id}`)}
    >
        <h1 className='font-bold uppercase'>{task.title}</h1>
        <p className='text-slate-400'>{task.description}</p>
        <hr />
        <p className='text-slate-400 right-align'>Created: {formatDateCreated}</p>
        {isCompleted && <p className='text-slate-400 right-align'>Completed: {formatDateCompleted}</p>}


    </div>)

}

