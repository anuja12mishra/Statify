import PropTypes from 'prop-types';

const SetTitle = ({title}) => {
  return (
    <div className="border-b border-gray-100 pb-3"> 
      <h1 className="font-semibold text-gray-800 text-center text-lg">
        {title}
      </h1>
    </div>
  )
}

SetTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SetTitle;