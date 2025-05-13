"use client";

import { useState } from "react";

export function Userform() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: 16,
        password: ''
      })
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          })
          
          if (response.ok) {
            alert('User created successfully!')
            setFormData({ name: '', email: '', age: 18, password: '' })
          } else {
            const error = await response.json()
            alert(error.error || 'Failed to create user')
          }
        } catch (error) {
          console.error('Error creating user:', error)
        }
      }
    
      return (
        <div className="w-full h-screen p-8 flex justify-center items-center">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-center mb-6">Create New User</h2>
            
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input 
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full h-12 bg-gray-100 rounded-lg p-3"
                placeholder="Enter your name"
              />
            </div>
    
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full h-12 bg-gray-100 rounded-lg p-3"
                placeholder="Enter your email"
                required
              />
            </div>
    
            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <input 
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                className="w-full h-12 bg-gray-100 rounded-lg p-3"
                min="16"
                required
              />
            </div>
    
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input 
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full h-12 bg-gray-100 rounded-lg p-3"
                placeholder="Enter your password"
                required
              />
            </div>
    
            <button 
              type="submit"
              className="w-full h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Create Account
            </button>
          </form>
        </div>
      )
}