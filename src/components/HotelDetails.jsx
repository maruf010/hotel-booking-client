import React from 'react';
import HotelMap from './HotelMap';

const HotelDetails = () => {
    const hotel = {
        name: 'Hotel Silk City',
        lat: 24.36721091446024,
        lng: 88.60077209311325,
    };

    return (
        <div>
            <h2 className='text-2xl text-orange-500'>Hotel Address </h2>
            <div className='space-y-2'>
                <h2 className='text-xl font-medium '>{hotel.name}</h2>
                <p>New market road,Boalia, Rajshahi</p>
                <HotelMap lat={hotel.lat} lng={hotel.lng} hotelName={hotel.name} />
            </div>
        </div>
    );
};

export default HotelDetails;
