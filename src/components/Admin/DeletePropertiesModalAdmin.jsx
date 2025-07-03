import React from 'react';
import { Modal, Button, Group, Text } from '@mantine/core';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const DeletePropertiesModal = ({ opened, onClose, propertyId }) => {
    const handleDelete = async () => {
        try {
          if (!propertyId) {
            toast.error("No property selected for deletion");
            return;
          }
      
          const token = localStorage.getItem("token");
          if (!token) {
            toast.error("You must be logged in to delete properties");
            return;
          }
      
          // Corrected DELETE request format (propertyId in params)
          const response = await axios.delete(
            `http://localhost/rent-easy/public/deletePropertyByAdmain.php?propertyId=${propertyId}`, 
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
            }
          );
      
          if (response.data.success) {
            toast.success("Property deleted successfully");
            onClose(); 
            // window.location.reload();
          } else {
            toast.error(response.data.message || "Failed to delete property");
          }
        } catch (error) {
          console.error("Delete error:", error);
          // toast.error(error.response?.data?.message || "An error occurred");
          toast.error( "Property is Booked by a Tenant, Cannot be Deleted");

        }
      };
      

  return (
    <Modal opened={opened} onClose={onClose} title="Delete Property" centered>
      <Text size="md" mb="lg">
        Are you sure you want to delete this property? This action cannot be undone.
      </Text>
      <Group position="right" mt="xl">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button color="red" onClick={handleDelete}>Delete Property</Button>
      </Group>
    </Modal>
  );
};

export default DeletePropertiesModal;