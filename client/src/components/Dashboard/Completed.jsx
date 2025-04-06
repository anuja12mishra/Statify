import PropTypes from 'prop-types';
import TaskCard from "./TaskCard";

const Completed = ({task}) => {
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
Completed.propTypes = {
  task: PropTypes.array.isRequired,
};

export default Completed