import React, { useState } from 'react';

interface TaskFormProps {
    onTaskCreated: (title: string, description: string) => Promise<void>;
    handleError: (message: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated, handleError }) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title && description) {
            try {
                await onTaskCreated(title, description);
                setTitle("");
                setDescription("");
                handleError("");
            } catch (err) {
                handleError("Failed to create task. Please try again later.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mx-auto p-4 space-y-4">
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
