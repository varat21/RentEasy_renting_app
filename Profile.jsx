import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import ProfileEditModal from "./ProfileEditModal";
import axios from "axios";
import {
  Tabs,
  Divider,
  Modal,
  Button,
  Group,
  Title,
  Badge,
  Rating,
  Text,
  Card,
  Avatar,
  Grid,
  Paper,
  ActionIcon,
} from "@mantine/core";
import moment from "moment";
import useBookingStore from "../stores/useBookingStore";
import { toast, Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { MdEdit } from "react-icons/md";
import {
  FaMoneyBillAlt,
  FaRuler,
  FaMapMarkerAlt,
  FaRoad,
  FaCompass,
  FaCalendarAlt,
  FaUserEdit,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Loader, Trash2 } from "lucide-react";
import DeletePropertiesModal from "./deleteProfilePropertiesModal";
import EditPropertiesModal from "./EditPropertiesModal";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import BookingHistory from "./BookingHistory";

const GetProfileData = () => {
  const [userId, setUserId] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 5;

  // Zustand store
  const { bookedProperty, totalAmount, removeProperty, clearBookings } =
    useBookingStore();
  const navigate = useNavigate();

  // Generate success URL with actual values
  const generateSuccessUrl = () => {
    const token = localStorage.getItem("token");
    if (!token) return "";

    const decodedToken = jwtDecode(token);
    const userId = decodedToken?.userId;

    if (!bookedProperty || totalAmount <= 0) {
      console.error("No booked property or invalid total amount");
      return "";
    }

    const bookingId = bookedProperty?.bookingId || `bk_${Date.now()}`;
    const propertyId = bookedProperty?.propertyId || bookedProperty?.id;
    const transaction_uuid = uuidv4();

    const amount = totalAmount > 0 ? totalAmount : bookedProperty?.price || 0;

    return `http://localhost:5173/paymentSuccess?booking_id=${bookingId}&amount=${amount}&propertyId=${propertyId}&transaction_uuid=${transaction_uuid}&user_id=${userId}`;
  };

  // eSewa form data
  const [esewaFormData, setEsewaFormData] = useState({
    amount: "0",
    tax_amount: "0",
    total_amount: "0",
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: "",
    failure_url: "https://localhost:5173/payment-failure",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
  });

  // Update eSewa formData
  useEffect(() => {
    if (!bookedProperty || totalAmount <= 0) {
      console.warn("No booked property or invalid total amount");
      return;
    }

    const amount =
      totalAmount > 0
        ? totalAmount.toString()
        : bookedProperty?.price?.toString() || "0";
    const taxAmount = "0";
    const serviceCharge = "0";
    const deliveryCharge = "0";
    const totalAmountCalculated = (
      Number(amount) +
      Number(taxAmount) +
      Number(serviceCharge) +
      Number(deliveryCharge)
    ).toString();

    const successUrl = generateSuccessUrl();

    setEsewaFormData((prev) => ({
      ...prev,
      amount: amount,
      tax_amount: taxAmount,
      product_service_charge: serviceCharge,
      product_delivery_charge: deliveryCharge,
      total_amount: totalAmountCalculated,
      transaction_uuid: uuidv4(),
      success_url: successUrl,
    }));
  }, [totalAmount, bookedProperty]);

  // Generate eSewa signature
  const generateEsewaSignature = (
    total_amount,
    transaction_uuid,
    product_code,
    secret
  ) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    const signature = CryptoJS.enc.Base64.stringify(hash);
    return signature;
  };

  // Calculate eSewa signature
  useEffect(() => {
    const { total_amount, transaction_uuid, product_code, secret } =
      esewaFormData;
    if (total_amount && transaction_uuid && product_code) {
      const hashedSignature = generateEsewaSignature(
        total_amount,
        transaction_uuid,
        product_code,
        secret
      );
      setEsewaFormData((prev) => ({ ...prev, signature: hashedSignature }));
    }
  }, [esewaFormData.total_amount, esewaFormData.transaction_uuid]);

  // Khalti payment handler
  const handleKhaltiPayment = async () => {
    try {
      setPaymentProcessing(true);

      // Prepare payment data
      const paymentData = {
        amount: totalAmount * 100,
        propertyId: bookedProperty.propertyId,
        userId: userId,
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phoneNumber,
        product_name: bookedProperty.title,
      };

      console.log(
        "Payment Data:",
        paymentData,
        "Total Amount:",
        totalAmount * 100,
        "User ID:",
        userId,
        "Property ID:",
        bookedProperty.propertyId,
        "Name:",
        profileData.name,
        "Email:",
        profileData.email,
        "Phone:",
        profileData.phoneNumber,
        "Product Name:",
        bookedProperty.title
      );

      // Call your backend to initiate Khalti payment
      const response = await axios.post(
        "http://localhost/rent-easy/public/payment-response.php",
        paymentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false, // Ensure no credentials are sent if not needed
        }
      );
      // console.log("Khalti payment response:", response.data);

      if (response.data.success && response.data.paymentUrl) {
        // Redirect to Khalti payment page
        window.location.href = response.data.paymentUrl;
      } else {
        toast.error(
          response.data.message || "Failed to initiate Khalti payment"
        );
        setPaymentProcessing(false);
      }
    } catch (error) {
      console.error("Khalti payment error:", error);
      toast.error("An error occurred while processing Khalti payment");
      setPaymentProcessing(false);
    }
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePaymentSubmit = () => {
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (selectedPaymentMethod === "esewa") {
      // Existing eSewa logic
      if (Number(esewaFormData.total_amount) <= 0) {
        toast.error("Total amount must be greater than 0");
        return;
      }
      setPaymentProcessing(true);
      document.getElementById("esewa-form").submit();
    } else if (selectedPaymentMethod === "khalti") {
      handleKhaltiPayment();
    }
  };

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        setLoading(false);
        toast.error("Please log in to view profile");
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const extractedUserId = decodedToken?.userId;
        setUserId(extractedUserId);

        const response = await axios.get(
          `http://localhost/rent-easy/public/profile.php/id=${extractedUserId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          setProfileData(response.data.user);
          setProperties(response.data.properties || []);
          setFilteredProperties(response.data.properties || []);
        } else {
          toast.error(response.data.message || "Failed to load profile data");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred while loading profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Filter properties
  useEffect(() => {
    let filtered = properties;
    if (searchTerm) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (property) => property.status === statusFilter
      );
    }
    setFilteredProperties(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, properties]);

  // Pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRemoveProperty = () => {
    removeProperty();
    toast.success("Property removed from bookings");
  };

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  // Skeleton Loader
  const SkeletonLoader = () => (
    <div className="space-y-6">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-white p-6 rounded-xl shadow-md"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4 h-48 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Property Card
  const PropertyCard = ({ property }) => (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <img
            src={
              property.images?.[0] ||
              "https://via.placeholder.com/400x300?text=No+Image"
            }
            alt={property.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-gray-800">
              {property.title}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedPropertyId(property.propertyId);
                  openEditModal();
                }}
                className="p-2 text-blue-600 hover:text-blue-800"
                title="Edit Property"
              >
                <MdEdit className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setSelectedPropertyId(property.propertyId);
                  openDeleteModal();
                }}
                className="p-2 text-red-600 hover:text-red-800"
                title="Delete Property"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            {property.description || "No description available"}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                label: "Price",
                value: `Rs. ${property.price}`,
                icon: <FaMoneyBillAlt className="text-blue-500" />,
              },
              {
                label: "Size",
                value: `${property.dimension} sqft`,
                icon: <FaRuler className="text-blue-500" />,
              },
              {
                label: "Location",
                value: `${property.city}, ${property.country}`,
                icon: <FaMapMarkerAlt className="text-blue-500" />,
              },
              {
                label: "Road Type",
                value: property.road_type || "N/A",
                icon: <FaRoad className="text-blue-500" />,
              },
              {
                label: "Facing",
                value: property.property_face || "N/A",
                icon: <FaCompass className="text-blue-500" />,
              },
              {
                label: "Posted On",
                value: moment(property.uploaded_at).format("MMM D, YYYY"),
                icon: <FaCalendarAlt className="text-blue-500" />,
              },
            ].map((detail, index) => (
              <div key={index} className="flex items-center gap-2">
                {detail.icon}
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {detail.label}
                  </p>
                  <p className="text-sm text-gray-600">{detail.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Pagination Component
  const Pagination = ({ totalPages, currentPage, paginate }) => (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300"
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => paginate(index + 1)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === index + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300"
      >
        Next
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader className="text-blue-700 w-12 h-12 animate-spin" />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold text-red-500">
          No profile data found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-6 mt-20">
      <Toaster position="top-right" />
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
        My Dashboard
      </h1>

      <Tabs
        color="teal"
        defaultValue="first"
        className="mx-auto bg-white shadow-md rounded-xl"
      >
        <Tabs.List className="flex justify-center mb-4 border-b border-gray-200">
          <Tabs.Tab value="first" className="text-lg font-semibold">
            Booked Property
          </Tabs.Tab>
          <Tabs.Tab value="second" className="text-lg font-semibold">
            My Profile
          </Tabs.Tab>
          <Tabs.Tab value="third" className="text-lg font-semibold">
            My Added Properties
          </Tabs.Tab>
          <Tabs.Tab value="fourth" className="text-lg font-semibold">
            My Booked History
          </Tabs.Tab>
        </Tabs.List>

        {/* Booked Property Tab */}
        <Tabs.Panel value="first" pt="xs">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto p-4"
          >
            <h3 className="text-xl font-semibold mb-4 text-left">
              My Booked Property
            </h3>
            {bookedProperty ? (
              <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                className="mb-6"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/4">
                    <img
                      src={
                        bookedProperty.images?.[0] || "/default-property.jpg"
                      }
                      alt={bookedProperty.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <Group>
                        <Title order={3}>{bookedProperty.title}</Title>
                        <Badge variant="filled" size="lg">
                          Booking #1
                        </Badge>
                      </Group>
                      <Button
                        onClick={handleRemoveProperty}
                        variant="subtle"
                        color="red"
                      >
                        <Trash2 size={20} />
                      </Button>
                    </div>
                    <Text color="dimmed" className="mt-2">
                      {bookedProperty.description}
                    </Text>
                    {bookedProperty.ratings?.length > 0 && (
                      <div className="mt-4 flex items-center gap-2">
                        <Rating
                          value={calculateAverageRating(bookedProperty.ratings)}
                          readOnly
                          size="sm"
                        />
                        <Text size="sm" color="dimmed">
                          {calculateAverageRating(bookedProperty.ratings)} (
                          {bookedProperty.ratings.length} reviews)
                        </Text>
                      </div>
                    )}
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <Text size="sm" color="dimmed">
                          Price
                        </Text>
                        <Text weight={600}>Rs. {bookedProperty.price}</Text>
                      </div>
                      <div>
                        <Text size="sm" color="dimmed">
                          Location
                        </Text>
                        <Text weight={600}>
                          {bookedProperty.city}, {bookedProperty.country}
                        </Text>
                      </div>
                      <div>
                        <Text size="sm" color="dimmed">
                          Size
                        </Text>
                        <Text weight={600}>
                          {bookedProperty.dimension} sqft
                        </Text>
                      </div>
                      <div>
                        <Text size="sm" color="dimmed">
                          Booked On
                        </Text>
                        <Text weight={600}>
                          {moment(bookedProperty.bookingDate).format(
                            "MMM DD, YYYY"
                          )}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Text color="dimmed">No property booked yet.</Text>
            )}
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              className="mt-8"
            >
              <Group position="apart" className="mb-6">
                <Title order={3}>Booking Summary</Title>
              </Group>
              <Group position="right" spacing="md">
                <Button
                  onClick={() => setPaymentModalOpen(true)}
                  variant="filled"
                  disabled={!bookedProperty || totalAmount <= 0}
                >
                  Complete Payment
                </Button>
              </Group>
            </Card>
          </motion.div>
        </Tabs.Panel>

        {/* My Profile Tab */}
        <Tabs.Panel value="second" pt="xs">
          <div className="max-w-2xl mx-auto p-6">
            <Paper radius="md" withBorder p="lg" className="bg-white shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <Title order={3} className="text-gray-800">
                  My Profile
                </Title>
                <ActionIcon
                  onClick={open}
                  variant="filled"
                  color="blue"
                  size="lg"
                  radius="xl"
                  title="Edit Profile"
                >
                  <FaUserEdit size={18} />
                </ActionIcon>
              </div>
              <div className="flex flex-col items-center mb-6">
                {profileData.image ? (
                  <Avatar
                    src={profileData.image}
                    size={120}
                    radius="xl"
                    className="border-4 border-gray-100 shadow-sm"
                  />
                ) : (
                  <Avatar
                    src={`https://ui-avatars.com/api/?name=${profileData.name}&background=random&size=120`}
                    size={120}
                    radius="xl"
                    className="border-4 border-gray-100 shadow-sm"
                  />
                )}
                <Text
                  size="xl"
                  weight={700}
                  className="mt-4 text-gray-800 capitalize"
                >
                  {profileData.name || "N/A"}
                </Text>
                <Badge color="teal" size="lg" radius="sm" className="mt-2">
                  {profileData.userType || "User"}
                </Badge>
              </div>
              <Grid gutter="md">
                <Grid.Col span={12} sm={6}>
                  <Paper radius="sm" p="md" withBorder className="bg-gray-50">
                    <Text size="sm" color="dimmed" weight={500}>
                      Email
                    </Text>
                    <Text size="md" className="text-gray-800 break-all">
                      {profileData.email || "N/A"}
                    </Text>
                  </Paper>
                </Grid.Col>
                <Grid.Col span={12} sm={6}>
                  <Paper radius="sm" p="md" withBorder className="bg-gray-50">
                    <Text size="sm" color="dimmed" weight={500}>
                      Phone
                    </Text>
                    <Text size="md" className="text-gray-800">
                      {profileData.phoneNumber || "N/A"}
                    </Text>
                  </Paper>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Paper radius="sm" p="md" withBorder className="bg-gray-50">
                    <Text size="sm" color="dimmed" weight={500}>
                      Address
                    </Text>
                    <Text size="md" className="text-gray-800">
                      {profileData.address || "N/A"}
                    </Text>
                  </Paper>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Paper
                    radius="sm"
                    p="md"
                    withBorder
                    className="bg-gray-50 flex items-center justify-between"
                  >
                    <div>
                      <Text size="sm" color="dimmed" weight={500}>
                        Account Status
                      </Text>
                      <Text size="md" className="text-gray-800">
                        Active
                      </Text>
                    </div>
                    <Badge color="green" size="lg" radius="sm">
                      Active
                    </Badge>
                  </Paper>
                </Grid.Col>
              </Grid>
            </Paper>
          </div>
        </Tabs.Panel>

        {/* My Properties Tab */}
        <Tabs.Panel value="third" pt="xs">
          <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                My Properties
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Search by property or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {loading ? (
                <SkeletonLoader />
              ) : properties.length > 0 ? (
                <div className="space-y-6">
                  {currentProperties.map((property) => (
                    <PropertyCard
                      key={property.propertyId}
                      property={property}
                    />
                  ))}
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    paginate={paginate}
                  />
                </div>
              ) : (
                <p className="text-gray-600 text-center py-10">
                  No properties found. Try adjusting your search or filters.
                </p>
              )}
            </div>
          </div>
        </Tabs.Panel>

        {/* Booking History Tab */}
        <Tabs.Panel value="fourth" pt="xs">
          <BookingHistory />
        </Tabs.Panel>
      </Tabs>

      {/* Modals */}
      <ProfileEditModal
        opened={opened}
        close={close}
        name={profileData.name}
        address={profileData.address}
        phoneNumber={profileData.phoneNumber}
        gender={profileData.gender}
        password={profileData.password}
        id={profileData.id}
        email={profileData.email}
      />
      <EditPropertiesModal
        userId={userId}
        opened={editModalOpened}
        onClose={closeEditModal}
        propertyId={selectedPropertyId}
        property={properties.find((p) => p.propertyId === selectedPropertyId)}
      />
      <DeletePropertiesModal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        propertyId={selectedPropertyId}
      />
      <Modal
        opened={paymentModalOpen}
        onClose={() => !paymentProcessing && setPaymentModalOpen(false)}
        title="Complete Payment"
        centered
        size="lg"
      >
        <div className="p-4 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-4">
              Select Payment Method
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center justify-center ${
                  selectedPaymentMethod === "esewa"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
                onClick={() => handlePaymentMethodSelect("esewa")}
              >
                <img
                  src="/esewa.png"
                  alt="eSewa Mobile Wallet"
                  className="w-20 h-15 mb-2"
                />
                <p className="text-sm text-center">eSewa Mobile Wallet</p>
              </div>
              <div
                className={`p-4 border rounded-lg cursor-pointer flex flex-col items-center justify-center ${
                  selectedPaymentMethod === "khalti"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200"
                }`}
                onClick={() => handlePaymentMethodSelect("khalti")}
              >
                <img
                  src="/khalti.png"
                  alt="Khalti Pay"
                  className="w-28 h-14 mb-2"
                />
                <p className="text-sm text-center">Pay with Khalti</p>
              </div>
            </div>
            {selectedPaymentMethod === "esewa" && (
              <form
                id="esewa-form"
                action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                method="POST"
                className="hidden"
              >
                <input
                  type="hidden"
                  name="amount"
                  value={esewaFormData.amount}
                />
                <input
                  type="hidden"
                  name="tax_amount"
                  value={esewaFormData.tax_amount}
                />
                <input
                  type="hidden"
                  name="total_amount"
                  value={esewaFormData.total_amount}
                />
                <input
                  type="hidden"
                  name="transaction_uuid"
                  value={esewaFormData.transaction_uuid}
                />
                <input
                  type="hidden"
                  name="product_code"
                  value={esewaFormData.product_code}
                />
                <input
                  type="hidden"
                  name="product_service_charge"
                  value={esewaFormData.product_service_charge}
                />
                <input
                  type="hidden"
                  name="product_delivery_charge"
                  value={esewaFormData.product_delivery_charge}
                />
                <input
                  type="hidden"
                  name="success_url"
                  value={esewaFormData.success_url}
                />
                <input
                  type="hidden"
                  name="failure_url"
                  value={esewaFormData.failure_url}
                />
                <input
                  type="hidden"
                  name="signed_field_names"
                  value={esewaFormData.signed_field_names}
                />
                <input
                  type="hidden"
                  name="signature"
                  value={esewaFormData.signature}
                />
              </form>
            )}
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between mb-2">
                <p className="text-sm font-semibold">
                  Rs. {Number(totalAmount).toLocaleString("en-IN")}
                </p>
              </div>
              <Divider className="my-2" />
              <div className="flex justify-between">
                <p className="text-lg font-semibold">Total Amount</p>
                <p className="text-lg font-semibold text-orange-500">
                  Rs. {Number(totalAmount).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handlePaymentSubmit}
            loading={paymentProcessing}
            disabled={!selectedPaymentMethod}
          >
            {paymentProcessing ? "Processing..." : "Proceed to Pay"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default GetProfileData;
