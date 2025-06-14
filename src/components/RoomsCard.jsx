import React from 'react';
import { Link } from 'react-router';

const RoomsCard = ({ room }) => {
    const { price, image, roomType, _id, features, facilities } = room;

    return (
        <div className="card bg-base-100 shadow-[0px_0px_20px_0px_rgba(211,117,44,0.3),0px_0px_40px_0px_rgba(156,39,176,0.1)] rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link to={`/rooms/${_id}`}>
                <figure>
                    <img
                        src={image}
                        className="w-full h-64 object-cover"
                        alt="Room"
                    />
                </figure>
                <div className="flex flex-col p-5 space-y-3">
                    <div className='h-32'>
                        <h2 className="card-title text-lg">
                            Room Type: <span className='text-orange-500'>{roomType}</span>
                        </h2>

                        <div className="text-gray-600 text-sm mb-1">
                            <strong>Features:</strong>
                            {
                                features.slice(0, 3).map((feature, index) => (
                                    <span key={index} className="text-blue-500 badge badge-outline m-1">{feature}</span>
                                ))
                            }
                        </div>

                        <div className="text-gray-600 text-sm mb-1">
                            <strong>Facilities:</strong>
                            {
                                facilities.slice(0, 2).map((facility, index) => (
                                    <span key={index} className="text-blue-500 badge badge-outline m-1">{facility}</span>
                                ))
                            }
                        </div>

                        <p>Price per Night : <span className='text-blue-500'>{price}</span> BDT</p>
                    </div>

                    <div>
                        <button className="btn bg-orange-500 text-white border-none hover:bg-orange-600">Show More</button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default RoomsCard;
