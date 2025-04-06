import PropTypes from 'prop-types';
import TaskCard from "./TaskCard";

const InProgress = ({task}) => {
  return (
    <div className="flex flex-col gap-2">
          {
            task &&
            task.map((element, index) => ( 
              <TaskCard key={index} data={element} /> 
            ))
          }
        </div>
  )
}
InProgress.propTypes = {
  task: PropTypes.array.isRequired,
};

export default InProgress