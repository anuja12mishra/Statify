import PropTypes from 'prop-types';

const TaskCard = ({ data }) => {
  
  const showEditTask = (e, id) => {
    e.preventDefault();
    if (!id) {
      console.error("No task ID provided");
      return;
    }
    console.log(id);
    window.sessionStorage.setItem("editTaskId", id);
    window.location.reload();
  }
  
  // Priority badge colors
  const priorityStyles = {
    high: "text-red-700 bg-red-50 border border-red-200",
    medium: "text-amber-700 bg-amber-50 border border-amber-200",
    low: "text-green-700 bg-green-50 border border-green-200"
  };
  
  return (
    <button 
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 w-full p-5 text-left mb-3 border border-gray-100 group"
      onClick={(e) => showEditTask(e, data._id)}
    >
      {/* Header with Task Name and Priority */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-lg font-medium text-gray-800 truncate group-hover:text-blue-600 transition-colors">
          {data.title || "Task Name"}
        </h1>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            priorityStyles[data.priority] || priorityStyles.low
          }`}
        >
          {data.priority || "Priority"}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gray-100 mb-3"></div>

      {/* Description */}
      <p className="text-sm text-gray-600 line-clamp-3">
        {data.description || "No description available"}
      </p>
      
      {/* Visual indicator for interactivity */}
      <div className="mt-3 flex justify-end">
        <span className="text-xs text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
          Click to edit
        </span>
      </div>
    </button>
  );
};

const isValidObjectId = (props, propName, componentName) => {
  const value = props[propName];
  const objectIdRegex = /^[a-f\d]{24}$/i;
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