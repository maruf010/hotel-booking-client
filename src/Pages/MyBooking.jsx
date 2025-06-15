import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { AuthContext } from '../Contexts/AuthContext';
import { FaCommentDots, FaRegEdit, FaStar } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { myBookingPromise } from '../Api/myBookingApi';
import { Link } from 'react-router';
import { MdCancel, MdTableRows } from "react-icons/md";
import { FaTableCellsLarge } from "react-icons/fa6";
import Loading from '../components/Loading';


const MyBooking = () => {
    const { user, loading } = useContext(AuthContext);
    console.log(user.photoURL);

    const [bookings, setBookings] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [newDate, setNewDate] = useState(null);
    const [reviewModal, setReviewModal] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [viewMode, setViewMode] = useState('table');


    const fetchBookings = async () => {
        const res = await myBookingPromise(user?.email, user?.accessToken);
        setBookings(res);
    };

    useEffect(() => {
        if (user?.email && user?.accessToken) fetchBookings();
    }, [user?.email, user?.accessToken]);

    const handleCancel = async () => {
        const res = await fetch(`${import.meta.env.VITE_baseurl}/cancel-booking/${selectedBooking._id}`, {
            method: 'DELETE',
        });
        const data = await res.json();

        if (data.success) {
            toast.success('Booking cancelled successfully');
            fetchBookings();
        } else {
            toast.error(data.message || 'Failed to cancel booking');
        }
        setShowModal(false);
        setSelectedBooking(null);
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
                } else toast.error('Failed to update booking');
                setShowModal(false);
            });
    };

    const handleReviewSubmit = () => {
        const review = {
            roomId: selectedBooking.roomId,
            user: user.displayName,
            userEmail: user.email,
            photo: user.photoURL,
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



    if (loading) {
        return (
            <Loading></Loading>
        );
    }

    return (
        <>
            <Helmet><title>Hotel Silk City | My Booking</title></Helmet>
            <div className="min-h-screen mx-2 lg:max-w-11/12 lg:mx-auto">
                {/* Toggle Buttons */}
                <div className="flex items-center justify-between my-5">
                    <div className='flex'>
                        <h2 className="text-2xl font-bold text-orange-500">My Bookings</h2>
                    </div>
                    <div className='flex items-center gap-2'>
                        <h2 className='bg-orange-500 text-white p-2 px-3 rounded-r-full '>View Mode</h2>
                        <button
                            className={`p-2 rounded-lg cursor-pointer ${viewMode === 'table' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => setViewMode('table')}
                        >
                            <MdTableRows size={20} />
                        </button>
                        <button
                            className={`p-2 rounded-lg cursor-pointer ${viewMode === 'card' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-black'}`}
                            onClick={() => setViewMode('card')}
                        >
                            <FaTableCellsLarge size={20} />
                        </button>
                    </div>
                </div>


                {bookings.length === 0 ? (
                    <div className="text-center border py-4 rounded-lg">
                        <p className='mb-5'>You have no bookings yet.</p>
                        <Link to='/allRooms'><span className='text-blue-500 border rounded-xl p-2'>Browse Rooms</span></Link>
                    </div>
                ) : viewMode === 'table' ? (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className='md:text-xl'>
                                    <th>Image</th>
                                    <th>Room Type</th>
                                    <th>Booking Date</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, index) => (
                                    <tr key={index} className="hover items-center">
                                        <td>
                                            <img src={booking?.image} alt='img' className="w-16 h-16 md:w-20 md:h-20 object-cover rounded" /></td>
                                        <td className='md:text-xl'>{booking.roomType}</td>
                                        <td className='md:text-xl'>{new Date(booking.date).toDateString()}</td>
                                        <td className='md:text-xl'>{booking.price} BDT</td>
                                        <td className="flex gap-2 flex-wrap lg:mt-5">
                                            <button className="btn btn-warning btn-sm" onClick={() => {
                                                setSelectedBooking(booking);
                                                setModalType('update');
                                                setShowModal(true);
                                            }}>Update</button>
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
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map((booking, index) => (
                            <div key={index} className="border rounded-lg p-4 shadow-md">
                                <img src={booking?.image} alt="Room" className="w-full h-48 object-cover rounded mb-4" />
                                <h3 className="text-xl font-semibold mb-2">{booking.roomType}</h3>
                                <p><strong>Date:</strong> {new Date(booking.date).toDateString()}</p>
                                <p><strong>Price:</strong> {booking.price} BDT</p>
                                <div className="mt-3 flex gap-3 justify-end flex-wrap">
                                    <button className="btn btn-warning btn-sm" onClick={() => {
                                        setSelectedBooking(booking);
                                        setModalType('update');
                                        setShowModal(true);
                                    }}><FaRegEdit size={20} /></button>
                                    <button className="btn btn-error btn-sm" onClick={() => {
                                        setSelectedBooking(booking);
                                        setModalType('cancel');
                                        setShowModal(true);
                                    }}><MdCancel size={20} /></button>
                                    <button className="btn btn-info btn-sm" onClick={() => {
                                        setSelectedBooking(booking);
                                        setReviewModal(true);
                                    }}><FaCommentDots size={20} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Modal delete */}
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
                                    onChange={setNewDate}
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

                {/* Review Modal */}
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
                                            <input type="radio" name="rating" value={current} onClick={() => setRating(current)} className="hidden" />
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
                                className="focus:border-none textarea textarea-bordered w-full"
                                placeholder="Write your review..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            ></textarea>
                            <div className="modal-action">
                                <button className="btn btn-outline" onClick={() => setReviewModal(false)}>Close</button>
                                <button className="btn bg-orange-500 text-white border-none" onClick={handleReviewSubmit}>Submit</button>
                            </div>
                        </div>
                    </dialog>
                )}
            </div>
        </>
    );
};

export default MyBooking;
