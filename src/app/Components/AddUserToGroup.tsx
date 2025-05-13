'use client';

import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Group {
  id: number;
  name: string;
}

export function AddUserToGroup({ onSuccess }: { onSuccess?: () => void }) {
  const [users, setUsers] = useState<User[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [selectedGroup, setSelectedGroup] = useState<number>(0);

  useEffect(() => {
    fetchUsers();
    fetchGroups();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  };

  const fetchGroups = async () => {
    const response = await fetch('/api/groups');
    const data = await response.json();
    setGroups(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !selectedGroup) {
      alert('Please select both a user and a group');
      return;
    }

    try {
      const response = await fetch('/api/usergroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUser,
          groupId: selectedGroup,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add user to group');
      }

      alert('User added to group successfully!');
      setSelectedUser(0);
      setSelectedGroup(0);
      if (onSuccess) onSuccess();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to add user to group');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add User to Group</h2>
      
      <div>
        <label className="block text-sm font-medium mb-2">Select User</label>
        <select 
          className="w-full p-2 border rounded-md"
          value={selectedUser}
          onChange={(e) => setSelectedUser(Number(e.target.value))}
        >
          <option value={0}>Select a user...</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Select Group</label>
        <select 
          className="w-full p-2 border rounded-md"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(Number(e.target.value))}
        >
          <option value={0}>Select a group...</option>
          {groups.map(group => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      <button 
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Add to Group
      </button>
    </form>
  );
}