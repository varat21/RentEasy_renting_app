import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Container, Skeleton } from "@mantine/core";
import { motion } from "framer-motion";
import {
  Pagination,
  TextInput,
  Group,
  Text,
  ActionIcon,
  Switch,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import toast from "react-hot-toast";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Popover } from "@mantine/core";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Navigate, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const api = axios.create({
  baseURL: "http://localhost/rent-easy/public/Admin",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const UserDetails = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [error, setError] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Please login first");
    return <Navigate to="/login"/>;
  }

  const fetchUsers = async () => {
    try {
      const response = await api.get("/userDetails.php");
      if (response.data?.success && Array.isArray(response.data.users)) {
        const normalizedUsers = response.data.users.map((user) => ({
          ...user,
          status: user.status === "block" ? "block" : "unblock",
        }));
        setUsers(normalizedUsers);
        console.log("Fetched users:", normalizedUsers);
      } else {
        setError("Unexpected API response structure");
        console.error("Unexpected API response:", response.data);
      }
    } catch (error) {
      setError("Error fetching users: " + error.message);
      console.error("Error fetching users:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBlockToggle = async (userId, currentStatus) => {
    try {
      setUpdatingUserId(userId);
      const newStatus = currentStatus === "unblock" ? "block" : "unblock";
      // console.log(
      //   `Toggling user ${userId} from ${currentStatus} to ${newStatus}`
      // );

      const response = await api.post(`/blockOrUnblockUsers.php?id=${userId}`, {
        status: newStatus,
      });

      // console.log("API Response:", response.data);

      if (response.data?.success) {
        const statusText = newStatus === "unblock" ? "unblocked" : "blocked";
        toast.success(`User ${statusText} successfully`);

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, status: newStatus } : user
          )
        );
      } else {
        throw new Error(response.data?.message || "Failed to update status");
      }
    } catch (error) {
      toast.error(error.message || "Error updating user status");
      console.error("Status update error:", error.response?.data || error);
      fetchUsers();
    } finally {
      setUpdatingUserId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phoneNumber", header: "Phone" },
      { accessorKey: "userType", header: "Role" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const user = row.original;
          const isActive = user.status === "unblock";
          const isUpdating = updatingUserId === user.id;

          return (
            <div className="flex items-center justify-center gap-3">
              <Switch
                checked={isActive}
                onChange={() => handleBlockToggle(user.id, user.status)}
                color={isActive ? "green" : "red"}
                size="md"
                disabled={isUpdating || loading}
                onLabel="ACTIVE"
                offLabel="BLOCKED"
                className="cursor-pointer"
              />
              <span
                className={`text-sm font-medium ${
                  isActive ? "text-green-600" : "text-red-600"
                }`}
              >
                {isActive ? "Active" : "Blocked"}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "is_verified",
        header: "Verified",
        cell: (info) =>
          Number(info.getValue()) === 1 ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
              Verified
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              <span className="h-2 w-2 rounded-full bg-red-500 mr-1.5"></span>
              Unverified
            </span>
          ),
      },
      {
        accessorKey: "created_at",
        header: "Joined",
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      },
      {
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <Group spacing="sm">
            <Popover width={200} position="bottom-end" withArrow shadow="lg">
              <Popover.Target>
                <ActionIcon variant="subtle" radius="md" size="lg">
                  <BsThreeDotsVertical size={18} />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown className="p-3 bg-white shadow-lg rounded-lg border border-gray-300 hover:bg-gray-100 transition duration-200 ease-in-out">
                <Text
                  size="xs"
                  className="text-gray-800 text-sm font-semibold hover:text-blue-600 transition duration-200 cursor-pointer flex items-center justify-center"
                  onClick={() =>
                    navigate(
                      `/navbar/userProfileDetails/${info.row.original.id}`
                    )
                  }
                >
                  <div className="flex items-center gap-4">
                    <FaEye className="text-xl text-black-500" />
                    View Details
                  </div>
                </Text>
              </Popover.Dropdown>
            </Popover>
          </Group>
        ),
      },
    ],
    [loading, navigate, updatingUserId]
  );

  const table = useReactTable({
    data: users,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) {
    return (
      <motion.div
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Skeleton height={40} width="30%" mb="lg" mx="auto" />
        <Skeleton height={40} width="50%" mb="md" />
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[...Array(9)].map((_, index) => (
                  <th key={index} className="px-6 py-3">
                    <Skeleton height={20} width="80%" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(5)].map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {[...Array(9)].map((_, cellIndex) => (
                    <td key={cellIndex} className="px-6 py-4">
                      <Skeleton height={20} width="90%" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-6">
          <Skeleton height={20} width="20%" />
          <Skeleton height={40} width="30%" />
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="flex justify-center items-center min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-red-500 text-lg">{error}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center mb-8">User Details</h1>
      <div className="mb-6">
        <TextInput
          placeholder="Search users by name, email, or phone"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          icon={<IconSearch size={18} />}
          className="w-full md:w-1/2"
        />
      </div>
      <div className="overflow-x-auto">
        {/* divide-y Adds horizontal borders between table rows */}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-6">
        <Text size="sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </Text>
        <Pagination
          page={table.getState().pagination.pageIndex + 1}
          onChange={(page) => table.setPageIndex(page - 1)}
          total={table.getPageCount()}
          color="blue"
        />
      </div>
    </motion.div>
  );
};

export default UserDetails;
