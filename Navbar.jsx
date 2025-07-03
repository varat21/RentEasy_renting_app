import React from "react";
import {
  IoLogOutOutline,
  IoHomeOutline,
  IoPeopleOutline,
  IoBusinessOutline,
  IoSearch,
} from "react-icons/io5";
import { NavLink, Outlet, useNavigate } from "react-router-dom"; // Changed from Link to NavLink
import { toast } from "react-hot-toast";
import { FaRegMessage } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { FaMoneyBills } from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";

const Navbar = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <div className="flex h-auto bg-gray-100 font-sans font-semibold">
      {/* Sidebar Navigation */}
      <aside className="fixed top-0 left-0 w-60 h-full bg-white shadow-lg p-5 flex flex-col">
        {/* Logo Section */}
        <NavLink
          to="/navbar/dashboard"
          className="flex items-center gap-2 mb-6"
        >
          <img src="/images/logo.png" alt="RentEasy Logo" className="h-10" />
          <span className="text-xl font-bold text-gray-700">RentEasy</span>
        </NavLink>

        {/* Navigation Links */}
        <nav className="space-y-4 flex-1">
          <NavItem
            to="/navbar/dashboard"
            icon={<IoHomeOutline />}
            label="Dashboard"
          />
          <NavItem
            to="/navbar/users"
            icon={<IoPeopleOutline />}
            label="Users"
          />
          <NavItem
            to="/navbar/addedProperties"
            icon={<IoBusinessOutline />}
            label="Properties"
          />
          <NavItem
            to="/navbar/paymentInformation"
            icon={<FaMoneyBills />}
            label="Payment"
          />
          <NavItem
            to="/navbar/bookingInformation"
            icon={<TbBrandBooking />}
            label="Booking"
          />

          <NavItem
            to="/navbar/message"
            icon={<FaRegMessage />}
            label="Feedback"
          />
          <NavItem
            to="/navbar/propertyDocument"
            icon={<IoDocumentText />}
            label="Property Document"
          />
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 w-full text-left text-red-600 rounded-lg hover:bg-gray-200"
        >
          <IoLogOutOutline className="text-xl" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-60 p-6">
        {/* Top Bar with Search Input */}
        <div className="sticky top-0 z-10 bg-white shadow-md p-3 rounded-lg mb-4">
          {/* <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
          </div> */}

           <header className=" text-black p-3 flex justify-between items-center">
        <h2 className="text-lg font-semibold"></h2>
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-label="Online status" />
      </header>
        </div>

        {/* Page Content */}
        <div className="bg-white border-2 border-gray-300 p-6 rounded-lg h-auto">
          <Outlet/>
        </div>
      </main>
    </div>
  );
};

// Updated NavItem component using NavLink
const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 p-3 rounded-lg text-gray-700 hover:bg-gray-200 ${
        isActive ? "bg-blue-100 text-blue-600" : ""
      }`
    }
  >
    <span className="text-xl">{icon}</span>
    <span>{label}</span>
  </NavLink>
);

export default Navbar;
