interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

interface TaskCreate {
    title: string;
    description: string;
}

const API_URL = 'http://localhost:8000/tasks/';

export const getTasks = async (): Promise<Task[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    return response.json(); // Parse JSON response
};

export const createTask = async (task: TaskCreate): Promise<Task> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error('Failed to create task');
    }
    return response.json();
};

export const updateTask = async (id: number, task: TaskCreate): Promise<Task> => {
    const response = await fetch(`${API_URL}${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });
    if (!response.ok) {
        throw new Error('Failed to update task');
    }
    return response.json();
};

export const deleteTask = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete task');
    }
};
