import React from "react";
import { BiLogoWhatsappSquare } from "react-icons/bi";

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-5 left-5 z-50">
      <a
        href="https://wa.me/9847502403?text=Hello! How can I assist you?"
        target="_blank"
        // rel="noopener noreferrer"
        // aria-label="Chat on WhatsApp"
        className="text-green-500 hover:text-green-600 transition duration-300 ease-in-out"
      >
        <BiLogoWhatsappSquare className="text-[60px] drop-shadow-lg hover:scale-110 transition-transform duration-300 " />
      </a>
    </div>
  );
};

export default WhatsAppButton;
