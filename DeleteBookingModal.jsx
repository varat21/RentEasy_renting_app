import React from 'react';
import { Modal, Button, Group, Text } from '@mantine/core';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const DeleteBookingModal = ({ opened, onClose, bookingId, onDeleteSuccess }) => {
    const handleDelete = async () => {
        try {

            // Check if bookingId is provided
            if (!bookingId) {
                toast.error("No booking selected for deletion");
                return;
            }

            // Get token from localStorage
            const token = localStorage.getItem("token");
            console.log("Token:", token);
            if (!token) {
                toast.error("You must be logged in to delete bookings");
                return;
            }

            // Send DELETE request to deleteBooking.php
            const response = await axios.delete(
                `http://localhost/rent-easy/public/deleteBooking.php?bookingId=${bookingId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                }
            );
            console.log("Delete response:", response.data);

            // Handle API response
            if (response.data.success) {
                toast.success("Booking deleted successfully");
                onDeleteSuccess(bookingId); 
                onClose(); // Close modal
                                window.location.reload();

            } else {
                toast.error(response.data.message || "Failed to delete booking");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error(error.response?.data?.message || "An error occurred while deleting the booking");
        }
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Delete Booking" centered>
            <Text size="md" mb="lg">
                Are you sure you want to delete this booking? This action cannot be undone.
            </Text>
            <Group position="right" mt="xl">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button color="red" onClick={handleDelete}>Delete Booking</Button>
            </Group>
        </Modal>
    );
};

export default DeleteBookingModal;