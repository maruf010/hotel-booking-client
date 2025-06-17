import React from 'react';
import Banner from '../components/Banner';
import FeaturedRooms from '../components/FeaturedRooms';
import { Helmet } from 'react-helmet-async';
import ReviewCarousel from '../components/ReviewCarousel';
import VisitModal from '../components/VisitModal';
import ServiceSection from '../components/ServiceSection';
import HotelDetails from '../components/HotelDetails';
import PromotionAdd from '../components/PromotionAdd';


const Home = () => {
    return (
        <>
            <Helmet>
                <title>Hotel Silk City | Home</title>
            </Helmet>
            <div>
                <VisitModal></VisitModal>
                <Banner></Banner>
                <PromotionAdd></PromotionAdd>
                <FeaturedRooms></FeaturedRooms>
                <ReviewCarousel></ReviewCarousel>
                <ServiceSection></ServiceSection>
                <HotelDetails></HotelDetails>
            </div>
        </>
    );
};

export default Home;