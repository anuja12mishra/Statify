import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

function EditTask({ setIsEditTaskVisible, editId, setEditId }) {
    const [values, setValues] = useState({
        title: "",
        description: "",
        priority: "low",
        status: "yetToStart",
        _id: "" 
    });

    const [loading, setLoading] = useState(false);

    const change = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    useEffect(() => {
        if (!editId) return;

        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:1000/task/getTask/${editId}`, {
                    withCredentials: true,
                });
                const data = res.data.taskDetails;
                setValues({
                    title: data.title,
                    description: data.description,
                    priority: data.priority,
                    status: data.status,
                    _id: data._id // Ensure _id is set
                });
            } catch (err) {
                console.error("Fetch error:", err);
                alert(err.response?.data?.error || "Failed to load task");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [editId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!values.title.trim() || !values.description.trim()) {
            alert("Title and Description are required!");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.put(
                `http://localhost:1000/task/editTask/${values._id}`, 
                values, 
                { withCredentials: true }
            );
            if (res.status == 200) {
                alert(res.data.message || "Task Edited successfully!");
            } else {
                alert("Failed to add task");
            }
            
            // Clean up and close
            window.sessionStorage.removeItem("editTaskId");
            setIsEditTaskVisible(false);
            setEditId(null);
            
            // Consider using state update instead of reload
            window.location.reload();
            
        } catch (err) {
            console.error("Update error:", err);
            alert(err.response?.data?.error || "Failed to update task");
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async(e,id)=>{
        e.preventDefault();
        if (!id) return;
        try{
            setLoading(true);
            const res = await axios.delete(
                `http://localhost:1000/task/deleteTask/${id}`, 
                { withCredentials: true }
            );
            if (res.status == 200) {
                alert(res.data.message || "Task Deleted successfully!");
            } else {
                alert("Failed to add task");
            }

            window.sessionStorage.removeItem("editTaskId");
            setIsEditTaskVisible(false);
            setEditId(null);

            window.location.reload();
        }catch(err){
            console.error("Update error:", err);
            alert(err.response?.data?.error || "Failed to Delete task");
        }finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white rounded px-4 sm:px-6 py-4 sm:py-6 w-full sm:w-[70%] md:w-[50%] lg:w-[40%] mx-auto">
            <h1 className="text-center font-semibold text-xl sm:text-2xl lg:text-3xl">
                {loading ? "Loading..." : "Edit Task"}
            </h1>
            <hr className="mb-4 mt-2" />
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
                <input
                    type="text"
                    className="border px-3 py-2 rounded border-zinc-300 outline-none w-full"
                    placeholder="Title"
                    name="title"
                    value={values.title}
                    onChange={change}
                    disabled={loading}
                    required
                />

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full">
                        <h3 className="mb-2 text-sm sm:text-base">Priority</h3>
                        <select
                            className="border px-3 py-2 rounded border-zinc-300 outline-none w-full"
                            name="priority"
                            value={values.priority}
                            onChange={change}
                            disabled={loading}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="w-full">
                        <h3 className="mb-2 text-sm sm:text-base">Status</h3>
                        <select
                            className="border px-3 py-2 rounded border-zinc-300 outline-none w-full"
                            name="status"
                            value={values.status}
                            onChange={change}
                            disabled={loading}
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
                    disabled={loading}
                    required
                    rows={4}
                />

                <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
                    <button
                        type="submit"
                        className="text-center w-full bg-blue-800 py-2 hover:bg-blue-600 transition-all duration-300 text-white rounded disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                        type="button"
                        className="text-center w-full bg-red-800 py-2 hover:bg-red-600 transition-all duration-300 text-white rounded disabled:opacity-50"
                        disabled={loading}
                        onClick={(e)=>deleteTask(e,values._id)}
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        className="text-center w-full bg-gray-800 py-2 hover:bg-gray-600 transition-all duration-300 text-white rounded disabled:opacity-50"
                        onClick={() => {
                            window.sessionStorage.removeItem("editTaskId");
                            setIsEditTaskVisible(false);
                            setEditId(null);
                        }}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

EditTask.propTypes = {
    setIsEditTaskVisible: PropTypes.func.isRequired,
    editId: PropTypes.string,
    setEditId: PropTypes.func.isRequired,
};

export default EditTask;