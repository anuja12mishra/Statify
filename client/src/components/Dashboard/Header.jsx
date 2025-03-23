import { IoLogOutOutline } from "react-icons/io5";
import PropTypes from "prop-types";

const Header=({setAddTaskDiv})=> {

  const logout=()=>{
    try{

    }catch(err){
      
    }
  }

  return (
    <div className="flex px-12 py-4 items-center justify-between border-b">
        <div>
          <h1 className="text-2xl text-blue-800 font-semibold">Statify</h1>
        </div>
        <div className="flex gap-8">
          <button 
            className="hover:text-blue-800 transition-all duration-300"
            onClick={()=>{
              setAddTaskDiv("block")
            }}
          >
            Add Task
          </button>
          <button 
            className="hover:text-red-600 transition-all duration-300"
            onClick={logout}
          >
            <IoLogOutOutline size={24} />
          </button>
        </div>
    </div>
  )
}

Header.propTypes = {
  setAddTaskDiv: PropTypes.func.isRequired, 
};

export default Header