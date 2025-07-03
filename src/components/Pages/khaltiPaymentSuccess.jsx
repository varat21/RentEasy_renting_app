import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Title, Text, Button} from '@mantine/core';
import { Loader } from "lucide-react";

import moment from 'moment';

const KhaltiPaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

  // Parse query parameters
  const cleanSearch = location.search.split("?")[1] || "";
  const params = new URLSearchParams(cleanSearch);

  console.log("Khalti Payment Query params:", Object.fromEntries(params));

  const sendPaymentData = async () => {
    try {
      // Extract all parameters from URL
      const paymentData = Object.fromEntries(params.entries());
      
      // Add additional required fields
      paymentData.payment_date = moment().format("YYYY-MM-DD HH:mm:ss");
      paymentData.payment_method = "khalti";

      // Validate required fields
      const requiredFields = ['amount', 'propertyId', 'userId', 'pidx', 'transaction_id'];
      const missingFields = requiredFields.filter(field => !paymentData[field]);

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

      console.log("Sending Khalti payment data:", paymentData);

      const backendUrl = 'http://localhost/rent-easy/public/payment-request.php';
      const response = await axios.post(backendUrl, paymentData);

      if (response.data.success) {
        setModalOpened(true);
        toast.success("Khalti payment successful!");
      } else {
        throw new Error(response.data.message || "Khalti payment verification failed");
      }
    } catch (err) {
      console.error("Khalti payment error:", err);
      let errorMessage = "Failed to process Khalti payment";
      
      if (err.code === "ERR_NETWORK") {
        errorMessage = "Network error: Unable to reach the server";
      } else if (err.response) {
        errorMessage = err.response.data.message || "Server error";
      } else if (err.message) {
        errorMessage = err.message;
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

    // Add a small delay before processing
    const timer = setTimeout(() => {
      sendPaymentData();
    }, 1000);

    return () => clearTimeout(timer);
  }, [loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader className="animate-spin" />
        <Title order={4} className="mt-4 text-gray-700">
          Verifying Khalti payment...
        </Title>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
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
                className="mx-auto mb-4 max-w-[200px]"
              />
              <Title order={3} className="text-green-500 mb-4">
                Payment Successful!
              </Title>
              <Text className="mb-2">Transaction ID: {params.get('transaction_id')}</Text>
              <Text className="mb-4">Amount: Rs. {params.get('amount') / 100}</Text>
            </>
          )}
          <Button
            onClick={() => navigate("/")}
            fullWidth
            size="md"
            className="bg-blue-500 hover:bg-blue-600 text-white mt-4"
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KhaltiPaymentSuccess;