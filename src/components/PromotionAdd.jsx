import React from 'react';
import offer from '../assets/offer.gif'
import offer2 from '../assets/offer2.gif'
import { Link } from 'react-router';


const PromotionAdd = () => {
    return (
        <div  className='font-web lg:max-w-11/12 lg:mx-auto mx-3 my-10'>
            <h2 className='text-3xl font-bold  font-web text-center my-5'>Special Offer</h2>
            <div className='md:grid grid-cols-2 gap-5'>
                <div className='relative' data-aos="fade-down-right" data-aos-offset="100">
                    <img className='w-full' src={offer} alt="upcoming" />
                    <Link to='/allRooms'><h2 className='bg-red-400 px-3 py-1 text-white text-center absolute top-3 right-3'>Go to the Room</h2></Link>
                </div>
                <div className='relative mt-5 md:mt-0' data-aos="fade-down-left" data-aos-offset="100">
                    <img className='w-full' src={offer2} alt="upcoming" />
                    <Link to='/allRooms'><h2 className='bg-[#d99866] px-3 py-1 text-white text-center absolute bottom-3 right-3'>Go to the Room</h2></Link>
                </div>
            </div>
        </div>
    );
};

export default PromotionAdd;