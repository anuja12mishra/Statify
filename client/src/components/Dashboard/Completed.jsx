import PropTypes from 'prop-types';
import TaskCard from "./TaskCard";

const Completed = ({ task }) => {
  const priorityOrder = {
    high: 1,
    medium: 2,
    low: 3,
  };

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

Completed.propTypes = {
  task: PropTypes.array.isRequired,
};

export default Completed;
