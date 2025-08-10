import { useContext, useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Contexts/AuthContext';
import Loading from './Loading';
import { MdOutlineAttachMoney } from "react-icons/md";
import { ImCheckboxChecked } from "react-icons/im";
import { MdFeaturedPlayList } from "react-icons/md";


const FeaturedRooms = () => {
    const { loading } = useContext(AuthContext)
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_baseurl}/featured-rooms`)
            .then(res => res.json())
            .then(data => {
                const cleaned = data.map(room => ({
                    _id: room._id,
                    roomType: room.roomType || "Room Type",
                    image: room.image || "https://via.placeholder.com/400x250?text=No+Image",
                    averageRating: Math.round(room.averageRating || 0),
                    reviewCount: room.reviewCount || 0,
                    price: room.price || "N/A",
                    features: room.features || "No features listed",
                    facilities: room.facilities || "No facilities listed"
                }));
                setRooms(cleaned);
            });
    }, []);

    if (loading) {
        return (
            <Loading></Loading>
        );
    }

    return (
        <section className="lg:max-w-11/12 lg:mx-auto mx-3 min-h-screen py-8 font-web">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-900">🌟 Featured <span className='text-orange-500'>Rooms</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {rooms.map((room) => (
                    <div key={room._id} className="bg-base-300 rounded-xl shadow p-4" data-aos="fade-up" data-aos-offset="100">
                        <img
                            src={room.image}
                            alt="soon"
                            className="w-full h-64 object-cover rounded-md mb-4 "
                        />
                        <h3 className="text-xl font-semibold mb-2 text-orange-500">Room Type : {room.roomType}</h3>
                        <div className="text-gray-500 text-sm mb-2 flex items-center gap-2">
                            <div>
                                <MdFeaturedPlayList />
                            </div>
                            <strong>Features:</strong>
                            <div>
                                {
                                    room?.features.slice(0, 3).map((feature, index) => (
                                        <span key={index} className="text-blue-500 badge badge-outline m-1">{feature}</span>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="text-gray-500 text-sm mb-2 flex items-center gap-2">
                            <div>
                                <ImCheckboxChecked />
                            </div>
                            <strong>Facilities:</strong>
                            <div>
                                {
                                    room?.facilities.slice(0, 3).map((facility, index) => (
                                        <span key={index} className="text-blue-500 badge badge-outline m-1">{facility}</span>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="text-gray-500 text-sm mb-2 flex items-center">
                            <div><MdOutlineAttachMoney size={20} /></div>
                            <strong>Price:</strong> {room.price} bdt/night
                        </div>
                        <div className="flex items-center mb-3">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    size={18}
                                    color={i < room.averageRating ? '#ffc107' : '#e4e5e9'}
                                />
                            ))}
                            <span className="ml-2 text-sm text-gray-500">
                                {room.averageRating.toFixed(1)} ★ • {room.reviewCount} {room.reviewCount === 1 ? 'review' : 'reviews'}
                            </span>
                        </div>

                        <button
                            onClick={() => navigate(`/rooms/${room._id}`)}
                            className="btn  text-white border-none bg-blue-900 hover:bg-blue-950 w-full"
                        >
                            Book Now
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedRooms;
