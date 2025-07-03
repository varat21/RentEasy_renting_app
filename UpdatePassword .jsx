import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { PasswordInput, Button } from "@mantine/core";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const UpdatePassword = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const email = queryParams.get("email");
  const resettoken = queryParams.get("resettoken");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("email", email || "");
    formData.append("newPassword", data.password);
    formData.append("resettoken", resettoken || "");

    try {
      const response = await axios.post(
        "http://localhost/rent-easy/auth/ForgetPassword/ResetPassword.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PasswordInput
            label="New Password"
            {...register("password")}
            error={errors.password?.message}
            required
          />
          <PasswordInput
            label="Confirm Password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            required
            mt="md"
          />
          <Button fullWidth type="submit" mt="lg" disabled={isSubmitting}>
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;