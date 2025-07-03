// import React, { useEffect, useState } from "react";
// import { useDisclosure } from "@mantine/hooks";
// import axios from "axios";
// import { Tabs, Divider, Skeleton } from "@mantine/core";
// import { Button } from "@mantine/core";
// import { CiUser } from "react-icons/ci";
// import moment from "moment";
// import { useParams } from "react-router-dom";
// import useBookingStore from "../stores/useBookingStore";
// import { Card, Group, Title, Text } from "@mantine/core";
// import { toast } from "react-hot-toast";
// import { HiDotsHorizontal } from "react-icons/hi";
// import { Popover } from "@mantine/core";
// import { AiTwotoneDelete } from "react-icons/ai";
// import {
//   FaMoneyBillAlt,
//   FaRuler,
//   FaMapMarkerAlt,
//   FaRoad,
//   FaCompass,
//   FaCalendarAlt,
// } from "react-icons/fa";
// import ProfileEditModal from "../Pages/ProfileEditModal";
// import DeletePropertiesModal from "../Pages/deleteProfilePropertiesModal";
// import { PropertiesViews } from "../properties/GetPropertiesDetails";

// const UserProfileDetails = () => {
//   const { id } = useParams();
//   const { bookedProperties, removeProperty } = useBookingStore();
//   const [userId, setUserId] = useState(null);
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [opened, { open, close }] = useDisclosure(false);
//   const [properties, setProperties] = useState([]);
//   const [selectedPropertyId, setSelectedPropertyId] = useState(null);
//   const [
//     deleteModalOpened,
//     { open: openDeleteModal, close: closeDeleteModal },
//   ] = useDisclosure(false);

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         // console.log("Fetching profile data...");
//         const response = await axios.get(
//           `http://localhost/rent-easy/public/profile.php?id=${id}`
//         );
//         // console.log("Response:", response);

//         if (response.data.success) {
//           setProfileData(response.data.user);
//           setProperties(response.data.properties || []);
//         } else {
//           console.error("Backend error:", response.data.message);
//         }
//       } catch (err) {
//         console.error("Axios error:", err);
//         if (err.response) {
//           console.error("Response data:", err.response.data);
//           console.error("Response status:", err.response.status);
//           console.error("Response headers:", err.response.headers);
//         } else if (err.request) {
//           console.error("No response received:", err.request);
//         } else {
//           console.error("Error:", err.message);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="bg-white p-6 mt-20">
//         <Tabs
//           color="teal"
//           defaultValue="first"
//           className="mx-auto bg-white shadow-md rounded-xl"
//         >
//           <Tabs.List className="flex justify-center mb-4 border-b border-gray-200">
//             <Skeleton height={40} width="100px" mx="sm" />
//             <Skeleton height={40} width="100px" mx="sm" />
//           </Tabs.List>

//           <Tabs.Panel value="first" pt="xs">
//             <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
//               <div className="text-center mb-6">
//                 <Skeleton circle height={96} width={96} mx="auto" />
//               </div>
//               <div className="space-y-4 text-center">
//                 {[...Array(6)].map((_, index) => (
//                   <div key={index}>
//                     <Skeleton height={16} width="30%" mx="auto" mb={6} />
//                     <Skeleton height={20} width="50%" mx="auto" />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Tabs.Panel>

//           <Tabs.Panel value="second" pt="xs">
//             <div className="p-6 bg-gray-50">
//               <Skeleton height={30} width="20%" mb="md" />
//               <div className="space-y-6">
//                 {[...Array(2)].map((_, index) => (
//                   <Card
//                     key={index}
//                     shadow="sm"
//                     padding="lg"
//                     radius="md"
//                     withBorder
//                     className="bg-white"
//                   >
//                     <div className="flex flex-col md:flex-row gap-6">
//                       <Skeleton height={200} width="25%" radius="md" />
//                       <div className="flex-1">
//                         <div className="flex justify-between">
//                           <Skeleton height={24} width="40%" />
//                           <Skeleton height={24} width={24} />
//                         </div>
//                         <Skeleton height={60} width="100%" mt={10} />
//                         <div className="grid grid-cols-2 md:grid-cols-7 gap-6 mt-6">
//                           {[...Array(7)].map((_, idx) => (
//                             <div
//                               key={idx}
//                               className="bg-white p-5 rounded-lg shadow-md text-center flex flex-col items-center"
//                             >
//                               <Skeleton circle height={24} width={24} mb={10} />
//                               <Skeleton height={16} width="50%" mb={6} />
//                               <Skeleton height={16} width="70%" />
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           </Tabs.Panel>
//         </Tabs>
//       </div>
//     );
//   }

//   if (!profileData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <p className="text-lg font-semibold text-red-500">
//           No profile data found.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white p-6 mt-20">
//       <Tabs
//         color="teal"
//         defaultValue="first"
//         className="mx-auto bg-white shadow-md rounded-xl"
//       >
//         <Tabs.List className="flex justify-center mb-4 border-b border-gray-200">
//           <Tabs.Tab value="first" className="text-lg font-semibold">
//             Profile
//           </Tabs.Tab>
//           <Tabs.Tab value="second" className="text-lg font-semibold">
//             Properties
//           </Tabs.Tab>
//         </Tabs.List>

//         <Tabs.Panel value="first" pt="xs">
//           <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
//             <div className="text-center mb-6">
//               {profileData.image ? (
//                 <img
//                   src={profileData.image}
//                   alt="User Profile"
//                   className="w-24 h-24 mx-auto rounded-full border-2 border-gray-300"
//                 />
//               ) : (
//                 <div className="w-24 h-24 mx-auto rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold">
//                   <img
//                     src={`https://ui-avatars.com/api/?name=${profileData.name}&background=random&size=100`}
//                     alt="Owner"
//                     className="w-16 h-16 rounded-full"
//                   />
//                 </div>
//               )}
//             </div>

//             <div className="space-y-4 text-center">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Name</p>
//                 <p className="text-lg font-semibold text-gray-800 capitalize">
//                   {profileData.name || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Email</p>
//                 <p className="text-lg font-semibold text-gray-800">
//                   {profileData.email || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Phone</p>
//                 <p className="text-lg font-semibold text-gray-800">
//                   {profileData.phoneNumber || "N/A"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Address</p>
//                 <p className="text-lg font-semibold text-gray-800">
//                   {profileData.address}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Gender</p>
//                 <p className="text-lg font-semibold text-gray-800">
//                   {profileData.gender}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-600">User Type</p>
//                 <p className="text-lg font-semibold text-gray-800">
//                   {profileData.userType}
//                 </p>
//               </div>
//               {/* <div>
//                 <Button onClick={open} variant="outline">
//                   Edit Profile
//                 </Button>
//               </div> */}
//             </div>
//           </div>
//         </Tabs.Panel>

//         <Tabs.Panel value="second" pt="xs">
//           <div className="p-6 bg-gray-50 text-center text-gray-700 font-semibold">
//             <div className="mb-8 w-auto">
//               <h3 className="text-xl font-semibold mb-4 text-left">
//                 Added Properties
//               </h3>
//               {properties.length > 0 ? (
//                 properties.map((property) => (
//                   <Card
//                     key={property.id}
//                     shadow="sm"
//                     padding="lg"
//                     radius="md"
//                     withBorder
//                     className="mb-6"
//                   >
//                     <div className="flex flex-col md:flex-row gap-6">
//                       <div className="w-full md:w-1/4">
//                         <img
//                           src={
//                             property.images.length > 0
//                               ? property.images[0]
//                               : "https://via.placeholder.com/400x300?text=No+Image"
//                           }
//                           alt={property.title}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex-col justify-end items-center">
//                           <div className="flex justify-end">
//                             <div className="cursor-pointer">
//                               <Popover
//                                 width={120}
//                                 position="bottom"
//                                 withArrow
//                                 shadow="md"
//                               >
//                                 {/* <Popover.Target>
//                                   <div style={{ cursor: "pointer" }}>
//                                     <HiDotsHorizontal size={24} />
//                                   </div>
//                                 </Popover.Target> */}
//                                 {/* <Popover.Dropdown>
//                                   <div style={{ padding: "8px 0" }}>
//                                     <div
//                                       className="flex justify-between items-center px-2 py-2 cursor-pointer rounded hover:bg-gray-100 font-semibold gap-3"
//                                       onClick={() => {
//                                         setSelectedPropertyId(
//                                           property.propertyId
//                                         );
//                                         openDeleteModal();
//                                       }}
//                                     >
//                                       <AiTwotoneDelete size={24} />
//                                       <Text size="md">Delete</Text>
//                                     </div>
//                                   </div>
//                                 </Popover.Dropdown> */}
//                               </Popover>
//                             </div>
//                           </div>
//                           <Group>
//                             <Title order={3}>{property.title}</Title>
//                           </Group>
//                         </div>
//                         <Text color="dimmed" className="mt-2">
//                           {property.description}
//                         </Text>
//                         <div className="flex justify-center">
//                           <div className="grid grid-cols-2 md:grid-cols-7 gap-6 mt-6 w-full">
//                             {[
//                               {
//                                 label: "Price",
//                                 value: ` ${property.price}`,
//                                 icon: (
//                                   <FaMoneyBillAlt className="text-2xl text-blue-500" />
//                                 ),
//                               },
//                               {
//                                 label: "Size",
//                                 value: `${property.dimension} sqft`,
//                                 icon: (
//                                   <FaRuler className="text-2xl text-green-500" />
//                                 ),
//                               },
//                               {
//                                 label: "Location",
//                                 value: `${property.city}, ${property.country}`,
//                                 icon: (
//                                   <FaMapMarkerAlt className="text-2xl text-red-500" />
//                                 ),
//                               },
//                               {
//                                 label: "Road Type",
//                                 value: property.road_type,
//                                 icon: (
//                                   <FaRoad className="text-2xl text-purple-500" />
//                                 ),
//                               },
//                               {
//                                 label: "Facing",
//                                 value: property.property_face,
//                                 icon: (
//                                   <FaCompass className="text-2xl text-yellow-500" />
//                                 ),
//                               },
//                               {
//                                 label: "Posted on",
//                                 value: moment(property.uploaded_at).format(
//                                   "MMM Do YYYY"
//                                 ),
//                                 icon: (
//                                   <FaCalendarAlt className="text-2xl text-pink-500" />
//                                 ),
//                               },
//                               {
//                                 value: (
//                                   <PropertiesViews id={property.propertyId} />
//                                 ),
//                               },
//                             ].map((detail, index) => (
//                               <div
//                                 key={index}
//                                 className="bg-white p-5 rounded-lg shadow-md text-center flex flex-col items-center"
//                               >
//                                 <div className="mb-2">{detail.icon}</div>
//                                 <p className="text-lg font-semibold text-gray-800">
//                                   {detail.label}
//                                 </p>
//                                 <p className="text-gray-700 text-md mt-1">
//                                   {detail.value}
//                                 </p>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </Card>
//                 ))
//               ) : (
//                 <Text color="dimmed">No properties added yet.</Text>
//               )}
//             </div>
//           </div>
//         </Tabs.Panel>
//       </Tabs>

//       {/* <ProfileEditModal
//         opened={opened}
//         onClose={close}
//         profileData={profileData}
//         setProfileData={setProfileData}
//       /> */}
//       {/* <DeletePropertiesModal
//         opened={deleteModalOpened}
//         onClose={closeDeleteModal}
//         propertyId={selectedPropertyId}
//       /> */}
//     </div>
//   );
// };

// export default UserProfileDetails;



import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { Tabs, Divider, Modal, Button, Group, Title, Badge, Text, Card, Avatar, Grid, Paper, ActionIcon } from "@mantine/core";
import moment from "moment";
import { useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { FaMoneyBillAlt, FaRuler, FaMapMarkerAlt, FaRoad, FaCompass, FaCalendarAlt,  } from "react-icons/fa";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import ProfileEditModal from "../Pages/ProfileEditModal";
import DeletePropertiesModal from "../Pages/deleteProfilePropertiesModal";
import { PropertiesViews } from "../properties/GetPropertiesDetails";

const UserProfileDetails = () => {
  const { id } = useParams();
  const [userId, setUserId] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 5;

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost/rent-easy/public/profile.php?id=${id}`
        );

        if (response.data.success) {
          setProfileData(response.data.user);
          setProperties(response.data.properties || []);
          setFilteredProperties(response.data.properties || []);
        } else {
          toast.error(response.data.message || "Failed to load profile data");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast.error("An error occurred while loading profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id]);

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
    setFilteredProperties(filtered);
    setCurrentPage(1);
  }, [searchTerm, properties]);

  // Pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Skeleton Loader
  const SkeletonLoader = () => (
    <div className="space-y-6">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="animate-pulse bg-white p-6 rounded-xl shadow-md">
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
            src={property.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={property.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{property.title}</h3>
            <div className="flex items-center gap-2">
             
            </div>
          </div>
          <p className="text-gray-600 mb-4">{property.description || 'No description available'}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                label: 'Price',
                value: `Rs. ${property.price}`,
                icon: <FaMoneyBillAlt className="text-blue-500" />,
              },
              {
                label: 'Size',
                value: `${property.dimension} sqft`,
                icon: <FaRuler className="text-blue-500" />,
              },
              {
                label: 'Location',
                value: `${property.city}, ${property.country}`,
                icon: <FaMapMarkerAlt className="text-blue-500" />,
              },
              {
                label: 'Road Type',
                value: property.road_type || 'N/A',
                icon: <FaRoad className="text-blue-500" />,
              },
              {
                label: 'Facing',
                value: property.property_face || 'N/A',
                icon: <FaCompass className="text-blue-500" />,
              },
              {
                label: 'Posted On',
                value: moment(property.uploaded_at).format('MMM D, YYYY'),
                icon: <FaCalendarAlt className="text-blue-500" />,
              },
              {
                label: 'Views',
                value: <PropertiesViews id={property.propertyId} />,
                icon: null,
              },
            ].map((detail, index) => (
              <div key={index} className="flex items-center gap-2">
                {detail.icon}
                <div>
                  <p className="text-sm font-medium text-gray-700">{detail.label}</p>
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
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
        <p className="text-lg font-semibold text-red-500">No profile data found.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-6 mt-20 min-h-[50vh]">
      <Toaster position="top-right" />
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">User Profile</h1>

      <Tabs
        color="teal"
        defaultValue="first"
        className="mx-auto bg-white shadow-md rounded-xl"
      >
        <Tabs.List className="flex justify-center mb-4 border-b border-gray-200">
          <Tabs.Tab value="first" className="text-lg font-semibold">Profile</Tabs.Tab>
          <Tabs.Tab value="second" className="text-lg font-semibold">Properties</Tabs.Tab>
        </Tabs.List>

        {/* Profile Tab */}
        <Tabs.Panel value="first" pt="xs">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto p-6"
          >
            <Paper radius="md" withBorder p="lg" className="bg-white shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <Title order={3} className="text-gray-800">User Profile</Title>
               
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
                <Text size="xl" weight={700} className="mt-4 text-gray-800 capitalize">
                  {profileData.name || "N/A"}
                </Text>
                <Badge color="teal" size="lg" radius="sm" className="mt-2">
                  {profileData.userType || "User"}
                </Badge>
              </div>
              <Grid gutter="md">
                <Grid.Col span={12} sm={6}>
                  <Paper radius="sm" p="md" withBorder className="bg-gray-50">
                    <Text size="sm" color="dimmed" weight={500}>Email</Text>
                    <Text size="md" className="text-gray-800 break-all">
                      {profileData.email || "N/A"}
                    </Text>
                  </Paper>
                </Grid.Col>
                <Grid.Col span={12} sm={6}>
                  <Paper radius="sm" p="md" withBorder className="bg-gray-50">
                    <Text size="sm" color="dimmed" weight={500}>Phone</Text>
                    <Text size="md" className="text-gray-800">
                      {profileData.phoneNumber || "N/A"}
                    </Text>
                  </Paper>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Paper radius="sm" p="md" withBorder className="bg-gray-50">
                    <Text size="sm" color="dimmed" weight={500}>Address</Text>
                    <Text size="md" className="text-gray-800">
                      {profileData.address || "N/A"}
                    </Text>
                  </Paper>
                </Grid.Col>
                <Grid.Col span={12}>
                  <Paper radius="sm" p="md" withBorder className="bg-gray-50 flex items-center justify-between">
                    <div>
                      <Text size="sm" color="dimmed" weight={500}>Account Status</Text>
                      <Text size="md" className="text-gray-800">Active</Text>
                    </div>
                    <Badge color="green" size="lg" radius="sm">Active</Badge>
                  </Paper>
                </Grid.Col>
              </Grid>
            </Paper>
          </motion.div>
        </Tabs.Panel>

        {/* Properties Tab */}
        <Tabs.Panel value="second" pt="xs">
          <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">User Properties</h2>
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
                    <PropertyCard key={property.propertyId} property={property} />
                  ))}
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    paginate={paginate}
                  />
                </div>
              ) : (
                <p className="text-gray-600 text-center py-10">No properties found. Try adjusting your search.</p>
              )}
            </div>
          </div>
        </Tabs.Panel>
      </Tabs>

     
    </div>
  );
};

export default UserProfileDetails;