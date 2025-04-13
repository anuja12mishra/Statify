import Header from "../components/Header";
import AddTask from "../components/Dashboard/AddTask";
import SetTitle from "../components/Dashboard/SetTitle";
import { useEffect, useState } from "react";
import YetToStart from "../components/Dashboard/YetToStart";
import InProgress from "../components/Dashboard/InProgress";
import Completed from "../components/Dashboard/Completed";
import axios from "axios";
import EditTask from "../components/Dashboard/EditTask";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false); 
  const [isEditTaskVisible, setIsEditTaskVisible] = useState(false); 
  const [editId,setEditId] = useState(null);
  const [tasks, setTasks] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userLoggedIn")) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []); 

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/v1/user-details", {
          withCredentials: true,
        });
        setTasks(res.data.tasks);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserDetails();

    if(window.sessionStorage.getItem("editTaskId")){
      setIsEditTaskVisible(true);
      setEditId(window.sessionStorage.getItem("editTaskId"))
    }
  }, [isAddTaskVisible]);

  return (
    <div className="w-full relative">
      <div className="bg-white">
        <Header setAddTaskDiv={setIsAddTaskVisible} />
      </div>

      {/* Task Area */}
      <div className="px-4 py-4 bg-zinc-200 min-h-[89vh]">
        <div className="flex flex-col lg:flex-row lg:gap-6 gap-10">
          {/* Yet To Start Column */}
          <div className="w-full lg:w-1/3">
            <SetTitle title="Yet To Start" />
            <div className="pt-2">
              {tasks[0]?.yetToStart && <YetToStart task={tasks[0].yetToStart} />}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="w-full lg:w-1/3">
            <SetTitle title="In Progress" />
            <div className="pt-2">
              {tasks[1]?.inprogress && <InProgress task={tasks[1].inprogress} />}
            </div>
          </div>

          {/* Completed Column */}
          <div className="w-full lg:w-1/3">
            <SetTitle title="Completed" />
            <div className="pt-2">
              {tasks[2]?.completed && <Completed task={tasks[2].completed} />}
            </div>
          </div>
        </div>
      </div>



      {/* Add Task Modal */}
      <div className={`w-full ${isAddTaskVisible ? "block" : "hidden"} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}></div>
      <div className={`w-full ${isAddTaskVisible ? "flex" : "hidden"} h-screen fixed top-0 left-0 items-center justify-center`}>
        <AddTask setAddTaskDiv={setIsAddTaskVisible} />
      </div>

      {/* Edit Task Modal */}
      <div className={`w-full ${isEditTaskVisible ? "block" : "hidden"} h-screen fixed top-0 left-0 bg-zinc-800 opacity-85`}></div>
      <div className={`w-full ${isEditTaskVisible ? "flex" : "hidden"} h-screen fixed top-0 left-0 items-center justify-center`}>
        <EditTask setIsEditTaskVisible={setIsEditTaskVisible} editId={editId} setEditId={setEditId}/>
      </div>
    </div>
  );
}

export default Dashboard;