import React, { useEffect, useState } from "react";
import { Modal, Button, TextInput, Loader, Group, Avatar } from "@mantine/core";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { CiUser } from "react-icons/ci";

// Zod validation schema
const validationSchema = z.object({
  name: z.string().nonempty("Name is required"),
  address: z.string().nonempty("Address is required"),
  phoneNumber: z
    .string()
    .min(10, "Phone Number is required")
    .max(15, "Phone Number is too long"),
});

const ProfileEditModal = ({
  opened,
  close,
  id,
  name,
  address,
  phoneNumber,
  password,
  gender,
  defaultValues,
  email,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  const [formValues, setFormValues] = useState({
    name: name,
    address: address,
    phoneNumber: phoneNumber,
    password: password,
    gender: gender,
    id: id,
    email: email,
    profileImage: null,
  });

  useEffect(() => {
    if (defaultValues) {
      setFormValues({
        name: defaultValues.name || "",
        address: defaultValues.address || "",
        phoneNumber: defaultValues.phoneNumber || "",
        password: defaultValues.password || "",
        id: defaultValues.id || "",
        email: defaultValues.email || "",
        profileImage: defaultValues.profileImage || null,
      });
    }
  }, [defaultValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  };
  const onSubmit = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("name", formValues.name);
    formData.append("address", formValues.address);
    formData.append("phoneNumber", formValues.phoneNumber);
    formData.append("email", formValues.email);

    if (formValues.profileImage) {
      formData.append("profileImage", formValues.profileImage);
    }

    try {
      const response = await axios.post(
        "http://localhost/rent-easy/public/updateProfile.php",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      if (response.data.success) {
        toast.success("Profile updated successfully");
        close();
        window.location.reload();
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <Modal opened={opened} onClose={close} title="Edit Profile" centered>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
          {formValues.profileImage ? (
            <Avatar
              src={formValues.profileImage}
              size={120}
              radius="xl"
              className="border-4 border-gray-100 shadow-sm"
            />
          ) : (
            <Avatar
              src={`https://ui-avatars.com/api/?name=${formValues.name}&background=random&size=120`}
              size={120}
              radius="xl"
              className="border-4 border-gray-100 shadow-sm"
            />
          )}
        </div>
        {/* <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" /> */}

        <TextInput
          label="Name"
          placeholder="Enter your name"
          {...register("name")}
          className="mb-4"
          error={errors.name?.message}
          value={formValues.name}
          name="name"
          onChange={handleInputChange}
        />
        <TextInput
          label="Address"
          placeholder="Enter your address"
          {...register("address")}
          className="mb-4"
          error={errors.address?.message}
          value={formValues.address}
          name="address"
          onChange={handleInputChange}
        />
        <TextInput
          label="Phone"
          placeholder="Enter your phone number"
          {...register("phoneNumber")}
          className="mb-4"
          error={errors.phoneNumber?.message}
          value={formValues.phoneNumber}
          name="phoneNumber"
          onChange={handleInputChange}
          type="number"
        />

        <div className="flex justify-end space-x-4 mt-4">
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader size="xs" /> : "Save Changes"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProfileEditModal;
