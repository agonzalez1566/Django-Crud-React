import axios from 'axios';

const tasksApi = axios.create({
    baseURL: 'http://localhost:8000/tasks/api/v1/tasks/'
});

export const getAllTasks = () => tasksApi.get("/");

export const getTasks = (id, importantFilter = null) => {
    const params = importantFilter !== null ? { params: { important: importantFilter } } : {};
    return tasksApi.get(`/${id}/`, params);
};


export const createTask = (task) => tasksApi.post("/", task)

export const deleteTask = (id) => tasksApi.delete(`/${id}`)

export const updateTask = (id, task) => tasksApi.put(`/${id}/`, task)

export const updateFieldTask = (id, task) => tasksApi.patch(`/${id}/`, task)