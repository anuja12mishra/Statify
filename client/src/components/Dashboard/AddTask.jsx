import PropTypes from "prop-types";

function AddTask({setAddTaskDiv}) {
    return (
        <div className="bg-white rounded px-4 sm:px-6 py-4 sm:py-6 w-full sm:w-[70%] md:w-[50%] lg:w-[40%] mx-auto">
            <h1 className="text-center font-semibold text-xl sm:text-2xl lg:text-3xl">Add Task</h1>
            <hr className="mb-4 mt-2" />
            <form method="POST" action="" className="flex flex-col gap-4 md:gap-6">
                <input
                    type="text"
                    className="border px-3 py-2 rounded border-zinc-300 outline-none w-full"
                    placeholder="Title"
                    name="title"
                />

                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Priority Section */}
                    <div className="w-full">
                        <h3 className="mb-2 text-sm sm:text-base">Select Priority</h3>
                        <select
                            className="border px-3 py-2 rounded border-zinc-300 outline-none w-full"
                            name="priority"
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
                />

                <div 
                    className="flex items-center justify-between gap-4 flex-col sm:flex-row" 
                >
                    <buton className="text-center w-full bg-blue-800 py-2 hover:bg-blue-700 transition-all duration-300 text-white rounded">Add Task</buton>
                    <buton 
                        className="text-center w-full bg-red-800 py-2 hover:bg-red-700 transition-all duration-300 text-white rounded"
                        onClick={()=>{
                            setAddTaskDiv("hidden")
                        }}
                    >
                        Cancel
                    </buton>
                </div>
            </form>
        </div>
    );
}

AddTask.propTypes = {
  setAddTaskDiv: PropTypes.func.isRequired, 
};

export default AddTask;