'use client'

import { useState, useEffect } from 'react';
import { AddUserToGroup } from '@/app/Components/AddUserToGroup';

interface UserGroup {
  userId: number;
  groupId: number;
  role: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface Group {
  id: number;
  name: string;
}

export default function ViewMembers() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [userGroups, setUserGroups] = useState<UserGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<number>(0);

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      fetchGroupMembers(selectedGroup);
    }
  }, [selectedGroup]);

  const fetchGroups = async () => {
    try {
      const response = await fetch('/api/groups');
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const fetchGroupMembers = async (groupId: number) => {
    try {
      const response = await fetch(`/api/usergroup/${groupId}`);
      const data = await response.json();
      setUserGroups(data);
    } catch (error) {
      console.error('Error fetching group members:', error);
    }
  };

  return (
    <div className="w-full min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold mb-8">Group Members</h1>
        
        <AddUserToGroup onSuccess={() => {
          if (selectedGroup) {
            fetchGroupMembers(selectedGroup);
          }
        }} />

        <div className="bg-white p-6 rounded-lg shadow-md">
          <select 
            className="w-full p-2 border rounded-md mb-6"
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

          {selectedGroup !== 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                {groups.find(g => g.id === selectedGroup)?.name} members
              </h2>
              <div className="divide-y">
                {userGroups.map(member => (
                  <div key={member.userId} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{member.user.name}</p>
                      <p className="text-sm text-gray-500">{member.user.email}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
