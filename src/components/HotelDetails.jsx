import React from 'react';
import HotelMap from './HotelMap';

const HotelDetails = () => {
    const hotel = {
        name: 'Hotel SilkCity',
        lat: 24.36721091446024,
        lng: 88.60077209311325,
    };

    return (
        <div className='lg:max-w-11/12 lg:mx-auto mx-3 md:flex justify-between gap-4 my-5 lg:my-10 font-web'>
            <div className='flex-1 border p-5 border-orange-400 rounded-xl shadow-xl hover:shadow'>
                <h2 className='text-3xl font-bold text-orange-500'>Contact Us </h2>
                <div className='space-y-4 md:mt-10'>
                    <h2 className='text-xl text-orange-500 font-medium mt-3'><span className='text-blue-500 font-bold'>Hotel</span>SilkCity</h2>
                    <h3 className='text-green-500'><span className='font-bold text-gray-500'>Mail : </span>silkcity@info.com</h3>
                    <h2 className='text-green-500'><span className='font-bold text-gray-500'>Phone : </span>01700-100000</h2>
                    <p className='text-green-500'><span className='font-bold text-gray-500'>Address : </span> {hotel.name}, New market road, Boalia-6000, Rajshahi, Bangladesh</p>
                </div>
            </div>
            <div className='mt-4 md:mt-0'>
                <HotelMap lat={hotel.lat} lng={hotel.lng} hotelName={hotel.name} />
            </div>
        </div>
    );
};

export default HotelDetails;
