import React from 'react';
import { Modal, Button, Group, Text } from '@mantine/core';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const DeletePaymentModal = ({ opened, onClose, paymentId }) => {
    const handleDelete = async () => {
        try {
            if (!paymentId) {
                toast.error("No payment selected for deletion");
                return;
            }

            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("You must be logged in to delete payments");
                return;
            }

            // DELETE request to delete payment
            const response = await axios.delete(
                `http://localhost/rent-easy/public/deletePayment.php?paymentId=${paymentId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                }
            );

            if (response.data.success) {
                toast.success("Payment deleted successfully");
                onClose();
                window.location.reload();
            } else {
                toast.error(response.data.message || "Failed to delete payment");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error(error.response?.data?.message || "An error occurred while deleting the payment");
        }
    };

    return (
        <Modal opened={opened} onClose={onClose} title="Delete Payment" centered>
            <Text size="md" mb="lg">
                Are you sure you want to delete this payment? This action cannot be undone.
            </Text>
            <Group position="right" mt="xl">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button color="red" onClick={handleDelete}>Delete Payment</Button>
            </Group>
        </Modal>
    );
};

export default DeletePaymentModal;