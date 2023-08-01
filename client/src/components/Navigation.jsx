import { Link } from "react-router-dom";

export function Navigation() {
    return (
        <div className="flex justify-between py-3">
            <h1 className="font-bold text-3xl mb-4">
                <Link to="/tasks">Tasks List</Link>
            </h1>
            <button className="bg-indigo-500 px-3 py-2 rounded-lg">
                <Link to="/tasks-create">Create Task</Link>
            </button>
            <button className="bg-yellow-400 px-3 py-2 rounded-lg">
                <Link to="/tasks-important">Tasks Importants</Link>
            </button>
            <button className="bg-green-400 px-3 py-2 rounded-lg">
                <Link to="/tasks-done">Tasks Done</Link>
            </button>
        </div>
    );
}
