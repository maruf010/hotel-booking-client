import React from 'react';
import Banner from '../components/Banner';
import FeaturedRooms from '../components/FeaturedRooms';
import { Helmet } from 'react-helmet-async';
import ReviewCarousel from '../components/ReviewCarousel';
import VisitModal from '../components/VisitModal';


const Home = () => {
    return (
        <>
            <Helmet>
                <title>Hotel Silk City | Home</title>
            </Helmet>
            <div>
                <VisitModal></VisitModal>
                <Banner></Banner>
                <FeaturedRooms></FeaturedRooms>
                <ReviewCarousel></ReviewCarousel>
            </div>
        </>
    );
};

export default Home;