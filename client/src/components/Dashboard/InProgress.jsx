import PropTypes from 'prop-types';
import TaskCard from "./TaskCard";

const InProgress = ({ task }) => {
  // Priority order
  const priorityOrder = {
    high: 1,
    medium: 2,
    low: 3,
  };

  // Sort tasks by priority
  const sortedTasks = [...task].sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="flex flex-col gap-2">
      {
        sortedTasks.map((element, index) => (
          <TaskCard key={index} data={element} />
        ))
      }
    </div>
  );
};

InProgress.propTypes = {
  task: PropTypes.array.isRequired,
};

export default InProgress;
