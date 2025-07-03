import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, Text, Title, Skeleton, Pagination } from "@mantine/core";
import { FaPhone, FaEnvelope, FaComment, FaCalendarAlt } from "react-icons/fa";
import moment from "moment";

const Message = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of contact messages per page

  const fetchContacts = async () => {
    if (!token) {
      toast.error("Please Login First");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost/rent-easy/public/Admin/AdminContact_us.php",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data && response.data.success) {
        console.log("Fetched contacts:", response.data.data);
        setContacts(response.data.data || []);
      } else {
        setError("No Contact Messages Found");
      }
    } catch (error) {
      console.error("Fetch contacts error:", error);
      setError("An error occurred while fetching contact messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedContacts = contacts.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 w-full">
        <Skeleton height={30} width="20%" mb="md" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(6)].map((_, index) => (
            <Card
              key={index}
              padding="lg"
              radius="md"
              withBorder
              className="bg-white shadow-lg"
            >
              <div className="flex flex-col gap-4">
                <Skeleton height={24} width="40%" />
                <Skeleton height={20} width="80%" mt={10} />
                <div className="space-y-3">
                  <Skeleton height={40} width="100%" />
                  <Skeleton height={40} width="100%" />
                  <Skeleton height={40} width="100%" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 w-full">
      <h3 className="text-xl font-semibold mb-4 text-left">Contact Messages</h3>
      {contacts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {paginatedContacts.map((contact) => (
              <Card
                key={contact.contactId}
                padding="lg"
                radius="md"
                withBorder
                className="bg-white shadow-lg"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Title order={3}>{contact.name}</Title>
                    <div className="flex items-center gap-2">
                      <FaComment className="text-lg text-red-500" />
                      <Text className="text-gray-600">{contact.message}</Text>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                      <FaPhone className="text-lg text-blue-500" />
                      <Text className="text-gray-600 text-sm">
                        {contact.phoneNumber}
                      </Text>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                      <FaEnvelope className="text-lg text-green-500" />
                      <Text className="text-gray-600 text-sm">
                        {contact.email}
                      </Text>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                      <FaCalendarAlt className="text-lg text-purple-500" />
                      <Text className="text-gray-600 text-sm">
                        {moment(contact.created_at).fromNow()}
                      </Text>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <Pagination
              page={currentPage}
              onChange={handlePageChange}
              total={Math.ceil(contacts.length / itemsPerPage)}
              color="blue"
              className="flex items-center gap-2"
            />
          </div>
        </>
      ) : (
        <Text color="dimmed">No contact messages found.</Text>
      )}
    </div>
  );
};

export default Message;
