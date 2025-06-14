import React from 'react';
import HotelMap from './HotelMap';

const HotelDetails = () => {
    const hotel = {
        name: 'Hotel SilkCity',
        lat: 24.36721091446024,
        lng: 88.60077209311325,
    };

    return (
        <div>
            <h2 className='text-xl font-medium text-orange-500'>Hotel Address : </h2>
            <div className='space-y-2'>
                <p>{hotel.name}, New market road, Boalia, Rajshahi</p>
                <HotelMap lat={hotel.lat} lng={hotel.lng} hotelName={hotel.name} />
            </div>
        </div>
    );
};

export default HotelDetails;
