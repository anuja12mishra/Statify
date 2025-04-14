import Header from "../components/Header";
import AddTask from "../components/Dashboard/AddTask";
import SetTitle from "../components/Dashboard/SetTitle";
import { useEffect, useState } from "react";
import YetToStart from "../components/Dashboard/YetToStart";
import InProgress from "../components/Dashboard/InProgress";
import Completed from "../components/Dashboard/Completed";
import axios from "axios";
import EditTask from "../components/Dashboard/EditTask";
import Footer from "../components/Footer";
import { IoAddCircleOutline } from "react-icons/io5";

function Dashboard() {
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false); 
  const [isEditTaskVisible, setIsEditTaskVisible] = useState(false); 
  const [editId, setEditId] = useState(null);
  const [tasks, setTasks] = useState({});
  const [user, setUser] = useState(null); // Add state for user data

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user-details`, {
          withCredentials: true,
        });
        setTasks(res.data.tasks);
        setUser(res.data.user); // Assuming your API returns user data
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
    <div className="w-full relative min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <Header setAddTaskDiv={setIsAddTaskVisible} />
      </div>

      {/* Welcome Section */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome back{user?.username ? `, ${user.username}` : ''}!
            </h1>
            <p className="text-gray-600">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <button
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-all duration-200"
            onClick={() => setIsAddTaskVisible(true)}
          >
            <IoAddCircleOutline size={20} />
            <span className="hidden md:inline">Add Task</span>
          </button>
        </div>
      </div>

      {/* Task Area */}
      <div className="px-6 py-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-[90vh]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Yet To Start Column */}
            <div className="bg-white p-5 rounded-xl shadow-sm h-full">
              <SetTitle title="Yet To Start" />
              <div className="pt-4">
                {tasks[0]?.yetToStart && <YetToStart task={tasks[0].yetToStart} />}
              </div>
            </div>

            {/* In Progress Column */}
            <div className="bg-white p-5 rounded-xl shadow-sm h-full">
              <SetTitle title="In Progress" />
              <div className="pt-4">
                {tasks[1]?.inprogress && <InProgress task={tasks[1].inprogress} />}
              </div>
            </div>

            {/* Completed Column */}
            <div className="bg-white p-5 rounded-xl shadow-sm h-full">
              <SetTitle title="Completed" />
              <div className="pt-4">
                {tasks[2]?.completed && <Completed task={tasks[2].completed} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Add Task Modal */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40 ${isAddTaskVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}></div>
      <div className={`fixed inset-0 flex items-center justify-center z-50 transition-transform ${isAddTaskVisible ? "scale-100" : "scale-95 opacity-0 pointer-events-none"}`}>
        <AddTask setAddTaskDiv={setIsAddTaskVisible} />
      </div>

      {/* Edit Task Modal */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40 ${isEditTaskVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}></div>
      <div className={`fixed inset-0 flex items-center justify-center z-50 transition-transform ${isEditTaskVisible ? "scale-100" : "scale-95 opacity-0 pointer-events-none"}`}>
        <EditTask setIsEditTaskVisible={setIsEditTaskVisible} editId={editId} setEditId={setEditId}/>
      </div>
    </div>
  );
}

export default Dashboard;