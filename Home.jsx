import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Button,
  Select,
  TextInput,
  NumberInput,
  Pagination,
  Paper,
  Group,
  Badge,
  Divider,
  ActionIcon,
  Popover,
  Menu,
  Text,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaFilter,
  FaTimes,
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaSortAmountDown,
} from "react-icons/fa";
import moment from "moment";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { PropertiesViews } from "../properties/GetPropertiesDetails";

const Home = () => {
  const navigate = useNavigate();

  // State variables
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [tempMinPrice, setTempMinPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const itemsPerPage = 9;

  // Fetch properties from API
  const fetchProperties = async () => {
    try {
      const response = await axios.get(
        "http://localhost/rent-easy/public/getProperties.php"
      );
      if (response.data.success) {
        setProperties(response.data.properties);
        setFilteredProperties(response.data.properties);
      } else {
        setError("Failed to fetch properties");
      }
    } catch (err) {
      setError("Error connecting to the server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...properties];

    // Apply search filter
    if (search) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(search.toLowerCase()) ||
          property.city.toLowerCase().includes(search.toLowerCase()) ||
          property.propertyType.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply city filter
    if (selectedCity && selectedCity !== "All Cities") {
      filtered = filtered.filter((property) => property.city === selectedCity);
    }

    // Apply type filter
    if (selectedType && selectedType !== "All Types") {
      filtered = filtered.filter(
        (property) =>
          property.propertyType.toLowerCase() === selectedType.toLowerCase()
      );
    }

    // Apply price filter
    if (minPrice !== "" && maxPrice !== "") {
      filtered = filtered.filter((property) => {
        const price = parseFloat(property.price.replace(/[^\d.]/g, ""));
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);
        return price >= min && price <= max;
      });
    }

  
    switch (sortBy) {
      case "price_asc":
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^\d.]/g, ""));
          const priceB = parseFloat(b.price.replace(/[^\d.]/g, ""));
          return priceA - priceB;
        });
        break;
      case "price_desc":
        filtered.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^\d.]/g, ""));
          const priceB = parseFloat(b.price.replace(/[^\d.]/g, ""));
          return priceB - priceA;
        });
        break;
      case "date_desc":
        filtered.sort(
          (a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at)
        );
        break;
      case "date_asc":
        filtered.sort(
          (a, b) => new Date(a.uploaded_at) - new Date(b.uploaded_at)
        );
        break;
      default:
        // Default sorting (by most recent)
        filtered.sort(
          (a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at)
        );
    }

    setFilteredProperties(filtered);
    setCurrentPage(1);
  }, [
    search,
    selectedCity,
    selectedType,
    properties,
    minPrice,
    maxPrice,
    dateRange,
    sortBy,
  ]);

  const handlePriceSearch = () => {
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedCity("");
    setSelectedType("");
    setMinPrice("");
    setMaxPrice("");
    setTempMinPrice("");
    setTempMaxPrice("");
    setDateRange([null, null]);
    setSortBy("");
    setFilteredProperties(properties);
  };

 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedProperties = filteredProperties.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const activeFiltersCount = [
    search,
    selectedCity,
    selectedType,
    minPrice,
    maxPrice,
    dateRange[0],
    dateRange[1],
  ].filter(Boolean).length;

  if (loading) {
    return (
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden border border-gray-300"
              >
                <Skeleton height={192} />
                <div className="p-4 space-y-3">
                  <Skeleton width="70%" height={24} />
                  <Skeleton width="50%" height={20} />
                  <Skeleton count={2} />
                  <Skeleton width="40%" height={16} />
                  <Skeleton width="40%" height={16} />
                  <Skeleton width="40%" height={16} />
                  <Skeleton width="20%" height={16} />
                </div>
              </div>
            ))}
          </div>
        </SkeletonTheme>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="flex justify-center items-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-red-500 text-lg">{error}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Banner Section */}
      <div className="relative w-full h-80 mb-8 rounded-lg overflow-hidden shadow-lg">
        <img
          src="/images/bgImage.jpg"
          alt="Property"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center ">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Find Your Dream Property
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore the best properties in your city
          </motion.p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-3 rounded-lg shadow-lg mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaFilter /> Filters
          </h2>
          <Button
            variant="outline"
            onClick={resetFilters}
            leftIcon={<FaTimes />}
            disabled={activeFiltersCount === 0}
          >
            Clear Filters
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <TextInput
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            placeholder="Filter by city"
            value={selectedCity}
            onChange={setSelectedCity}
            data={[
              "All Cities",
              ...new Set(properties.map((prop) => prop.city)),
            ]}
          />
          <Select
            placeholder="Property Type"
            value={selectedType}
            onChange={setSelectedType}
            data={[
              "All Types",
              ...new Set(properties.map((prop) => prop.propertyType)),
            ]}
            withCheckIcon={false}
            style={{ width: "100%" }}
          />
          <div className="flex gap-2 items-end">
            <NumberInput
              placeholder="Min Price"
              value={tempMinPrice}
              onChange={(value) => setTempMinPrice(value)}
              className="flex-1"
              icon={<span className="text-gray-500">Rs</span>}
            />
            <span className="text-gray-500 mx-1"></span>
            <NumberInput
              placeholder="Max Price"
              value={tempMaxPrice}
              onChange={(value) => setTempMaxPrice(value)}
              className="flex-1"
              icon={<span className="text-gray-500">Rs</span>}
            />
            <Button
              onClick={handlePriceSearch}
              leftIcon={<FaSearch />}
              className="h-[36px]"
              variant="filled"
              color="blue"
            >
              Apply Price
            </Button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-600 text-sm">
          Showing{" "}
          <span className="font-semibold">{paginatedProperties.length}</span> of{" "}
          <span className="font-semibold">{filteredProperties.length}</span>{" "}
          properties
        </div>

        {/* Improved Sort Dropdown */}
        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <Button
              variant="outline"
              leftIcon={<FaSortAmountDown size={14} />}
              rightIcon={<FaChevronDown size={12} />}
              size="sm"
            >
              Sort by
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Sort options</Menu.Label>
            <Menu.Item
              onClick={() => setSortBy("date_desc")}
              active={sortBy === "date_desc"}
            >
              Newest First
            </Menu.Item>
            <Menu.Item
              onClick={() => setSortBy("date_asc")}
              active={sortBy === "date_asc"}
            >
              Oldest First
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              onClick={() => setSortBy("price_asc")}
              active={sortBy === "price_asc"}
            >
              Price: Low to High
            </Menu.Item>
            <Menu.Item
              onClick={() => setSortBy("price_desc")}
              active={sortBy === "price_desc"}
            >
              Price: High to Low
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>

      {/* Property Listings */}
      {paginatedProperties.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-2xl font-medium text-gray-600 mb-2">
            No properties found
          </div>
          <p className="text-gray-500 mb-4">
            Try adjusting your search or filters
          </p>
          <Button variant="outline" onClick={resetFilters} size="sm">
            Clear all filters
          </Button>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {paginatedProperties.map((property, index) => (
            <motion.div
              key={property.propertyId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <Paper
                withBorder
                radius="lg"
                className="overflow-hidden h-full flex flex-col cursor-pointer transition-all hover:shadow-md"
                onClick={() => navigate(`/property/${property.propertyId}`)}
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={
                      property.images[0] ||
                      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                    }
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  {property.status && (
                    <Badge
                      color={
                        property.status === "Available" ? "green" : "orange"
                      }
                      variant="filled"
                      className="absolute top-3 right-3"
                    >
                      {property.status}
                    </Badge>
                  )}
                  <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 rounded-full text-sm font-medium">
                    <FaCalendarAlt className="inline mr-1" />
                    {moment(property.uploaded_at).format("MMM D, YYYY")}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {property.title}
                    </h3>
                    <PropertiesViews id={property.propertyId} />
                  </div>

                  <div className="flex items-center text-gray-600 mb-3">
                    <FaMapMarkerAlt className="mr-1 text-sm" />
                    <span className="text-sm">
                      {property.city}, {property.country}
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {property.description}
                  </p>

                  <div className="mt-auto">
                    <Divider className="my-3" />
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xl font-medium text-gray-900">
                          Rs. {property.price}
                        </span>
                        <span className="text-gray-500 text-sm">/month</span>
                      </div>
                      <Button
                        variant="light"
                        color="blue"
                        compact
                        size="sm"
                        rightIcon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        }
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              </Paper>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {filteredProperties.length > itemsPerPage && (
        <div className="flex justify-center mt-10">
          <Pagination
            page={currentPage}
            onChange={handlePageChange}
            total={Math.ceil(filteredProperties.length / itemsPerPage)}
            radius="md"
            size="sm"
            withEdges
            className="shadow-sm"
          />
        </div>
      )}
    </motion.div>
  );
};

export default Home;
