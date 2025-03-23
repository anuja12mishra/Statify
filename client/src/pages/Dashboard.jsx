
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

        <div className={`w-full ${addTaskDiv} block h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}> 
          
        </div>
        <div className={`w-full ${addTaskDiv} h-screen fixed top-0 left-0 flex items-center justify-center`}>
          <AddTask setAddTaskDiv={setAddTaskDiv}/>
        </div>

    </div>

  )
}

export default Dashboard