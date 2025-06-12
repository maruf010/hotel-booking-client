import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const RoomDetails = () => {
    const { image, roomType, _id, price, features, facilities } = useLoaderData();
    const [reviews, setReviews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [alreadyBooked, setAlreadyBooked] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    // Fetch room reviews
    useEffect(() => {
        fetch(`${import.meta.env.VITE_baseurl}/reviews?roomId=${_id}`)
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.error(err));
    }, [_id]);


    // Check if user has already booked this room
    useEffect(() => {
        if (!user?.email) return;
        fetch(`${import.meta.env.VITE_baseurl}/my-booking?roomId=${_id}&userEmail=${user?.email}`)
            .then(res => res.json())
            .then(data => setAlreadyBooked(data.alreadyBooked))
            .catch(err => console.error(err));
    }, [_id, user?.email]);


    const handleBooking = () => {
        if (!selectedDate) {
            toast.error('Please select a booking date.');
            return;
        }


        const bookingInfo = {
            roomId: _id,
            date: selectedDate,
            price,
            roomType,
            image,
            userEmail: user.email,
        };

        fetch(`${import.meta.env.VITE_baseurl}/book-room`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookingInfo),
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setAlreadyBooked(true);
                    setShowModal(false);
                    toast.success('Room booked successfully!');
                    navigate('/myBooking');
                } else {
                    toast.error(data.message || 'Booking failed');
                }
            });
    };

    return (
        <>
            <Helmet>
                <title>Hotel Silk City | Room Details</title>
            </Helmet>
            <div className='min-h-screen mx-3  space-y-6 my-5 lg:max-w-11/12 lg:mx-auto'>
                <div className="flex flex-col md:flex-row  shadow-xl">
                    <div className='flex-1'>
                        <img src={image} className="w-full h-96" alt="Room" />
                    </div>
                    <div className="flex-1 p-5 space-y-5 bg-base-200">
                        <h2 className="card-title text-3xl font-bold">
                            {roomType}
                            <div className="badge badge-secondary">
                                {alreadyBooked ? 'Booked' : 'Available'}
                            </div>
                        </h2>
                        <div className="mb-3 text-gray-600 text-lg ">
                            <strong>Features:</strong>
                            {
                                features.map((feature, index) => (<span key={index} className="badge badge-outline mx-1">{feature}</span>
                                ))
                            }
                        </div>
                        <div className="mb-3 text-gray-600 text-lg">
                            <strong>Facilities:</strong>
                            {
                                facilities.map((facility, index) => (<span key={index} className="badge badge-outline mx-1">{facility}</span>
                                ))
                            }
                        </div>
                        <p className='text-2xl'><span className='text-blue-500'>{price}</span> BDT per/night</p>
                        <div>
                            <button
                                className="btn btn-primary"
                                disabled={alreadyBooked}
                                onClick={() => setShowModal(true)}
                            >
                                {alreadyBooked ? 'Already Booked' : 'Book Now'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div>
                    <h3 className="text-xl font-bold">Reviews</h3>
                    {reviews.length === 0 ? (
                        <p className="text-gray-500">No reviews yet for this room.</p>
                    ) : (
                        <ul className="space-y-2">
                            {reviews.map((review, idx) => (
                                <li key={idx} className="border p-2 rounded shadow-sm">
                                    <p><strong>{review.user}</strong>: {review.comment}</p>
                                    <div className="flex items-center mb-2">
                                        {[...Array(5)].map((_, idx) => (
                                            <FaStar
                                                key={idx}
                                                size={18}
                                                color={idx < review.rating ? '#ffc107' : '#e4e5e9'}
                                            />
                                        ))}
                                    </div>
                                    <p> {review.timestamp}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Booking Modal */}
                {showModal && (
                    <dialog className="modal w-full modal-open ">
                        <div className="mx-5 lg:mx-auto lg:w-8/12 ">
                            <div className='bg-gray-200 dark:text-black rounded-xl p-3 shadow-[0px_0px_20px_0px_rgba(156,39,176,0.3),0px_0px_40px_0px_rgba(156,39,176,0.1)]'>
                                <h2 className="text-2xl font-semibold mb-4">Confirm Your Booking</h2>
                                <div className='md:text-xl space-y-2'>
                                    <p><strong>Room Type:</strong> {roomType}</p>
                                    <p><strong>Price:</strong> {price} BDT</p>
                                </div>

                                <div className="my-3">
                                    <label className="block mb-1">Select Booking Date</label>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(date) => setSelectedDate(date)}
                                        className="input input-bordered w-full"
                                        minDate={new Date()}
                                    />
                                </div>
                                <div className="mt-4 flex justify-end space-x-3">
                                    <button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button className="btn btn-success" onClick={handleBooking}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </dialog>
                )}
            </div>
        </>
    );
};

export default RoomDetails;
