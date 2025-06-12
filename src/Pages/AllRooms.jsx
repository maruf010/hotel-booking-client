import React from 'react';
import { useLoaderData } from 'react-router';
import RoomsCard from '../components/RoomsCard';
import { Helmet } from 'react-helmet-async';

const AllRooms = () => {
    const rooms = useLoaderData();
    return (
        <>
            <Helmet>
                <title>Hotel Silk City | All Rooms</title>
            </Helmet>
            <div className='min-h-screen lg:max-w-11/12 lg:mx-auto '>
                <h2 className='text-center text-3xl font-medium my-5'>All Rooms</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-3 lg:mx-auto'>
                    {rooms.map(room => (
                        <RoomsCard key={room._id} room={room} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default AllRooms;