
import Header from "../components/Dashboard/Header";
import AddTask from "../components/Dashboard/AddTask";
import { useState } from "react";

function Dashboard() {

  const [addTaskDiv,setAddTaskDiv] = useState("hidden");

  return (
    <div className="w-full relative">
        <div className="bg-white">
            <Header setAddTaskDiv={setAddTaskDiv}/>
        </div>

        <div className="px-12 py-4 flex gap-12 bg-zinc-200 min-h{89vh} max-h-auto">
          <div className="w-1/3 ">
            <div className="border-b pb-2"> 
              <h1 className="font-semibold text-zinc-800 text-center">
                Yet To Start
              </h1>
            </div>
          </div>
          <div className="w-1/3 ">
            <div className="border-b pb-2"> 
              <h1 className="font-semibold text-zinc-800 text-center">
                In Progress
              </h1>
            </div>
          </div>
          <div className="w-1/3 ">
            <div className="border-b pb-2"> 
              <h1 className="font-semibold text-zinc-800 text-center">
                Completed
              </h1>
            </div>
          </div>
        </div>

        <div className={`w-full ${addTaskDiv} block h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}> 
          
        </div>
        <div className={`w-full ${addTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}>
          <AddTask setAddTaskDiv={setAddTaskDiv}/>
        </div>

    </div>

  )
}

export default Dashboard