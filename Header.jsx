import { useState, useRef, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import { Avatar, Drawer, Button, Divider } from "@mantine/core";
import { FcAbout } from "react-icons/fc";
import { TbLetterMSmall } from "react-icons/tb";
import { CiLogin, CiHome } from "react-icons/ci";
import { FiAlignJustify } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { FaQq, FaRegUser } from "react-icons/fa";
import { MdContactPhone, MdOutlinePolicy } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../hooks/AuthContext";
import { AiFillPropertySafety } from "react-icons/ai";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const profileRef = useRef(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout(); // Use AuthContext logout to clear token and user state
    setProfileOpen(false);
    closeDrawer();
    navigate("/login"); 
    toast.success("Logged out successfully");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-[999] px-6 py-3 w-full">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex flex-wrap items-center">
          <img src="/images/logo.png" alt="RentEasy" className="h-10" />
          <span className="text-xl font-bold ml-2 text-blue-600">RentEasy</span>
        </Link>

        {/* Navigation & Profile */}
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex space-x-6 text-gray-700 font-semibold">
            <Link
              to="/"
              className={`transition-colors duration-200 ${
                location.pathname === "/"
                  ? "text-blue-600 font-bold"
                  : "hover:text-blue-500"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`transition-colors duration-200 ${
                location.pathname === "/about"
                  ? "text-blue-600 font-bold"
                  : "hover:text-blue-500"
              }`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`transition-colors duration-200 ${
                location.pathname === "/contact"
                  ? "text-blue-600 font-bold"
                  : "hover:text-blue-500"
              }`}
            >
              Contact Us
            </Link>
            <Link
              to="/faq"
              className={`transition-colors duration-200 ${
                location.pathname === "/faq"
                  ? "text-blue-600 font-bold"
                  : "hover:text-blue-500"
              }`}
            >
              FAQs
            </Link>
            <Link
              to="/terms"
              className={`transition-colors duration-200 ${
                location.pathname === "/terms"
                  ? "text-blue-600 font-bold"
                  : "hover:text-blue-500"
              }`}
            >
              Terms & Conditions
            </Link>
          </nav>

          {/* Profile Icon - Desktop */}
          <div className="hidden md:block relative" ref={profileRef}>
            <div
              className="flex items-center cursor-pointer p-2"
              onClick={() => setProfileOpen((prev) => !prev)}
            >
              <Avatar
                src={user?.picture || null}
                alt="Profile"
                className="flex items-center bg-blue-300 cursor-pointer p-2 font-light shadow-lg"
              >
                {user?.username?.charAt(0) || "U"}
              </Avatar>
            </div>

            {/* Profile Dropdown - Desktop */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-48 rounded-md shadow-lg bg-white border">
                {user ? (
                  <div className="text-center text-sm font-semibold py-2">
                    Welcome, {user.username}
                  </div>
                ) : null}
                <Divider />
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-200 cursor-pointer rounded-md"
                      onClick={() => setProfileOpen(false)}
                    >
                      <FaRegUser className="h-5 w-5 mr-2" />
                      Profile
                    </Link>
                    <Link
                      to="/addProperties"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-200 cursor-pointer rounded-md"
                      onClick={closeDrawer}
                    >
                      <button className="w-full text-left  py-2 hover:bg-gray-100 flex items-center">
                        <AiFillPropertySafety className="h-5 w-5 mr-2" />
                        Add Properties
                      </button>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                    >
                      <IoLogOutOutline className="mr-2" /> Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition duration-200 cursor-pointer rounded-md"
                    onClick={() => setProfileOpen(false)}
                  >
                    <CiLogin className="h-5 w-5 mr-2" />
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 bg-gray-200 rounded-full"
            onClick={toggleDrawer}
          >
            <FiAlignJustify className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="50%"
        title={<span className="font-bold text-lg">RentEasy</span>}
      >
        <div className="flex flex-col space-y-4">
          <Link
            to="/"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
            onClick={closeDrawer}
          >
            <CiHome className="h-5 w-5 mr-2" />
            Home
          </Link>
          <Link
            to="/about"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
            onClick={closeDrawer}
          >
            <FcAbout className="h-5 w-5 mr-2" />
            About
          </Link>

          <Link
            to="/contact"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
            onClick={closeDrawer}
          >
            <MdContactPhone className="h-5 w-5 mr-2" /> Contact
          </Link>
          <Link
            to="/faq"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
            onClick={closeDrawer}
          >
            <FaQq className="h-5 w-5 mr-2" /> FAQs
          </Link>
          <Link
            to="/terms"
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
            onClick={closeDrawer}
          >
            <TbLetterMSmall className="h-5 w-5 mr-2" /> Terms & Conditions
          </Link>

          {user && user.userType !== "google" && (
            <Link to="/addProperties" onClick={closeDrawer}>
              <Button className="w-full flex items-center justify-start px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer">
                Add Properties
              </Button>
            </Link>
          )}

          <Divider my="sm" />

          {/* Mobile Drawer - Profile/Logout/Login */}
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                onClick={closeDrawer}
              >
                <FaRegUser className="h-5 w-5 mr-2" />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer text-left"
              >
                <IoLogOutOutline className="h-5 w-5 mr-2" />
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 transition cursor-pointer"
              onClick={closeDrawer}
            >
              <CiLogin className="h-5 w-5 mr-2" />
              Login
            </Link>
          )}
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
