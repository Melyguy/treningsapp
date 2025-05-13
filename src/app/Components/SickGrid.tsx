"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export function SickGrid() {
    const [users, setUsers] = useState<any[]>([]);
    const [workouts, setWorkouts] = useState<any[]>([]);
    const [groups, setGroups] = useState<any[]>([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('/api/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchUsers();
        async function fetchWorkouts() {
            try {
                const response = await fetch('/api/workouts');
                const data = await response.json();
                setWorkouts(data);
            } catch (error) {
                console.error('Error fetching workouts:', error);
            }
        }
        fetchWorkouts();
        async function fetchGroups() {
            try {
                const response = await fetch('/api/groups');
                const data = await response.json();
                setGroups(data);
            } catch (error) {
                console.error('Error fetching groups:', error);
            }
        }
        fetchGroups();
    }, []);

    return (
        <div className="bg-neutral-200 w-[95vw] h-[100vh] p-2 rounded-2xl flex flex-col justify-center items-center mt-16">
            <div className="bg-neutral-300  w-full p-2 h-full rounded-2xl grid grid-cols-8 grid-rows-12 gap-4">
                <div className="col-span-3 row-span-3 bg-neutral-400 rounded-3xl flex flex-col justify-center items-center ">
                    <h1 className="text-8xl font-bold text-white bg-clip-text">
                        {users.length} Users
                    </h1>
                    <Link href="/createuser" className="text-neutral-50   bg-blue-800 p-1 rounded-3xl w-full flex flex-row justify-center items-center">
                        <h1 className="p-1">Create Account</h1>
                    </Link>
                </div>


                
                <div className="col-span-3 row-span-8 bg-neutral-400 rounded-3xl flex flex-col justify-center items-center ">
                    
                </div>
                <div className="col-span-2 row-span-9 bg-neutral-400 rounded-3xl flex flex-col justify-center items-center ">
                <div className="grid grid-cols-2 gap-2 p-2 w-full h-full">

                </div>
                </div>
                <div className="col-span-3 row-span-4 bg-neutral-400 rounded-3xl flex flex-col justify-center items-center ">
                <h1 className="text-7xl font-bold text-white bg-clip-text">
                        {workouts.length} Workouts
                    </h1>
                    <Link href="/createworkout" className="text-neutral-50   bg-blue-800 p-1 rounded-3xl w-full flex flex-row justify-center items-center">
                        <h1 className="p-1">Create Workout</h1>
                    </Link>
                </div>
                <div className="col-span-3 row-span-5 bg-neutral-400 rounded-3xl flex flex-col justify-center items-center p-4">
                    <h1 className="text-7xl font-bold text-white bg-clip-text mb-4">
                        {groups.length} Groups
                    </h1>
                    <div className="w-full flex-1 overflow-y-auto">
                        {groups.map((group) => (
                            <div key={group.id} className="bg-neutral-500 rounded-xl p-2 mb-2 text-white">
                               ID: {group.id} | {group.name}                    
                     <Link href="/viewmembers" className="text-neutral-50 bg-blue-800 p-1 rounded-3xl w-full flex flex-row justify-center items-center mt-2">
                        <h1 className="p-1">View/Add Members</h1>
                    </Link>
                               
                            </div>
                        ))}
                    </div>
                    <Link href="/creategroup" className="text-neutral-50 bg-blue-800 p-1 rounded-3xl w-full flex flex-row justify-center items-center mt-2">
                        <h1 className="p-1">Create Group</h1>
                    </Link>
                </div>
                <div className="col-span-3 row-span-4 bg-neutral-400 rounded-3xl flex flex-col justify-center items-center ">
                    
                </div>
                <div className="col-span-2 row-span-3 bg-neutral-400 rounded-3xl flex flex-col justify-center items-center ">
                    
                </div>
             </div>
        </div>
    );
}