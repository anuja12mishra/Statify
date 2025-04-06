import PropTypes from 'prop-types';

const SetTitle = ({title}) => {
  return (
    <div className="border-b pb-2"> 
      <h1 className="font-semibold text-zinc-800 text-center">
        {title}
      </h1>
    </div>
  )
}

SetTitle.propTypes = {
  title: PropTypes.string.isRequired, // Ensures title is a required string
};


export default SetTitle;