import React from 'react';
import { Link } from 'react-router';

const RoomsCard = ({ room }) => {
    const { title, image, roomType, _id } = room;
    return (
        <div className="card bg-base-100  shadow-sm">
            <Link to={`/rooms/${_id}`}>
                <figure>
                    <img
                        src={image}
                        className="w-full h-64 object-cover"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Room Type: <span>{roomType}</span></h2>
                    <p>Hotel : <span className='text-blue-500'>{title}</span></p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Show More</button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default RoomsCard;