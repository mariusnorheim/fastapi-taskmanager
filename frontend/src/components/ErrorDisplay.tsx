import React from 'react';

interface ErrorDisplayProps {
    message: string | null;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
    if (!message) return null;
    return (
        <div className="container mx-auto p-4">
            <div className="bg-red-500 text-white p-4 rounded mb-4">
                {message}
            </div>
        </div>
    );
};

export default ErrorDisplay;