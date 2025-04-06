import PropTypes from 'prop-types';

const TaskCard = ({ data }) => {
  
  const showEditTask = (e,id)=>{
    e.preventDefault();
    if (!id) {
      console.error("No task ID provided");
      return;
    }
    window.sessionStorage.setItem("editTaskId",id);
    window.location.reload();
  }
  
  return (
    <button 
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 w-full p-4 text-left"
      onClick={(e)=>showEditTask(e,data._id)}
    >
      {/* Header with Task Name and Priority */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-lg font-semibold text-gray-800 truncate">
          {data.title || "Task Name"} {/* Dynamic task title */}
        </h1>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            data.priority === "high"
              ? "text-red-500 bg-red-100"
              : data.priority === "medium"
              ? "text-yellow-500 bg-yellow-100"
              : "text-green-500 bg-green-100"
          }`}
        >
          {data.priority || "Priority"} {/* Dynamic priority with styling */}
        </span>
      </div>

      {/* Divider */}
      <hr className="mb-2" />

      {/* Description */}
      <p className="text-sm text-gray-600">
        {data.description || "No description available"} {/* Dynamic description */}
      </p>
    </button>
  );
};


const isValidObjectId = (props, propName, componentName) => {
  const value = props[propName];
  const objectIdRegex = /^[a-f\d]{24}$/i; // Regex for a valid ObjectId
  if (!objectIdRegex.test(value)) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Expected a valid MongoDB ObjectId.`
    );
  }
};

TaskCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    _id: isValidObjectId.isRequired,
    description: PropTypes.string.isRequired,
    priority: PropTypes.oneOf(["low", "medium", "high"]).isRequired,
  }).isRequired,
};

export default TaskCard;