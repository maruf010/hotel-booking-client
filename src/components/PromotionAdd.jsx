import React from 'react';
import offer from '../assets/offer.gif'
import offer2 from '../assets/offer2.gif'
import { Link } from 'react-router';


const PromotionAdd = () => {
    return (
        <div className='font-web lg:max-w-10/12 lg:mx-auto mx-3 my-10 lg:my-16'>
            <h2 className='text-3xl font-bold  font-web text-center my-5 text-blue-900'>Special <span className='text-orange-500'>Offer</span></h2>
            <div className='md:grid grid-cols-2 gap-5 md:gap-10 max-w-full overflow-hidden'>
                <div className='lg:p-16' data-aos="fade-right" data-aos-offset="100">
                    <img className='w-full lg:h-80' src={offer} alt="upcoming" />
                </div>
                <div className='relative mt-5 md:mt-0 flex justify-center items-center' data-aos="fade-left" data-aos-offset="100">
                    <div>
                        <h2 className='text-4xl font-bold'>VISIT HOTEL SILKCITY WEBSITE
                        </h2>
                        <p className='text-2xl my-5 lg:my-10'>Start by visiting the Hotel Silk City website, where you can explore hotel options, check availability, and disc over amenities—all in just a few clicks. Finding your perfect stay has never been easier!</p>
                        <Link to='/allRooms'>
                            <button className='bg-blue-900 hover:bg-white border hover:text-blue-900 transition px-4 cursor-pointer py-2 text-white'>Go to the Room</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='hidden md:grid grid-cols-2 gap-5 md:gap-10 max-w-full overflow-hidden '>
                <div className='flex justify-center items-center' data-aos="fade-right" data-aos-offset="100">
                    <div>
                        <h2 className='text-4xl font-bold'>EASILY SUBSCRIBE TO HOTEL SILKCITY </h2>
                        <p className='text-2xl my-5 lg:my-10'>Signing up is quick and hassle-free! Simply enter your details to subscribe and unlock exclusive deals, personalized recommendations, and seamless booking experiences. Stay updated with the latest offers and hotel perks effortlessly.</p>
                        <Link to='/allRooms'>
                            <button className='bg-blue-900 hover:bg-white border hover:text-blue-900 transition px-4 cursor-pointer py-2 text-white'>Go to the Room</button>
                        </Link>
                    </div>
                </div>
                <div className='lg:p-16 mt-5 md:mt-0' data-aos="fade-left" data-aos-offset="100">
                    <img className='w-full lg:h-80' src={offer2} alt="upcoming" />
                </div>
            </div>
            <div className='md:hidden  gap-5 md:gap-10 max-w-full overflow-hidden '>
                <div className='lg:p-20 mt-5 md:mt-0' data-aos="fade-left" data-aos-offset="100">
                    <img className='w-full lg:h-80' src={offer2} alt="upcoming" />
                </div>
                <div className='flex justify-center items-center' data-aos="fade-right" data-aos-offset="100">
                    <div>
                        <h2 className='text-4xl font-bold'>EASILY SUBSCRIBE TO HOTEL SILKCITY </h2>
                        <p className='text-2xl my-5 lg:my-10'>Signing up is quick and hassle-free! Simply enter your details to subscribe and unlock exclusive deals, personalized recommendations, and seamless booking experiences. Stay updated with the latest offers and hotel perks effortlessly.</p>
                        <Link to='/allRooms'>
                            <button className='bg-blue-900 hover:bg-white border hover:text-blue-900 transition px-4 cursor-pointer py-2 text-white'>Go to the Room</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromotionAdd;