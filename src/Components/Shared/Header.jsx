import { NavLink } from "react-router-dom";
import Notification from "../Icons/Notification";


const Header = ({ auth }) => {
  function generateRandomNumber() {
    return Math.floor(Math.random() * 20) + 1;
  }

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">

      <div className="flex justify-between items-center w-full px-4 mx-auto py-3 bg-white">

        {/* Logo */}
        <div className="flex items-center">
          <NavLink className="font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#FB923C] py-2" to="/">
            Logu
          </NavLink>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Profile/Authentication */}
          {auth ? (
            <NavLink to='/profile' className="font-semibold text-sm lg:text-md hover:text-blue-600 transition duration-300">
              My Account
            </NavLink>
          ) : (
            <NavLink to={`/`} className="font-semibold text-sm lg:text-md hover:text-blue-600 transition duration-300">
              LOGIN
            </NavLink>
          )}

          {/* Notification Icon */}
          <NavLink to='/notification' className="relative hover:bg-gray-200 p-2 rounded-full transition duration-300">
            <Notification />
            <h1 className="text-red-600 absolute top-0 right-[2px] font-semibold text-sm">{generateRandomNumber()}</h1>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
