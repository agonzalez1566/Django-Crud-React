import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createTask, deleteTask, updateTask, getTasks, updateFieldTask } from '../api/tasks.api.js';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-hot-toast";


export function TaskFormPage() {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
    const navigate = useNavigate();
    const params = useParams();
    // Estado local para la variable "task"
    const [task, setTask] = useState(null);

    //const doneValue = watch('done');

    const onSubmit = handleSubmit(async (data) => {
        try {
            // Actualizar el campo datecomplete solo si se marcó el checkbox "Done"
            const updatedData = {
                ...data,
                datecomplete: task.done ? new Date() : null
            };

            if (params.id) {
                await updateTask(params.id, updatedData);
                //messages toast.success...
                toast.success('Tarea actualizada', {
                    position: "bottom-right",
                    autoClose: 6000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                await createTask(data);
                toast.success('Tarea creada', {
                    position: "bottom-right",
                    autoClose: 6000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            navigate('/tasks');
        } catch (error) {
            console.error('Error al actualizar la tarea en el backend:', error);
        }
    });

    // Carga los datos de la tarea y los coloca en title, description, done e important.
    useEffect(() => {
        async function loadTasks() {
            if (params.id) {
                const {
                    data: { title, description, done, important, datecomplete },
                } = await getTasks(params.id);
                setValue('title', title);
                setValue('description', description);
                setValue('done', done);
                setValue('important', important);
                setTask({ done }); // Actualizar el estado local de la tarea con el valor del campo "done" del backend
            }
        }
        loadTasks();
    }, [params.id, setValue]);

    const handleDoneChange = (event) => {
        const checked = event.target.checked;
        setTask((prevTask) => ({
            ...prevTask,
            done: checked // Actualizar el estado local de la tarea cuando el usuario marca o desmarca el checkbox "Done"
        }));
    };

    return (
        <div className='max-w-xl mx-auto'>
            <form onSubmit={handleSubmit(onSubmit)}> {/* Se usa handleSubmit para manejar la función onSubmit */}
                <label htmlFor="mytitle">Title:</label>
                <input
                    type="text"
                    id='mytitle'
                    placeholder="Title"
                    {...register('title', { required: true })}
                    className='bg-zinc-700 p3 rounded-lg blcok w-full mb-3 mt-3'
                />
                {errors.title && <span>Title is required</span>} {/* Se muestra el mensaje de error si el título no está presente */}

                <label htmlFor="mydescription">Description:</label>
                <textarea
                    rows='3'
                    id="mydescription"
                    placeholder='Description'
                    {...register('description', { required: true })}
                    className='bg-zinc-700 p3 rounded-lg blcok w-full mb-3 mt-3'
                ></textarea>
                {errors.description && <span>Description is required</span>} {/* Se muestra el mensaje de error si la descripción no está presente */}



                <div className="container flex justify-between">

                    {/* Campo de tipo checkbox */}
                    <label htmlFor="mydone">Done:</label>
                    <input
                        type="checkbox"
                        id="mydone"
                        {...register('done')}
                        className="ml-2 mt-3"
                        onChange={handleDoneChange}
                        checked={task?.done || false}
                    />


                    {/* Campo de tipo checkbox */}
                    <label htmlFor="myimportant">Important:</label>
                    <input
                        type="checkbox"
                        id="myimportant"
                        {...register('important')}
                        className="ml-2 mt-3"
                    />

                </div>

                <button className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded  w-full mt-3"
                    type="submit"
                >Save</button> {/* Se agrega el atributo type para indicar que es un botón de envío */}

            </form>

            {
                // Botón para Eliminar con su funcionalidad deleteTask.
                params.id &&
                <div className='flex justify-end'>
                    <button
                        className="bg-red-500 hover:bg-red-700 p-3 text-white font-bold mt-3 px-4 rounded"
                        onClick={
                            async () => {
                                const accepted = window.confirm('Are you sure');
                                if (accepted) {
                                    await deleteTask(params.id);
                                    toast.success('Tarea eliminada', {

                                        position: "bottom-right",
                                        autoClose: 6000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                    navigate('/tasks');
                                }
                            }
                        }

                    >Delete</button>
                </div>
            }
        </div>
    );
}

