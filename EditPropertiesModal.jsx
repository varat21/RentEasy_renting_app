
import React, { useState, useEffect } from "react";
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Group,
  Title,
  Text,
  Loader,
  Select,
  NumberInput,
  FileInput,
  Image,
  ActionIcon,
  Tooltip
} from "@mantine/core";
import axios from "axios";
import { toast } from "react-hot-toast";
import { IconX } from "@tabler/icons-react";

const EditPropertiesModal = ({
  opened,
  onClose,
  property,
  propertyId,
  userId,
  onPropertyUpdated,
  image
}) => {
  const cities = [
    "Kathmandu",
    "Pokhara",
    "Lalitpur",
    "Bhaktapur",
    "Biratnagar",
    "Birgunj",
    "Butwal",
    "Dharan",
    "Nepalgunj",
    "Janakpur",
    "Hetauda",
    "Dhangadhi",
    "Itahari",
    "Ghorahi",
    "Tulsipur",
    "Bharatpur",
    "Siddharthanagar",
    "Gorkha",
    "Bhadrapur",
    "Lahan",
    "Birtamod",
    "Rajbiraj",
    "Kalaiya",
    "Tansen",
    "Inaruwa",
    "Dhankuta",
    "Ilam",
    "Banepa",
    "Malangwa",
    "Baglung"
  ];

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    country: "",
    dimension: "",
    road_type: "",
    property_face: "",
    municipality: "",
    ward_no: "",
    province: "",
    type: "",
    latitude: "",
    longitude: "",
    bedrooms: 0,
    bathrooms: 0
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Update form data when `property` changes
  useEffect(() => {
    if (property) {
      setFormValues({
        title: property.title || "",
        description: property.description || "",
        price: property.price || "",
        city: property.city || "",
        country: property.country || "",
        dimension: property.dimension || "",
        road_type: property.road_type || "",
        property_face: property.property_face || "",
        municipality: property.municipality || "",
        ward_no: property.ward_no || "",
        province: property.province || "",
        type: property.type || "",
        latitude: property.latitude || "",
        longitude: property.longitude || "",
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0
      });
      
      // Initialize with existing images
      if (image) {
        setPreviewImages([image]);
      }
      setErrorMessage("");
    }
  }, [property, image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (files) => {
    const validFiles = files.filter((file) => {
      if (file.size > 2000000) {
        toast.error("File size should be less than 2MB");
        return false;
      }
      return true;
    });
    
    setSelectedImages(validFiles);
    
    // Create preview URLs for the new images
    const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
  
    if (!propertyId) {
      toast.error("Property ID is missing");
      setErrorMessage("Property ID is missing");
      return;
    }
  
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
  
    try {
      const formData = new FormData();
      
      // Append all form values
      for (const [key, value] of Object.entries(formValues)) {
        formData.append(key, value);
      }
      
      formData.append('propertyId', propertyId);
      formData.append('id', userId);
      
      // Append images
      selectedImages.forEach((image) => {
        formData.append('images[]', image); // Note the [] for array
      });
  
      const response = await axios.post(
        "http://localhost/rent-easy/public/editPropertiesFromProfile.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      toast.success("Property updated successfully!");
      if (onPropertyUpdated) onPropertyUpdated();
      window.location.reload()
      onClose();
  
    } catch (error) {
      console.error("Error:", error);
      const message = error.response?.data?.message || 
                     "Failed to update property. Please try again.";
      toast.error(message);
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} centered size="lg" padding="xl" className="mt-7">
      <form onSubmit={handleSubmit}>
        <Title order={3} className="mb-6 text-center">
          Edit Property Details
        </Title>

        {errorMessage && (
          <Text color="red" size="sm" className="mb-4">
            Error: {errorMessage}
          </Text>
        )}

        <div className="mb-4">
          <label className="font-semibold text-gray-700 block mb-2">
            Property Pictures
          </label>
          
          <FileInput
            multiple
            label="Add more images"
            accept="image/*"
            onChange={handleImageChange}
            placeholder="Select new images"
            className="w-full mb-4"
          />
          
          {/* Image previews */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {previewImages.map((img, index) => (
              <div key={index} className="relative">
                <Image
                  src={img}
                  alt={`Property ${index}`}
                  height={120}
                  radius="sm"
                />
                <ActionIcon
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 hover:bg-red-600"
                  size="sm"
                >
                  <IconX size={14} color="white" />
                </ActionIcon>
              </div>
            ))}
          </div>
        </div>

        <Group grow className="mb-4">
          <TextInput
            label="Title"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Price"
            name="price"
            value={formValues.price}
            onChange={handleChange}
            required
          />
        </Group>

        <Textarea
          label="Description"
          name="description"
          value={formValues.description}
          onChange={handleChange}
          required
          className="mb-4"
          minRows={3}
        />

        <Group grow className="mb-4">
          <NumberInput
            label="Bedrooms"
            name="bedrooms"
            value={formValues.bedrooms}
            onChange={(value) => handleNumberChange("bedrooms", value)}
            min={0}
          />
          <NumberInput
            label="Bathrooms"
            name="bathrooms"
            value={formValues.bathrooms}
            onChange={(value) => handleNumberChange("bathrooms", value)}
            min={0}
          />
        </Group>

        <Group grow className="mb-4">
          <Select
            label="City"
            placeholder="Select city"
            data={cities.map(city => ({ value: city, label: city }))}
            value={formValues.city}
            onChange={(value) => setFormValues(prev => ({ ...prev, city: value }))}
            required
            searchable
          />
          <TextInput
            label="Country"
            name="country"
            value={formValues.country}
            onChange={handleChange}
            required
          />
        </Group>

        <Group grow className="mb-4">
          <TextInput
            label="Dimension (sqft)"
            name="dimension"
            value={formValues.dimension}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Road Type"
            name="road_type"
            value={formValues.road_type}
            onChange={handleChange}
            required
          />
        </Group>

        <Group grow className="mb-4">
          <TextInput
            label="Property Face"
            name="property_face"
            value={formValues.property_face}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Municipality"
            name="municipality"
            value={formValues.municipality}
            onChange={handleChange}
            required
          />
        </Group>

        <Group grow className="mb-4">
          <TextInput
            label="Ward No"
            name="ward_no"
            value={formValues.ward_no}
            onChange={handleChange}
            required
          />
          <TextInput
            label="Province"
            name="province"
            value={formValues.province}
            onChange={handleChange}
            required
          />
        </Group>

        <Group grow className="mb-4">
          <Select
            label="Type"
            placeholder="Select property type"
            data={["House", "Room", "ShopHouse", "Apartment"]}
            value={formValues.type}
            onChange={(value) => setFormValues(prev => ({ ...prev, type: value }))}
            required
          />
          <TextInput
            label="Latitude"
            name="latitude"
            value={formValues.latitude}
            onChange={handleChange}
            required
            disabled
          />
          <TextInput
            label="Longitude"
            name="longitude"
            value={formValues.longitude}
            onChange={handleChange}
            required
            disabled
          />
        </Group>

        <div className="sticky bottom-0 right-0 w-full flex justify-end p-4 z-50">
  <Button
    type="submit"
    size="md"
    fullWidth

    className="bg-teal-500 hover:bg-teal-600"
    disabled={isSubmitting}
    loading={isSubmitting}
  >
    Submit
  </Button>
</div>
      </form>
    </Modal>
  );
};

export default EditPropertiesModal;