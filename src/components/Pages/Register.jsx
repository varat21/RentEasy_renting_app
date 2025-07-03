import { useNavigate } from "react-router-dom";
import { PasswordInput, TextInput, Button, Select } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import { useFormValidation } from "../hooks/formValidate";
import { toast } from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const { resolver } = useFormValidation();
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver,
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Form data submitted:", data); // Check if gender is present

    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("gender", data.gender);
      formData.append("name", data.name);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("userType", data.userType);
      formData.append("address", data.address);
      formData.append("image", data.image);

      const response = await axios.post(
        "http://localhost/rent-easy/auth/register.php",
        formData
      );
      // console.log("Response from registration:", response.data);

      if (response.data.success) {
        toast.success(
          "Registration successful! Please check your email to verify."
        );
        navigate("/login");
      } else {
        setError("root", {
          type: "manual",
          message: response.data.message,
        });
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("root", {
        type: "manual",
        message: "An error occurred. Please try again later.",
      });
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <div className="relative   flex justify-center items-center p-10 m-10 ">
      <div className=" z-10 flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-md p-10 gap-10 border-gray-200 shadow-md">
        {/* Video Section */}
        <div className="hidden lg:block lg:w-full">
          <video
            src="/images/lottee.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover rounded-xl filter  contrast-125 hue-rotate-180 "
          />
        </div>

        {/* Form Section */}
        <div className="lg:w-full flex flex-col justify-center lg:p-10 h-full">
          <h1 className="font-bold text-3xl text-gray-800 text-center lg:text-left">
            Sign Up
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
            {/* Full Name and Phone Number */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TextInput
                {...register("name")}
                label="Full Name"
                placeholder="Enter your full name"
                error={errors.name?.message}
              />
              <TextInput
                {...register("phoneNumber")}
                label="Phone Number"
                type="number"
                placeholder="Enter your phone number"
                error={errors.phoneNumber?.message}
              />
            </div>

            {/* User Type and Email */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Controller
                name="userType"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="User Type"
                    placeholder="Select user type"
                    data={["Landlord", "Tenant"]}
                    error={errors.userType?.message}
                  />
                )}
              />
              <TextInput
                {...register("email")}
                label="Email"
                placeholder="Enter your email"
                error={errors.email?.message}
              />
            </div>

            {/* Address and Gender */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Controller
                name="gender"
                control={control}
                rules={{ required: "Gender is required" }} // Validation rule
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Gender"
                    placeholder="Select gender"
                    data={["Male", "Female", "Others"]}
                    error={errors.gender?.message}
                  />
                )}
              />

              <TextInput
                {...register("address")}
                label="Address"
                placeholder="Enter your address"
                error={errors.address?.message}
              />
            </div>

            {/* Password and Confirm Password */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PasswordInput
                {...register("password")}
                label="Password"
                placeholder="Enter your password"
                error={errors.password?.message}
              />
              <PasswordInput
                {...register("confirmPassword")}
                label="Confirm Password"
                placeholder="Re-enter your password"
                error={errors.confirmPassword?.message}
              />
            </div>

            {/* Submit Button */}
            <Button
              fullWidth
              type="submit"
              mt="lg"
              disabled={isSubmitting}
              className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
            >
              {isSubmitting ? <FiLoader className="animate-spin" /> : "Sign Up"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Google Sign Up */}
          {/* <Button fullWidth variant="light" color="blue" mt="md">
            <FcGoogle className="mr-2" />
            Sign up with Google
          </Button> */}

          {/* Sign In Redirect */}
          <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
            <span>Already have an account?</span>
            <span
              className="font-semibold text-blue-500 hover:underline ml-2 cursor-pointer"
              onClick={handleSignIn}
            >
              Sign In
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
