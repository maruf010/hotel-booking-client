// Example usage in HotelDetails.js
import React from 'react';
import HotelMap from './HotelMap';

const HotelDetails = () => {
    const hotel = {
        name: 'Hotel Serenity',
        lat: 23.6850,
        lng: 90.3563, // New York City
    };

    return (
        <div>
            <h2>{hotel.name}</h2>
            <HotelMap lat={hotel.lat} lng={hotel.lng} hotelName={hotel.name} />
        </div>
    );
};

export default HotelDetails;
