import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import { showToast } from "../../helper/showTost";

function AddTask({ setAddTaskDiv }) {
    const [values, setValues] = useState({
        title: "",
        description: "",
        priority: "low",
        status: "yetToStart"
    });

    const change = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const addTask = async (e) => {
        e.preventDefault();

        if (!values.title.trim() || !values.description.trim()) {
            showToast('warning',"Title and Description are required!");
            //alert("Title and Description are required!");
            return;
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/task/addTask`, values, { withCredentials: true });
            setValues({
                title: "",
                description: "",
                priority: "low",
                status: "yetToStart"
            });
            //console.log(res.data.message);
            if (res.status == 201) {
                setAddTaskDiv(false);
                showToast('success','task added successfuly')
            }else if(res.status == 403){
                showToast('error','task added successfuly')
                //alert("please verify your email");
            }
            else {
                showToast('error','Failed to add task');
                //alert("Failed to add task");
            }

        } catch (err) {
            //console.log(err);
            showToast('error',err.response?.data?.message || "An error occurred");
            //alert(err.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg px-6 py-6 w-full max-w-md mx-auto">
            <h1 className="text-center font-semibold text-2xl text-blue-600 mb-4">Add Task</h1>
            <div className="h-px w-full bg-gray-100 mb-6"></div>
            
            <form method="POST" className="flex flex-col gap-5" onSubmit={addTask}>
                <div className="group">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Task Title</label>
                    <input
                        type="text"
                        className="border px-4 py-3 rounded-lg border-gray-300 outline-none w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter task title"
                        name="title"
                        value={values.title}
                        onChange={change}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Priority Section */}
                    <div className="w-full">
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Priority</label>
                        <select
                            className="border px-4 py-3 rounded-lg border-gray-300 outline-none w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-all"
                            name="priority"
                            value={values.priority}
                            onChange={change}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* Status Section */}
                    <div className="w-full">
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
                        <select
                            className="border px-4 py-3 rounded-lg border-gray-300 outline-none w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-all"
                            name="status"
                            value={values.status}
                            onChange={change}
                        >
                            <option value="yetToStart">Yet To Start</option>
                            <option value="inProgress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                <div className="group">
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
                    <textarea
                        name="description"
                        placeholder="Describe your task"
                        rows="4"
                        className="border px-4 py-3 rounded-lg border-gray-300 outline-none w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        value={values.description}
                        onChange={change}
                    />
                </div>

                <div className="flex items-center justify-between gap-4 pt-2">
                    <button  
                        type="submit"
                        className="text-center w-full bg-blue-600 py-3 hover:bg-blue-700 transition-all duration-300 text-white rounded-lg font-medium shadow-sm"
                    >
                        Add Task
                    </button>
                    <button  
                        type="button"
                        className="text-center w-full bg-white py-3 hover:bg-gray-50 transition-all duration-300 text-gray-700 rounded-lg font-medium border border-gray-300"
                        onClick={(e) => {
                            e.preventDefault();
                            setAddTaskDiv(false);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

AddTask.propTypes = {
    setAddTaskDiv: PropTypes.func.isRequired, 
};

export default AddTask;