import React, { useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  Notification,
  Loader,
  PasswordInput,
} from "@mantine/core";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
  const ForgetPasswordModal = ({ opened, onClose }) => {
  const [email, setEmail] = useState(""); 
  const [newPassword, setNewPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 

  const [otpModalOpen, setOtpModalOpen] = useState(false); 
  const [resetModalOpen, setResetModalOpen] = useState(false); 

  const navigate = useNavigate();

  // Handle email submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData();
    formData.append("email", email);
  
    try {
      const response = await axios.post(
        "http://localhost/rent-easy/auth/ForgetPassword/forgetPassword.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",  // This ensures the form data is sent correctly
          },
        }
      );
  
      if (response.data.success) {
        setMessage("Check your email and click the link!");
        setMessageType("success");
        toast.success("Check your email and click the link!!");
        onClose(); // Close the email modal
      } else {
        setMessage(response.data.message);
        setMessageType("error");
        toast.error(response.data.message);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      setMessageType("error");
      toast.error("An error occurred. Please try again later.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {/* Email Input Modal */}
      <Modal opened={opened} onClose={onClose} title="Forgot Password" centered>
        <form onSubmit={handleEmailSubmit}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            withAsterisk
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button fullWidth type="submit" mt="lg" disabled={loading}>
            {loading ? <Loader size="xs" /> : "Send"}
          </Button>
          {message && (
            <Notification
              color={messageType === "success" ? "green" : "red"}
              mt="md"
              withCloseButton
            >
              {message}
            </Notification>
          )}
        </form>
      </Modal>
    </>
  );
};

export default ForgetPasswordModal;
