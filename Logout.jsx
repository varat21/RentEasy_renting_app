


import React from "react";
import { useNavigate } from "react-router-dom";

import useBookingStore from "../stores/useBookingStore";
import useAuthStore from "../stores/useBookingStore";



const Logout = () => {
  const { clearBookedProperty } = useBookingStore();
  const { logout } = useAuthStore(); // Assuming you have an authentication store
  const navigate = useNavigate();

  const onClick = () => {
    localStorage.removeItem("token"); // Remove authentication token
    clearBookedProperty(); // Clear bookings on logout
    logout(); // Call logout function from auth store if needed

    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <p onClick={onClick} className="cursor-pointer text-red-500 hover:underline">
        Logout
      </p>
    </div>
  );
};

export default Logout;

