import React, { useEffect, useState } from "react";
import { Card, Text, Title, Container, Flex } from "@mantine/core";
import {
  FiUsers,
  FiHome,
  FiBookmark,
  FiArrowRight,
} from "react-icons/fi";
import { BarChart } from "@mantine/charts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FaCheckCircle } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    totalUsers: null,
    totalProperties: null,
    totalRevenue: null,
    totalMessage: null,
    totalBooking: null,
    totalPayments: null,
    combinedGrowthData: [],
    users: [],
    latestPayments: [], // Store latest payments from the new API
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the existing API for dashboard stats
        const dashboardResponse = await axios.get(
          "http://localhost/rent-easy/public/Admin/totalUsers.php"
        );

        // Fetch payment details from the new API
        const paymentResponse = await axios.get(
          "http://localhost/rent-easy/public/admin/paymentDetails.php"
        );

        if (dashboardResponse.data.success && paymentResponse.data.success) {
          setData({
            totalUsers: dashboardResponse.data.data.counts.total_users,
            totalProperties: dashboardResponse.data.data.counts.total_properties,
            totalRevenue: dashboardResponse.data.data.counts.total_revenue || 0,
            totalMessage: dashboardResponse.data.data.counts.total_message || 0,
            totalBooking: dashboardResponse.data.data.counts.total_booking || 0,
            totalPayments: dashboardResponse.data.data.counts.total_payments || 0,
            combinedGrowthData: combineGrowthData(dashboardResponse.data.data),
            users: dashboardResponse.data.data.latest_users || [],
            latestPayments: paymentResponse.data.paymentDetails || [], // Use paymentDetails from the new API
          });
        } else {
          setError("Error fetching data");
        }
      } catch (error) {
        setError("Fetch error");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const combineGrowthData = (data) => {
    const combinedDataMap = new Map();

    data.user_growth.forEach((item) => {
      combinedDataMap.set(item.month, {
        month: item.month,
        users: parseInt(item.users, 10),
        properties: 0,
        payments: 0,
      });
    });

    data.property_growth.forEach((item) => {
      if (combinedDataMap.has(item.month)) {
        combinedDataMap.get(item.month).properties = parseInt(
          item.properties,
          10
        );
      } else {
        combinedDataMap.set(item.month, {
          month: item.month,
          users: 0,
          properties: parseInt(item.properties, 10),
          payments: 0,
        });
      }
    });

    data.payment_growth.forEach((item) => {
      if (combinedDataMap.has(item.month)) {
        combinedDataMap.get(item.month).payments = parseInt(item.payments, 10);
      } else {
        combinedDataMap.set(item.month, {
          month: item.month,
          users: 0,
          properties: 0,
          payments: parseInt(item.payments, 10),
        });
      }
    });

    return Array.from(combinedDataMap.values());
  };

  return (
    <Container fluid className="p-8">
      <Title order={1} className="mb-8 text-3xl font-bold">
        Admin Dashboard
      </Title>

      {/* Replaced Grid with div and flexbox */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Revenue and Subscription Cards */}
        <div className="flex-1 md:w-2/3">
          <Flex gap="lg" direction={{ base: "column", md: "row" }}>
            {/* Total Users Card */}
            <Card
              shadow="sm"
              padding="lg"
              radius="lg"
              style={{
                backgroundColor: "#4f46e5",
                color: "white",
                width: "100%",
                height: "20vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                position: "relative",
              }}
            >
              <div className="absolute top-4 left-4">
                <FiUsers size={20} />
              </div>
              <Text
                size="3xl"
                weight={900}
                style={{ marginTop: "40px", marginLeft: "20px" }}
              >
                {data.totalUsers !== null ? data.totalUsers : "Loading..."}
              </Text>
              <Text
                size="sm"
                style={{ marginTop: "8px", marginLeft: "20px", opacity: 0.8 }}
              >
                TOTAL USERS
              </Text>

              <Text
                onClick={() => navigate("/navbar/users")}
                size="sm"
                weight={600}
                style={{
                  position: "absolute",
                  bottom: "16px",
                  right: "16px",
                  color: "white",
                  opacity: 0.9,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
                className="hover:opacity-100 hover:underline"
              >
                View All <FiArrowRight size={14} />
              </Text>
            </Card>

            {/* Total Properties Card */}
            <Card
              shadow="sm"
              padding="lg"
              radius="lg"
              style={{
                backgroundColor: "#0d9488",
                color: "white",
                width: "100%",
                height: "20vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
                position: "relative",
              }}
            >
              <div className="absolute top-4 left-4">
                <FiHome size={20} />
              </div>
              <Text
                size="3xl"
                weight={900}
                style={{ marginTop: "40px", marginLeft: "20px" }}
              >
                {data.totalProperties !== null
                  ? data.totalProperties
                  : "Loading..."}
              </Text>
              <Text
                size="sm"
                style={{ marginTop: "8px", marginLeft: "20px", opacity: 0.8 }}
              >
                TOTAL PROPERTIES
              </Text>
              <Text
                onClick={() => navigate("/navbar/addedProperties")}
                size="sm"
                weight={600}
                style={{
                  position: "absolute",
                  bottom: "16px",
                  right: "16px",
                  color: "white",
                  opacity: 0.9,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
                className="hover:opacity-100 hover:underline"
              >
                View All <FiArrowRight size={14} />
              </Text>
            </Card>
          </Flex>
        </div>

        {/* Right Side: Revenue and Messages Card */}
        <div className="md:w-1/3">
          <Card
            shadow="sm"
            padding="lg"
            radius="lg"
            style={{
              backgroundColor: "white",
              color: "black",
              width: "100%",
              height: "20vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Total Bookings */}
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FiBookmark size={20} style={{ color: "#4f46e5" }} />
                <Text size="3xl" weight={900}>
                  Total Bookings
                </Text>
              </div>
              <Text size="3xl" weight={900}>
                {data.totalBooking}
              </Text>
            </div>

            {/* Total Payments */}
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Text size="3xl" weight={900} color="gold">
                  Total Payments
                </Text>
              </div>
              <Text size="3xl" weight={900}>
                {data.totalPayments}
              </Text>
            </div>
          </Card>
        </div>
      </div>

      {/* Growth Chart Section with Latest Payments */}
      <div className="mt-12">
        <Card shadow="sm" padding="lg" radius="md" className="h-full">
          <Title order={3} className="mb-4 text-2xl font-bold">
            Growth Over Time
          </Title>

          <Flex direction={{ base: "column", md: "row" }} gap="lg">
            {/* Left Side: Bar Chart and Total Revenue */}
            <div className="flex-1">
              <div className="p-4 bg-white rounded-md w-fit">
                <div className="text-sm text-gray-500">Total Revenue</div>
                <div className="text-xl font-semibold text-black mt-1 mb-3">
                  {data.totalRevenue !== null
                    ? `Rs.${data.totalRevenue}`
                    : "Loading..."}
                </div>
              </div>

              <BarChart
                h={300}
                w={450}
                data={data.combinedGrowthData}
                dataKey="month"
                xAxisProps={{ padding: { left: 30, right: 30 } }}
                tooltipProps={{
                  content: ({ label, payload }) => {
                    if (!payload || payload.length === 0) return null;

                    const monthData = payload[0].payload;
                    return (
                      <div className="bg-white p-4 shadow-lg rounded-lg">
                        <Text size="sm" weight={500} className="mb-2">
                          {label}
                        </Text>
                        <Text size="sm">Users: {monthData.users}</Text>
                        <Text size="sm">Properties: {monthData.properties}</Text>
                        <Text size="sm">Payments: {monthData.payments}</Text>
                      </div>
                    );
                  },
                }}
                series={[
                  { name: "users", color: "indigo.6" },
                  { name: "properties", color: "teal.6" },
                  { name: "payments", color: "orange.6" },
                ]}
              />
            </div>

            {/* Right Side: Latest Payments */}
            <div className="md:w-1/3">
              <Text size="lg" weight={700} className="mb-4">
                Latest Payments
              </Text>
              {data.latestPayments.length > 0 ? (
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                  {data.latestPayments.map((payment, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div>
                        <Text size="sm" weight={500}>
                          {payment.name || "Unknown User"}
                        </Text>
                        <Text size="xs" color="dimmed">
                          {moment(payment.created_at).format("YYYY.MM.DD")} 
                        </Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <Text size="sm" weight={500}>
                          Rs.{parseFloat(payment.amount).toFixed(2)}
                        </Text>
                        <FaCheckCircle className="text-green-500" size={14} />
                        <Text size="xs" color="dimmed">
                          {moment(payment.created_at).fromNow()}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Text size="sm" color="dimmed">
                  No recent payments available.
                </Text>
              )}
              {/* See All Button */}
              {data.latestPayments.length > 0 && (
                <div className="mt-4 text-right">
                  <button
                    onClick={() => navigate("/navbar/paymentInformation")}
                    className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    See All
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-4 h-4 ml-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </Flex>
        </Card>
      </div>

      {/* Latest Users Section */}
      <Card
        shadow="sm"
        padding="lg"
        className="mt-8 bg-white rounded-xl border border-gray-100"
      >
        <Title order={3} className="mb-6 text-2xl font-semibold text-gray-800">
          Latest Users
        </Title>

        <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-600 uppercase bg-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    <div className="flex items-center">
                      ID
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    <div className="flex items-center">
                      Verified
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((user) => (
                  <tr
                    key={user.id}
                    className="bg-white border-b hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {user.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 h-9 w-9">
                          <img
                            className="h-9 w-9 rounded-full object-cover border border-gray-200"
                            src={
                              user.avatar ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                user.name
                              )}&background=random`
                            }
                            alt={user.name}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700 truncate max-w-[180px]">
                        {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {user.phoneNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 inline-flex text-xs leading-4 font-medium rounded-full 
                        ${
                          user.userType === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : user.userType === "moderator"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.userType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {Number(user.is_verified) === 1 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>{" "}
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <span className="h-2 w-2 rounded-full bg-red-500 mr-1.5"></span>{" "}
                          Unverified
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">
                        <div className="whitespace-nowrap">
                          {moment(user.created_at).format("MMM D, YYYY")}
                        </div>
                        <div className="text-xs text-gray-500">
                          {moment(user.created_at).fromNow()}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5 text-center">
          <button
            onClick={() => navigate("/navbar/users")}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
          >
            View all users
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4 ml-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </Card>
    </Container>
  );
};

export default Dashboard;






