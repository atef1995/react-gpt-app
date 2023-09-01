import { useContext } from "react";
import AuthContext from "../authContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { isLoggedIn, logOut } = useContext(AuthContext);


  return (
    <nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 animate-gradient-x p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to='/' className="font-semibold text-xl tracking-tight">PDF To GPT</Link>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link to="/ask" className="inline-block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
            Q&A
          </Link>
          {isLoggedIn ? null : (
            <>
              <Link to="/register" className="inline-block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white hover:animate-pulse mr-4">Register</Link>
              <Link to="/login" className="animate-pulse inline-block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">Login</Link>
            </>
          )}
          {isLoggedIn && <Link to="/logout" className="inline-block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4" onClick={logOut}>Logout</Link>}
          {/* Add more links as needed */}
        </div>
      </div>
    </nav>
  );
}


export default Navbar;
