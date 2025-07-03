import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import useBookingStore from "../../stores/useBookingStore";
import { Title, Text, Button, Modal } from "@mantine/core";
import moment from "moment";
import { Loader } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookedProperties, totalAmount, clearBookings } = useBookingStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

  // Parse query parameters, handling malformed URL
  const cleanSearch = location.search.split("?")[1] || "";
  const params = new URLSearchParams(cleanSearch);

  // console.log("Raw URL search:", location.search);
  // console.log("Cleaned search:", cleanSearch);

  const rawAmount = params.get("amount");
  let amount = rawAmount ? Number(rawAmount) : totalAmount || 0;
  const propertyId = params.get("propertyId") || bookedProperties[0]?.propertyId;
  const transactionUuid = params.get("transaction_uuid") || `txn_${Date.now()}`;
  const userId = params.get("user_id") || bookedProperties[0]?.userId;

  const sendPaymentData = async () => {
    try {
      // Validate all required fields
      const missingFields = [];
      if (!userId) missingFields.push("id");
      if (!propertyId) missingFields.push("propertyId");
      if (!amount || amount <= 0) missingFields.push("amount");
      if (!transactionUuid) missingFields.push("transaction_id");

      if (missingFields.length > 0) {
        throw new Error(`Missing or invalid required fields: ${missingFields.join(", ")}`);
      }

      const paymentData = {
        id: String(userId),
        propertyId: String(propertyId),
        amount: Number(amount),
        transaction_id: String(transactionUuid),
        payment_date: moment().format("YYYY-MM-DD HH:mm:ss"),
      };

      // console.log("Sending payment data:", paymentData);

      const backendUrl = "http://localhost/rent-easy/public/esewaPayment/payment.php";
      const response = await axios.post(backendUrl, paymentData);

      // console.log("API response:", response.data);

      if (response.data.success) {
        setModalOpened(true);
        clearBookings();
        toast.success("Payment successful!");
      } else {
        throw new Error(response.data.message || "Payment processing failed");
      }
    } catch (err) {
      console.error("Payment error:", err);
      let errorMessage = "Failed to process payment";
      if (err.code === "ERR_NETWORK") {
        errorMessage = "Network error: Unable to reach the server. Please check if the backend is running.";
      } else if (err.response) {
        errorMessage = err.response.data.message || "Server error";
      }
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) return;

    const queryError = params.get("error");
    if (queryError) {
      setError(decodeURIComponent(queryError));
      setLoading(false);
      return;
    }

    console.log("Query params:", {
      amount: params.get("amount"),
      totalAmountFromStore: totalAmount,
      amountCalculated: amount,
      propertyId,
      userId,
      transactionUuid,
      bookedProperties,
      allParams: Object.fromEntries(params),
    });

    // Add a 5-second delay before calling sendPaymentData
    const delay = setTimeout(() => {
      sendPaymentData();
    }, 4000);

    // Cleanup timeout on component unmount
    return () => clearTimeout(delay);
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader className="animate-spin" />
        {/* <p className="ml-2 text-lg font-semibold text-gray-700">Processing payment...</p> */}
      </div>
    );
  }

  return (
    <Modal
      opened={modalOpened || !!error}
      onClose={() => navigate("/")}
      centered
      size="sm"
      className="p-6"
    >
      <div className="text-center">
        {error ? (
          <>
            <Title order={3} className="text-red-500 mb-4">
              Payment Failed
            </Title>
            <Text className="mb-6">{error}</Text>
          </>
        ) : (
          <>
            <img
              src="./success.jpg"
              alt="Success"
              className="mx-auto mb-4 w-full h-full p-10"
            />
            <Title order={3} className="text-green-500 mb-4">
              Payment Successful!
            </Title>
          </>
        )}
        <Button
          onClick={() => navigate("/")}
          fullWidth
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Return Home
        </Button>
      </div>
    </Modal>
  );
};

export default PaymentSuccess;