"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';

export function GroupForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: ''
    });
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.name.trim()) {
            alert('Please enter a group name');
            return;
        }

        try {
            const response = await fetch('/api/groups', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: formData.name.trim() })
            });
            
            if (!response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to create group');
                } else {
                    throw new Error('Server error: Failed to create group');
                }
            }

            await response.json();
            router.push('/');
            router.refresh();
        } catch (error) {
            console.error('Error creating group:', error);
            alert(error instanceof Error ? error.message : 'Failed to create group');
        }
    };
    
    return (
        <div className="w-full h-screen p-8 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 bg-white p-8 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-center mb-6">Create New Group</h2>
                
                <div>
                    <label className="block text-sm font-medium mb-1">Group Name</label>
                    <input 
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full h-12 bg-gray-100 rounded-lg p-3"
                        placeholder="Enter group name"
                        required
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Create Group
                </button>
            </form>
        </div>
    );
}