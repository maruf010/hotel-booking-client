import React from 'react';
import Banner from '../components/Banner';
import HotelDetails from '../components/HotelDetails';
import FeaturedRooms from '../components/FeaturedRooms';
import { Helmet } from 'react-helmet-async';
import HomeReviews from '../components/HomeReviews';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Hotel Silk City | Home</title>
            </Helmet>
            <div>
                <Banner></Banner>
                <FeaturedRooms></FeaturedRooms>
                <HomeReviews></HomeReviews>
                <HotelDetails></HotelDetails>
            </div>
        </>
    );
};

export default Home;