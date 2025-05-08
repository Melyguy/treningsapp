

'use client'

import { SickGrid } from "./Components/SickGrid";



export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center">
            <h1 className="text-8xl mt-16 font-semibold">Workout App</h1>
            <SickGrid />
    </div>
  );
}
