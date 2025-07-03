import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';
import { Loader, Trash2 } from 'lucide-react';
import {
  FaMoneyBillAlt,
  FaRuler,
  FaMapMarkerAlt,
  FaRoad,
  FaCompass,
  FaCalendarAlt,
} from 'react-icons/fa';

const BookingHistory = () => {
  const [userId, setUserId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 6;

  // Fetch booking history
  useEffect(() => {
    const fetchBookingHistory = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view booking history');
        toast.error('Please log in to view booking history');
        setLoading(false);
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const extractedUserId = decodedToken?.userId;
        setUserId(extractedUserId);
        const response = await axios.get(
          `http://localhost/rent-easy/public/bookings.php?userId=${extractedUserId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          setBookings(response.data.bookings || []);
          setFilteredBookings(response.data.bookings || []);
        } else {
          setError(response.data.message || 'Failed to load booking history');
          toast.error(response.data.message || 'Failed to load booking history');
        }
      } catch (err) {
        setError('An error occurred while loading booking history');
        toast.error('An error occurred while loading booking history');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, []);

  // Filter bookings
  useEffect(() => {
    let filtered = bookings;
    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.property.location.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== 'all') {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }
    setFilteredBookings(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, bookings]);

  // Pagination
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Delete booking
  const handleDelete = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(
        `http://localhost/rent-easy/public/deleteBooking.php?bookingId=${bookingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setBookings(bookings.filter((booking) => booking.booking_id !== bookingId));
        setFilteredBookings(
          filteredBookings.filter((booking) => booking.booking_id !== bookingId)
        );
        toast.success('Booking deleted successfully');
      } else {
        toast.error(response.data.message || 'Failed to delete booking');
      }
    } catch (err) {
      toast.error('An error occurred while deleting the booking');
    }
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

  // Booking Card
  const BookingCard = ({ booking }) => (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <img
            src={booking.property.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={booking.property.title}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">{booking.property.title}</h3>
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === 'complete'
                    ? 'bg-green-100 text-green-800'
                    : booking.status === 'failed'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-orange-100 text-orange-800'
                }`}
                title="Booking Status: Awaiting confirmation or completion"
              >
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
              <button
                onClick={() => handleDelete(booking.booking_id)}
                className="p-2 text-red-600 hover:text-red-800"
                title="Delete Booking"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            {booking.property.description || 'No description available'}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {[
              {
                label: 'Price',
                value: `Rs. ${booking.property.price}`,
                icon: <FaMoneyBillAlt className="text-blue-500" />,
              },
              {
                label: 'Size',
                value: `${booking.property.dimension}`,
                icon: <FaRuler className="text-blue-500" />,
              },
              {
                label: 'Location',
                value: `${booking.property.location.city}, ${booking.property.location.country}`,
                icon: <FaMapMarkerAlt className="text-blue-500" />,
              },
              {
                label: 'Road Type',
                value: booking.property.road_type || 'N/A',
                icon: <FaRoad className="text-blue-500" />,
              },
              {
                label: 'Facing',
                value: booking.property.property_face || 'N/A',
                icon: <FaCompass className="text-blue-500" />,
              },
              {
                label: 'Booked On',
                value: moment(booking.created_at).format('MMM D, YYYY'),
                icon: <FaCalendarAlt className="text-blue-500" />,
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
          <div className="border-t pt-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Payment Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Payment Status</p>
                <p
                  className={`text-sm font-medium ${
                    booking.payment.payment_status === 'complete'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                  title="Payment Status: Indicates if payment was successful"
                >
                  {booking.payment.payment_status.charAt(0).toUpperCase() +
                    booking.payment.payment_status.slice(1)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Amount</p>
                <p className="text-sm font-medium text-gray-800">Rs. {booking.payment.amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Transaction ID</p>
                <p className="text-sm font-medium text-gray-800">
                  {booking.payment.transaction_id || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="text-sm font-medium text-gray-800">
                  {booking.payment.payment_method || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Pagination
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

  // Retry Button
  const retryFetch = () => {
    setLoading(true);
    setError(null);
    setBookings([]);
    setFilteredBookings([]);
    setCurrentPage(1);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking History</h2>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by property or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="complete">Complete</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Content */}
        {loading ? (
          <SkeletonLoader />
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={retryFetch}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        ) : currentBookings.length > 0 ? (
          <div className="space-y-6">
            {currentBookings.map((booking) => (
              <BookingCard key={booking.booking_id} booking={booking} />
            ))}
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              paginate={paginate}
            />
          </div>
        ) : (
          <p className="text-gray-600 text-center py-10">
            No bookings found. Try adjusting your search or filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;