import React from "react";
import { PasswordInput, TextInput, Button } from "@mantine/core";
import { FcGoogle } from "react-icons/fc";
import { useLoginValidation } from "../hooks/formValidate";
import { useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import ForgetPasswordModal from "./ForgetPassword/ForgetPasswordModal";
import GoogleLoginButton from "./GoogleLoginButton";

const Login = () => {
  const { resolver } = useLoginValidation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver });
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const handleSignUp = () => {
    navigate("/register");
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await axios.post(
        "http://localhost/rent-easy/auth/login.php",
        formData
      );

      if (response.data.success) {
        // Check if user status is 'block'
        if (response.data.status === "block") {
          toast.error("Your account has been blocked!");
          return; // Prevent further execution
        }

        localStorage.setItem("token", response.data.token);
        toast.success("Login successful");

        const userType = response.data.userType;
        if (userType === "tenant") {
          navigate("/");
        } else if (userType === "landlord") {
          navigate("/");
        } else if (userType === "admin") {
          navigate("/navbar/dashboard");
        }
        window.location.reload();
      } else {
        setError("root", {
          type: "manual",
          message: response.data.message,
        });
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setError("root", {
        type: "manual",
        message: "An error occurred. Please try again later.",
      });
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center p-10 m-10">
      <div className="absolute z-10 flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-md p-10 gap-8 border-gray-200 shadow-md">
        {/* Video Section */}
        <div className="w-full h-full bg-white p-2 rounded-xl">
          <video
            src="/images/lottee.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover rounded-xl filter contrast-125 hue-rotate-180"
          />
        </div>

        {/* Form Section */}
        <div className="lg:w-1/2 w-full flex flex-col justify-center p-8 lg:p-12 rounded-lg space-y-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h1 className="font-bold text-3xl text-gray-800 text-center lg:text-left">
              Sign In
            </h1>

            <TextInput
              {...register("email")}
              label="Email"
              placeholder="Enter your email"
              error={errors.email?.message}
              withAsterisk
            />
            <PasswordInput
              {...register("password")}
              label="Password"
              placeholder="Enter your password"
              error={errors.password?.message}
              withAsterisk
            />
            <Button fullWidth type="submit" mt="lg">
              {isSubmitting ? <FiLoader className="animate-spin" /> : "Sign In"}
            </Button>

            <div className="text-sm font-semibold text-blue-500 hover:text-blue-700 flex justify-center items-center">
              <button type="button" onClick={open}>
                Forgot Password?
              </button>
            </div>

            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="px-4 text-gray-600">or</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
            <div className="flex justify-center items-center">
              <GoogleLoginButton />
            </div>
            <div className="text-center mt-6 text-sm text-gray-600">
              Don't have an account?{" "}
              <span
                className="font-semibold text-blue-500 hover:text-blue-700 cursor-pointer"
                onClick={handleSignUp}
              >
                Sign Up
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Forget Password Modal */}
      <ForgetPasswordModal opened={opened} onClose={close} />
    </div>
  );
};

export default Login;
