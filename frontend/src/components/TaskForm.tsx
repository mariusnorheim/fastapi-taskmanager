import React, { useState } from 'react';
import { createTask } from '../services/taskService';

interface TaskFormProps {
    onTaskCreated: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [error, setError] = useState<string | null>(null); // Error state

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createTask({ title, description });
            onTaskCreated();
            // Clear form and errors after submission
            setTitle('');
            setDescription('');
            setError(null);
        } catch (err) {
            setError('Failed to create task. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mx-auto p-4 space-y-4">
            {error && <div className="text-red-500 mb-4">{error}</div>}

            <div>
                <label className="block text-lg font-semibold">Title</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
            </div>
            <div>
                <label className="block text-lg font-semibold">Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" required />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
