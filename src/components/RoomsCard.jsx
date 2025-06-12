import React from 'react';
import { Link } from 'react-router';

const RoomsCard = ({ room }) => {
    console.log(room);
    
    const { price, image, roomType, _id, features, facilities } = room;
    return (
        <div className="card bg-base-100  shadow-sm  rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link to={`/rooms/${_id}`}>
                <figure>
                    <img
                        src={image}
                        className="w-full h-64 object-cover"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-xl">Room Type: <span>{roomType}</span></h2>
                    <div className="text-gray-600 text-sm mb-1">
                        <strong>Features:</strong> 
                        {
                            features.map((feature, index) => (
                                <span key={index} className="text-blue-500 badge badge-outline m-1">{feature}</span>
                            ))
                        }
                    </div>
                    <div className="text-gray-600 text-sm mb-1">
                        <strong>Facilities:</strong> 
                        {
                            facilities.map((facility, index) => (
                                <span key={index} className="text-blue-500 badge badge-outline m-1">{facility}</span>
                            ))
                        }
                    </div>
                    <p>Price per Night : <span className='text-blue-500'>{price}</span> bdt</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Show More</button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default RoomsCard;