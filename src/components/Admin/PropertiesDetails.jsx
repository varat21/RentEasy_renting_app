import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Button, Rating, Skeleton } from "@mantine/core";
import { toast } from "react-hot-toast";
import useBookingStore from "../stores/useBookingStore";
import { jwtDecode } from "jwt-decode";
import {
  FaMoneyBillAlt,
  FaRuler,
  FaMapMarkerAlt,
  FaRoad,
  FaCompass,
  FaCalendarAlt,
  FaPhone,
  FaEye,
  FaBed,
  FaBath,
  FaStar,
} from "react-icons/fa";
import RatingModal from "../properties/RatingModal";
import { PropertiesViews } from "../properties/GetPropertiesDetails";
import "leaflet/dist/leaflet.css";

const PropertiesDetails = () => {
  const { bookProperty } = useBookingStore();
  const navigate = useNavigate();
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost/rent-easy/public/getPropertiesDetails.php?propertyId=${id}`
        );

        if (data.success && data.properties?.length) {
          const fetchedProperty = data.properties[0];
          setProperty({
            ...fetchedProperty,
            images: [...new Set(fetchedProperty.images || [])],
          });
          setSelectedImage(fetchedProperty.images?.[0] || "/default-image.jpg");
        } else {
          setError(data.message || "Property not found");
        }
      } catch {
        setError("Error connecting to the server");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (property?.status === "booked") {
      toast.error("This property is already booked.");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.userId;
      if (!userId) {
        toast.error("Invalid token. Please log in again.");
        return;
      }

      const formData = new FormData();
      formData.append("property_id", id);
      formData.append("user_id", userId);
      formData.append("id", userId);
      formData.append("status", "pending");

      const response = await axios.post(
        "http://localhost/rent-easy/public/bookProperty.php",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        bookProperty(property);
        toast.success("Property booked successfully!");
        navigate("/properties");
      } else {
        toast.error(response.data.message || "Booking failed.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("An error occurred while booking the property.");
    }
  };

  if (loading) {
    return (
      <motion.div
        className="mx-auto p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Skeleton */}
        <Skeleton height={40} width="40%" mb="md" />
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Skeleton height={20} width="20%" />
          <Skeleton height={20} width="10%" />
          <Skeleton height={20} width="15%" />
        </div>

        {/* Main Content Skeleton */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-2/3 space-y-6">
            {/* Image Gallery Skeleton */}
            <div>
              <Skeleton height={384} width="100%" radius="xl" />
              <div className="flex gap-2 mt-4">
                {[...Array(4)].map((_, index) => (
                  <Skeleton key={index} height={80} width={80} radius="sm" />
                ))}
              </div>
            </div>

            {/* Description Skeleton */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <Skeleton height={30} width="20%" mb="md" />
              <Skeleton height={100} width="100%" />
            </div>

            {/* Features Skeleton */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <Skeleton height={30} width="20%" mb="md" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, index) => (
                  <Skeleton key={index} height={20} width="80%" />
                ))}
              </div>
            </div>

            {/* Location Skeleton */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <Skeleton height={30} width="20%" mb="md" />
              <Skeleton height={256} width="100%" radius="lg" />
            </div>

            {/* Reviews Skeleton */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between mb-4">
                <Skeleton height={30} width="30%" />
                <Skeleton height={36} width="20%" />
              </div>
              <div className="space-y-4">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex items-center gap-4">
                      <Skeleton circle height={48} width={48} />
                      <div className="flex-1">
                        <Skeleton height={20} width="30%" />
                        <Skeleton height={16} width="20%" mt={6} />
                      </div>
                    </div>
                    <Skeleton height={20} width="40%" mt={10} />
                    <Skeleton height={60} width="100%" mt={10} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column Skeleton */}
          <div className="lg:w-1/3 space-y-6">
            {/* Pricing Skeleton */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <Skeleton height={30} width="20%" mb="md" />
              <Skeleton height={30} width="40%" mb="md" />
              <Skeleton height={40} width="100%" />
            </div>

            {/* Owner Info Skeleton */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <Skeleton height={30} width="30%" mb="md" />
              <div className="flex items-center gap-4">
                <Skeleton circle height={64} width={64} />
                <div className="flex-1">
                  <Skeleton height={20} width="50%" />
                  <Skeleton height={16} width="30%" mt={6} />
                </div>
              </div>
              <Skeleton height={20} width="60%" mt={10} />
              <Skeleton height={36} width="100%" mt={10} />
            </div>

            {/* Quick Facts Skeleton */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <Skeleton height={30} width="30%" mb="md" />
              <div className="space-y-3">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex justify-between">
                    <Skeleton height={20} width="30%" />
                    <Skeleton height={20} width="30%" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error)
    return <div className="text-center text-red-500 p-10">{error}</div>;

  const avgRating =
    property?.ratings?.length > 0
      ? (
          property.ratings.reduce((acc, r) => acc + r.rating, 0) /
          property.ratings.length
        ).toFixed(1)
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto p-4"
    >
      {/* Property Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{property?.title}</h1>
        <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-600">
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-1" />
            <span>
              {property?.city}, {property?.country}
            </span>
          </div>
          <PropertiesViews id={id} />
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span>
              {avgRating} ({property?.ratings?.length || 0} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="lg:w-2/3">
          {/* Image Gallery */}
          <div className="mb-6">
            <div className="rounded-xl overflow-hidden shadow-lg mb-4">
              <img
                src={selectedImage}
                alt="Property"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-4">
              {property?.images
                ?.filter((img) => img)
                .map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-80"
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700">{property?.description}</p>
          </div>

          {/* Features */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <FaBed className="text-blue-500 mr-2" />
                <span>{property?.bedrooms || 0} Bedrooms</span>
              </div>
              <div className="flex items-center">
                <FaBath className="text-blue-500 mr-2" />
                <span>{property?.bathrooms || 0} Bathrooms</span>
              </div>
              <div className="flex items-center">
                <FaRuler className="text-blue-500 mr-2" />
                <span>{property?.dimension} sqft</span>
              </div>
              <div className="flex items-center">
                <FaRoad className="text-blue-500 mr-2" />
                <span>{property?.road_type}</span>
              </div>
              <div className="flex items-center">
                <FaCompass className="text-blue-500 mr-2" />
                <span>{property?.property_face} facing</span>
              </div>
              <div className="flex items-center">
                <FaMoneyBillAlt className="text-blue-500 mr-2" />
                <span>Rs.{property?.price}</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Location</h2>
            <div className="h-64 rounded-lg overflow-hidden">
              <MapContainer
                center={[property?.latitude, property?.longitude]}
                zoom={15}
                style={{ height: "100%", width: "100%", zIndex: 10 }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[property?.latitude, property?.longitude]}>
                  <Popup>{property?.title}</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Ratings & Reviews</h2>
              <Button onClick={() => setOpen(true)} variant="outline">
                Write a Review
              </Button>
            </div>

            {property?.ratings?.length > 0 ? (
              <div className="space-y-4">
                {property.ratings.map((rating, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={`https://ui-avatars.com/api/?name=${rating.user_name}&background=random`}
                        alt="User"
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">
                          {rating.user_name || "User"}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {moment(rating.date).format("MMMM YYYY")}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <Rating value={rating.rating} readOnly size="sm" />
                      <span className="text-gray-700">{rating.rating}.0</span>
                    </div>
                    <p className="mt-2 text-gray-700">{rating.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:w-1/3">
          <div className="sticky top-4 space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-blue-600">
                  Rs.{property?.price}
                </span>
              </div>
            </div>

            {/* Owner Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Contact Owner</h2>
              <div className="flex items-center gap-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${property?.owner_name}&background=random&size=100`}
                  alt="Owner"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{property?.owner_name}</h3>
                  <p className="text-gray-600">{property?.owner_role}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <FaPhone className="text-gray-500 mr-2" />
                <span>{property?.owner_contact}</span>
              </div>
              <Button
                fullWidth
                variant="outline"
                size="md"
                className="mt-4"
                onClick={() =>
                  (window.location.href = `tel:${property?.owner_contact}`)
                }
              >
                Call Owner
              </Button>
            </div>

            {/* Quick Facts */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Quick Facts</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property ID:</span>
                  <span>{property?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted:</span>
                  <span>
                    {moment(property?.uploaded_at).format("MMM D, YYYY")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={
                      property?.status === "available"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {property?.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Booking Button */}
      {!isScrolled && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 lg:hidden">
          <Button
            onClick={handleBooking}
            fullWidth
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={property?.status === "booked"}
          >
            {property?.status === "booked" ? "Already Booked" : "Book Now"}
          </Button>
        </div>
      )}

      <RatingModal
        open={open}
        setOpen={setOpen}
        propertyId={id}
        id={property?.id}
      />
    </motion.div>
  );
};

export default PropertiesDetails;
