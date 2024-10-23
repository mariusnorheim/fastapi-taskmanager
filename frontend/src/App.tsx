import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { getTasks, createTask } from './services/taskService';

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);

    const refreshTaskList = async () => {
        try {
            const updatedTasks = await getTasks();
            setTasks(updatedTasks);
            setError(null);
        } catch (err) {
            setError("Failed to load tasks. Please try again later.");
        }
    };

    const handleTaskCreated = async (title: string, description: string) => {
        try {
            await createTask({ title, description });
            refreshTaskList();
            setError(null);
        } catch (err) {
            setError("Failed to create task. Please try again later.");
            throw err;
        }
    };

    const handleError = (message: string) => {
        setError(message);
    };

    useEffect(() => {
        refreshTaskList();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Task Manager</h1>
            
            <div className="container mx-auto p-4">
                {error && <div className="bg-red-500 text-white p-4 rounded mb-4">{error}</div>}
            </div>

            <TaskForm onTaskCreated={handleTaskCreated} handleError={handleError} />
            <TaskList tasks={tasks} refreshTaskList={refreshTaskList} handleError={handleError} />
        </div>
    );
};

export default App;