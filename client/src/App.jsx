import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { TasksPage } from "./pages/TasksPages.jsx";
import { TaskFormPage } from "./pages/TaskFormPage.jsx";
import { Navigation } from './components/Navigation'
import { Toaster } from "react-hot-toast";
// Aquí importamos el componente ImportantTasksPage
import { TasksImportant } from "./pages/TasksImportant.jsx";
// Aquí importamos el componente ImportantTasksPage
import { TasksDone } from "./pages/TasksDone.jsx";

function App() {
    return (
        <BrowserRouter>
            <div className="container mx-auto">
                <Navigation />
                <Routes>
                    <Route path="/" element={<Navigate to='/tasks' />} />
                    <Route path="/tasks" element={<TasksPage />} />
                    <Route path="/tasks-create" element={<TaskFormPage />} />
                    <Route path="/tasks/:id" element={<TaskFormPage />} />
                    {/* Nueva ruta para mostrar las tareas importantes */}
                    <Route path="/tasks-important" element={<TasksImportant />} />
                    {/* Nueva ruta para mostrar las tareas Completadas */}
                    <Route path="/tasks-done" element={<TasksDone />} />
                </Routes>
                <Toaster />
            </div>
        </BrowserRouter>
    );
}

export default App;