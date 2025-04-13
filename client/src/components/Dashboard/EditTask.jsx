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
        <div className="bg-white rounded-lg shadow-lg px-4 sm:px-6 py-6 sm:py-8 w-full sm:w-[70%] md:w-[50%] lg:w-[40%] mx-auto border border-gray-200">
            <div className="flex items-center justify-center mb-6">
                <div className="bg-blue-100 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </div>
                <h1 className="text-center font-bold text-xl sm:text-2xl lg:text-3xl ml-3 text-gray-800">
                    {loading ? "Loading..." : "Edit Task"}
                </h1>
            </div>
            
            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-6">
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium text-gray-700">Title</label>
                        <input
                            id="title"
                            type="text"
                            className="border px-4 py-3 rounded-lg border-gray-300 outline-none w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="Enter task title"
                            name="title"
                            value={values.title}
                            onChange={change}
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label htmlFor="priority" className="text-sm font-medium text-gray-700">Priority</label>
                            <select
                                id="priority"
                                className="border px-4 py-3 rounded-lg border-gray-300 outline-none w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
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

                        <div className="space-y-2">
                            <label htmlFor="status" className="text-sm font-medium text-gray-700">Status</label>
                            <select
                                id="status"
                                className="border px-4 py-3 rounded-lg border-gray-300 outline-none w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
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

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter task description"
                            className="border px-4 py-3 rounded-lg border-gray-300 outline-none w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            value={values.description}
                            onChange={change}
                            disabled={loading}
                            required
                            rows={4}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                        <button
                            type="submit"
                            className="inline-flex justify-center items-center text-center w-full bg-gradient-to-r from-blue-600 to-blue-700 py-3 px-4 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-white rounded-lg shadow-md disabled:opacity-50 font-medium"
                            disabled={loading}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h1a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h1v5.586l-1.293-1.293z" />
                            </svg>
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center items-center text-center w-full bg-gradient-to-r from-red-600 to-red-700 py-3 px-4 hover:from-red-700 hover:to-red-800 transition-all duration-300 text-white rounded-lg shadow-md disabled:opacity-50 font-medium"
                            disabled={loading}
                            onClick={(e)=>deleteTask(e,values._id)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Delete
                        </button>
                        <button
                            type="button"
                            className="inline-flex justify-center items-center text-center w-full bg-gradient-to-r from-gray-600 to-gray-700 py-3 px-4 hover:from-gray-700 hover:to-gray-800 transition-all duration-300 text-white rounded-lg shadow-md disabled:opacity-50 font-medium"
                            onClick={() => {
                                window.sessionStorage.removeItem("editTaskId");
                                setIsEditTaskVisible(false);
                                setEditId(null);
                            }}
                            disabled={loading}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

EditTask.propTypes = {
    setIsEditTaskVisible: PropTypes.func.isRequired,
    editId: PropTypes.string,
    setEditId: PropTypes.func.isRequired,
};

export default EditTask;