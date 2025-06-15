import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import toast from 'react-hot-toast';
import { FaStar, FaEdit, FaTrash } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import Loading from '../components/Loading';


const RoomDetails = () => {
    const { image, description, roomType, _id, price, features, facilities } = useLoaderData();
    const [reviews, setReviews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [alreadyBooked, setAlreadyBooked] = useState(false);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // State for review editing
    const [editingReview, setEditingReview] = useState(null);
    const [editComment, setEditComment] = useState('');
    const [editRating, setEditRating] = useState(0);

    // State for delete confirmation
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState(null);


    // Fetch room reviews
    const fetchReviews = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_baseurl}/reviews?roomId=${_id}`);
            const data = await res.json();
            setReviews(data.reviews || data);
        } catch (err) {
            console.error('Error fetching reviews:', err);
            toast.error('Failed to load reviews');
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [_id]);

    // Check if this room is already booked
    useEffect(() => {
        const fetchAlreadyBooked = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${import.meta.env.VITE_baseurl}/already-booking?roomId=${_id}`);

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                setAlreadyBooked(data.alreadyBooked);
            } catch (error) {
                console.error('Error checking booking status:', error);
                toast.error('Failed to check room availability');
            } finally {
                setLoading(false);
            }
        };
        fetchAlreadyBooked();
    }, [_id]);

    // Handle booking confirmation
    const handleBooking = async () => {
        if (!selectedDate) {
            toast.error('Please select a booking date.');
            return;
        }

        try {
            const bookingInfo = {
                roomId: _id,
                date: selectedDate,
                price,
                roomType,
                image,
                userEmail: user.email,
            };

            const response = await fetch(`${import.meta.env.VITE_baseurl}/book-room`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                },
                body: JSON.stringify(bookingInfo),
            });

            const result = await response.json();

            if (result.success) {
                setAlreadyBooked(true);
                setShowModal(false);
                toast.success('Room booked successfully!');
                navigate('/myBooking');
            } else {
                toast.error(result.message || 'Booking failed.');
            }
        } catch (error) {
            console.error('Booking error:', error);
            toast.error('Failed to book room');
        }
    };

    // Handle review edit
    const handleEditReview = (review) => {
        setEditingReview(review);
        setEditComment(review.comment);
        setEditRating(review.rating);
    };

    // Handle review update
    const handleUpdateReview = async () => {
        if (!editComment.trim()) {
            toast.error('Please enter a review comment');
            return;
        }
        if (editRating < 1 || editRating > 5) {
            toast.error('Please select a rating (1-5 stars)');
            return;
        }

        try {
            const token = await user.getIdToken();
            const response = await fetch(`${import.meta.env.VITE_baseurl}/reviews/${editingReview._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    comment: editComment,
                    rating: editRating
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to update review');
            }

            toast.success('Review updated successfully');
            setEditingReview(null);
            fetchReviews();
        } catch (error) {
            console.error('Update error:', error);
            toast.error(error.message || 'Failed to update review');
        }
    };

    // Open delete modal
    const confirmDeleteReview = (reviewId) => {
        setReviewToDelete(reviewId);
        setShowDeleteModal(true);
    };

    // Handle review deletion
    const handleDeleteReview = async () => {
        if (!reviewToDelete) return;

        try {
            const token = await user.getIdToken();
            const response = await fetch(`${import.meta.env.VITE_baseurl}/reviews/${reviewToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to delete review');
            }

            toast.success('Review deleted successfully');
            setShowDeleteModal(false);
            setReviewToDelete(null);
            fetchReviews();
        } catch (error) {
            console.error('Delete error:', error);
            toast.error(error.message || 'Failed to delete review');
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <Helmet>
                <title>Hotel Silk City | Room Details</title>
            </Helmet>
            <div className='min-h-screen mx-2 space-y-6 my-5 lg:max-w-11/12 lg:mx-auto'>
                {/* Room Details Section */}
                <div className="flex flex-col md:flex-row shadow-[0px_0px_20px_0px_rgba(211,117,44,0.3),0px_0px_40px_0px_rgba(156,39,176,0.1)]">
                    <div className='flex-1'>
                        <img src={image} className="w-full h-96 object-cover" alt="Room" />
                    </div>
                    <div className="flex-1 p-5 space-y-5 bg-base-200">
                        <h2 className="card-title text-3xl font-bold">
                            {roomType}
                            <div className="badge p-3 text-white bg-orange-500 ml-3">
                                {alreadyBooked ? 'Unavailable' : 'Available'}
                            </div>
                        </h2>
                        <div className="mb-3 text-gray-600 text-lg">
                            <strong>Features:</strong>
                            {features.map((feature, index) => (
                                <span key={index} className="badge badge-outline mx-1">{feature}</span>
                            ))}
                        </div>
                        <div className="mb-3 text-gray-600 text-lg">
                            <strong>Facilities:</strong>
                            {facilities.map((facility, index) => (
                                <span key={index} className="badge badge-outline mx-1">{facility}</span>
                            ))}
                        </div>
                        <p><strong className='text-gray-600'>Description : </strong> {description}</p>
                        <p className='text-2xl'><span className='text-blue-500'>{price}</span> BDT per/night</p>
                        <div>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    if (!user) {
                                        toast.error('You must be logged in to book a room.');
                                        navigate('/login');
                                    } else if (alreadyBooked) {
                                        toast.error('Room Already booked!');
                                    } else {
                                        setShowModal(true);
                                    }
                                }}
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div>
                    <h3 className="text-2xl font-bold my-2">Reviews</h3>
                    {reviews.length === 0 ? (
                        <p className="text-gray-500">No reviews yet for this room.</p>
                    ) : (
                        <ul className="space-y-4">
                            {reviews.map((review) => (
                                <li key={review._id} className="border border-orange-500 p-4 rounded-lg shadow-sm relative group">
                                    {editingReview?._id === review._id ? (
                                        <div className="space-y-4">
                                            <textarea
                                                className="textarea textarea-bordered focus:border-green-500 focus:outline-none w-full"
                                                value={editComment}
                                                onChange={(e) => setEditComment(e.target.value)}
                                                placeholder="Write your review..."
                                                rows={3}
                                            />
                                            <div className="flex items-center mb-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <FaStar
                                                        key={star}
                                                        size={24}
                                                        color={star <= editRating ? '#ffc107' : '#e4e5e9'}
                                                        onClick={() => setEditRating(star)}
                                                        className="cursor-pointer mr-1"
                                                    />
                                                ))}
                                                <span className="ml-2 text-gray-600">{editRating} star{editRating !== 1 ? 's' : ''}</span>
                                            </div>
                                            <div className="flex justify-end space-x-3">
                                                <button
                                                    className="btn btn-outline btn-sm"
                                                    onClick={() => setEditingReview(null)}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={handleUpdateReview}
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-start gap-3 ">
                                                {review.photo && (
                                                    <img
                                                        src={review.photo}
                                                        alt={review.userName || review.user}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                )}
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="font-semibold">{review.userName || review.user}</p>
                                                            <div className="flex items-center mb-1">
                                                                {[1, 2, 3, 4, 5].map((star) => (
                                                                    <FaStar
                                                                        key={star}
                                                                        size={16}
                                                                        color={star <= review.rating ? '#ffc107' : '#e4e5e9'}
                                                                        className="mr-0.5"
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                        {user?.email === review.userEmail && (
                                                            <div className="flex space-x-4">
                                                                <button
                                                                    onClick={() => handleEditReview(review)}
                                                                    className="text-blue-500 hover:text-blue-700"
                                                                    title="Edit review"
                                                                >
                                                                    <FaEdit size={30} />
                                                                </button>
                                                                <button
                                                                    onClick={() => confirmDeleteReview(review._id)}
                                                                    className="text-red-500 hover:text-red-700"
                                                                    title="Delete review"
                                                                >
                                                                    <FaTrash size={25} />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <p className="text-green-500 mt-1">comment : {review.comment}</p>
                                                    <p className="text-sm text-gray-500 mt-2">
                                                        {new Date(review.timestamp).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Booking Modal */}
                {showModal && (
                    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-[#3a3b39] border border-orange-500 rounded-xl p-6 max-w-md w-full mx-4">
                            <h2 className="text-2xl font-semibold mb-4 text-orange-500">Confirm Your Booking</h2>
                            <div className='space-y-3'>
                                <p className='text-green-500 text-xl'><strong className='text-gray-400'>Room Type :</strong> {roomType}</p>
                                <div className="mb-3">
                                    <strong className='text-gray-400'>Features:</strong>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {features.map((feature, index) => (
                                            <span key={index} className="badge badge-outline text-green-500">{feature}</span>
                                        ))}
                                    </div>
                                </div>
                                <p className='text-green-500'><strong className='text-gray-400'>Price:</strong> <span className='text-orange-500'>{price}</span> BDT per night</p>
                            </div>

                            <div className="my-4">
                                <label className="block mb-2 font-medium text-gray-400">Select Booking Date</label>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    className="input input-bordered w-full"
                                    minDate={new Date()}
                                    placeholderText='Select a date'
                                />
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    className="btn border-none hover:bg-red-600 text-white bg-red-500"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleBooking}
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white border border-orange-500 rounded-lg p-6 max-w-md w-full mx-4">
                            <h2 className="text-2xl font-semibold mb-4 text-red-600">Confirm Deletion</h2>
                            <p className="mb-6 text-gray-700">Are you sure you want to delete this review?</p>
                            <div className="flex justify-end space-x-3">
                                <button
                                    className="btn btn-outline bg-gray-700 text-white hover:bg-gray-800"
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setReviewToDelete(null);
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-error text-white"
                                    onClick={handleDeleteReview}
                                >
                                    Delete Review
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default RoomDetails;