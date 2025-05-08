"use client";

import { useState } from "react";

export function Workoutform() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
      })
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
          const response = await fetch('/api/workouts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          })
          
          if (response.ok) {
            alert('Workout created successfully!')
            setFormData({ name: '',description: ''})
          } else {
            const error = await response.json()
            alert(error.error || 'Failed to create workout')
          }
        } catch (error) {
          console.error('Error creating workout:', error)
        }
      }
    
      return (
        <div className="w-full h-screen p-8 flex justify-center items-center">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-center mb-6">Create New Workout</h2>
            
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input 
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full h-12 bg-gray-100 rounded-lg p-3"
                placeholder="Enter workout name"
              />
            </div>
    
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <input 
                type="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full h-12 bg-gray-100 rounded-lg p-3"
                placeholder="Enter workout description"
                required
              />
            </div>
    

    

    
            <button 
              type="submit"
              className="w-full h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create Workout
            </button>
          </form>
        </div>
      )
}