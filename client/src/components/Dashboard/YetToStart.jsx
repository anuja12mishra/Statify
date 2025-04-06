import TaskCard from "./TaskCard";
import PropTypes from 'prop-types';

const YetToStart = ({ task }) => {
  return (
    <div className="flex flex-col gap-2">
      {
        task &&
        task.map((element, index) => ( 
          <TaskCard key={index} data={element} /> 
        ))
      }
    </div>
  );
};

YetToStart.propTypes = {
  task: PropTypes.array.isRequired,
};


export default YetToStart;