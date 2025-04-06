import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";

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
            alert("Title and Description are required!");
            return;
        }

        try {
            const res = await axios.post("http://localhost:1000/task/addTask", values, { withCredentials: true });
            setValues({
                title: "",
                description: "",
                priority: "low",
                status: "yetToStart"
            });
            if (res.status == 201) {
                alert(res.data.message || "Task added successfully!");
                setAddTaskDiv(false);
            } else {
                alert("Failed to add task");
            }

        } catch (err) {
            console.log(err);
            alert(err.response?.data?.error || "An error occurred");
        }
    };

    return (
        <div className="bg-white rounded px-4 sm:px-6 py-4 sm:py-6 w-full sm:w-[70%] md:w-[50%] lg:w-[40%] mx-auto">
            <h1 className="text-center font-semibold text-xl sm:text-2xl lg:text-3xl">Add Task</h1>
            <hr className="mb-4 mt-2" />
            <form method="POST" className="flex flex-col gap-4 md:gap-6" onSubmit={addTask}>
                <input
                    type="text"
                    className="border px-3 py-2 rounded border-zinc-300 outline-none w-full"
                    placeholder="Title"
                    name="title"
                    value={values.title}
                    onChange={change}
                />

                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Priority Section */}
                    <div className="w-full">
                        <h3 className="mb-2 text-sm sm:text-base">Select Priority</h3>
                        <select
                            className="border px-3 py-2 rounded border-zinc-300 outline-none w-full"
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
                        <h3 className="mb-2 text-sm sm:text-base">Select Status</h3>
                        <select
                            className="border px-3 py-2 rounded border-zinc-300 outline-none w-full"
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

                <textarea
                    name="description"
                    placeholder="Description"
                    className="border px-3 py-2 rounded border-zinc-300 outline-none w-full"
                    value={values.description}
                    onChange={change}
                />

                <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
                    <button  
                        type="submit"
                        className="text-center w-full bg-blue-800 py-2 hover:bg-blue-700 transition-all duration-300 text-white rounded"
                    >
                        Add Task
                    </button>
                    <button  
                        type="button"
                        className="text-center w-full bg-red-800 py-2 hover:bg-red-700 transition-all duration-300 text-white rounded"
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
