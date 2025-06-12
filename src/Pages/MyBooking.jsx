import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { AuthContext } from '../Contexts/AuthContext';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';

const MyBooking = () => {

    const { user } = useContext(AuthContext);

    const [bookings, setBookings] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [newDate, setNewDate] = useState(null);
    const [reviewModal, setReviewModal] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);


    const fetchBookings = () => {
        fetch(`${import.meta.env.VITE_baseurl}/my-bookings?userEmail=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBookings(data);
            })
    };

    useEffect(() => {
        if (user?.email) fetchBookings();
    }, [user?.email]);


    const handleCancel = () => {
        fetch(`${import.meta.env.VITE_baseurl}/cancel-booking/${selectedBooking._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast.success('Booking cancelled');
                    fetchBookings();
                } else {
                    toast.error('Failed to cancel booking');
                }
                setShowModal(false);
            });
    };


    const handleUpdate = () => {
        fetch(`${import.meta.env.VITE_baseurl}/update-booking/${selectedBooking._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: newDate })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast.success('Booking date updated');
                    fetchBookings();
                } else {
                    toast.error('Failed to update booking');
                }
                setShowModal(false);
            });
    };

    const handleReviewSubmit = () => {
        const review = {
            roomId: selectedBooking.roomId,
            user: user.displayName,
            rating,
            comment: reviewText,
            timestamp: new Date()
        };
        fetch(`${import.meta.env.VITE_baseurl}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(() => {
                toast.success('Review posted');
                setReviewModal(false);
            });
    };


    return (
        <>
            <Helmet>
                <title>Hotel Silk City | My Booking</title>
            </Helmet>
            <div className="min-h-screen lg:max-w-11/12 mx-auto p-4">
                <h2 className="text-2xl font-bold mb-6 text-center">My Bookings</h2>
                {bookings.length === 0 ? (
                    <div className="text-center border py-4 rounded-lg bg-gray-100">
                        <p className='mb-5'>You have no bookings yet.</p>
                        <Link to='/allRooms' >
                            <span className='text-blue-500 border rounded-xl p-2'>Browse Rooms</span>
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Room Type</th>
                                    <th>Booking Date</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, index) => (
                                    <tr key={index} className="hover">
                                        <td><img src={booking?.image} alt='coming soon' className="w-16 h-16 object-cover rounded" /></td>
                                        <td>{booking.roomType}</td>
                                        <td>{new Date(booking.date).toDateString()}</td>
                                        <td>{booking.price} BDT</td>
                                        <td className="flex gap-2">
                                            <button className="btn btn-warning btn-sm" onClick={() => {
                                                setSelectedBooking(booking);
                                                setModalType('update');
                                                setShowModal(true);
                                            }}>Update Date</button>
                                            <button className="btn btn-error btn-sm" onClick={() => {
                                                setSelectedBooking(booking);
                                                setModalType('cancel');
                                                setShowModal(true);
                                            }}>Cancel</button>
                                            <button className="btn btn-info btn-sm" onClick={() => {
                                                setSelectedBooking(booking);
                                                setReviewModal(true);
                                            }}>Review</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {/* update date */}
                {showModal && (
                    <dialog className="modal modal-open">
                        <div className="bg-base-100 border border-orange-400 p-5 rounded-2xl lg:w-1/3">
                            <h3 className="font-bold text-xl mb-4 text-orange-500">
                                {modalType === 'cancel' ? 'Confirm Cancellation' : 'Update Booking Date'}
                            </h3>
                            {modalType === 'update' && (
                                <DatePicker
                                placeholderText='Select a new date'
                                    selected={newDate}
                                    onChange={(date) => setNewDate(date)}
                                    minDate={new Date()}
                                    className="input input-bordered w-full"
                                />
                            )}
                            <div className="modal-action">
                                <button className="btn btn-outline" onClick={() => setShowModal(false)}>Close</button>
                                {modalType === 'cancel' ? (
                                    <button className="btn btn-error" onClick={handleCancel}>Confirm Cancel</button>
                                ) : (
                                    <button className="btn btn-success" onClick={handleUpdate}>Update</button>
                                )}
                            </div>
                        </div>
                    </dialog>
                )}
                {/* rating modal */}
                {reviewModal && (
                    <dialog className="modal modal-open">
                        <div className="modal-box border border-orange-500">
                            <h3 className="font-bold text-xl mb-4  text-orange-500">Give Your Review</h3>
                            <p className="mb-2 font-medium text-lg">User: <span className='text-blue-500'>{user.displayName}</span></p>
                            <div className="flex mb-3">
                                {[...Array(5)].map((_, index) => {
                                    const current = index + 1;
                                    return (
                                        <label key={index}>
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={current}
                                                onClick={() => setRating(current)}
                                                className="hidden"
                                            />
                                            <FaStar
                                                size={24}
                                                className="cursor-pointer"
                                                color={current <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                                                onMouseEnter={() => setHover(current)}
                                                onMouseLeave={() => setHover(null)}
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                placeholder="Write your review..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            ></textarea>
                            <div className="modal-action">
                                <button className="btn btn-outline text-orange-500 border border-orange-500" onClick={() => setReviewModal(false)}>Close</button>
                                <button className="btn btn-primary" onClick={handleReviewSubmit}>Submit</button>
                            </div>
                        </div>
                    </dialog>
                )}
            </div>
        </>
    );
};

export default MyBooking;