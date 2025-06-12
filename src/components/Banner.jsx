import React, { useEffect, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router';
import banner1 from '../assets/banner1.jpg'
import banner2 from '../assets/banner2.jpg'
import banner3 from '../assets/banner3.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css';



const Banner = () => {
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time) => {
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    useEffect(() => {
        AOS.init({
            duration: 700,
            once: true,
        });
    }, []);
    return (
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,

            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            onAutoplayTimeLeft={onAutoplayTimeLeft}
            className="mySwiper min-h-screen"
            breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 1 },
                1024: { slidesPerView: 1 },
            }}
        >
            {/* slide 1  */}
            <SwiperSlide>
                <section className=" bangla-font px-3">
                    <div className="flex  mx-auto ">
                        <div className="text-center relative z-10 text-white mt-56 mx-auto">
                            <div data-aos="fade-down-left" data-aos-offset="100" className='bg-white/30 backdrop-blur-sm py-10 rounded-2xl border-2'>
                                <h1 className="text-4xl md:text-5xl font-bold leading-none sm:text-6xl text-orange-500 "> "Coastal Breeze Inn"
                                </h1>
                                <p className="mt-6 lg:mb-0 text-lg sm:mb-12 md:w-1/2 mx-auto ">
                                    Just steps from the beach, this cozy seaside inn features airy rooms, a private terrace, and complimentary breakfast.
                                </p>
                                <Link to='/allRooms'>
                                    <div className="mx-auto flex justify-center mt-3" data-aos="fade-down-right" data-aos-offset="100" >
                                        <div className="px-5 py-3 relative rounded group text-white font-medium inline-block">
                                            <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
                                            <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
                                            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
                                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
                                            <span className="relative ">Rooms</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <img className='absolute top-0 left-0 w-screen h-screen object-cover z-0' src={banner1} alt="Coming" />
                        </div>
                    </div>
                </section>
            </SwiperSlide>
            <SwiperSlide>
                <section className=" bangla-font px-3">
                    <div className="flex  mx-auto ">
                        <div className="text-center relative z-10 text-white mt-56 mx-auto">
                            <div data-aos="fade-down-left" data-aos-offset="100" className='bg-white/30 backdrop-blur-sm py-10 rounded-2xl border-2'>
                                <h1 className="text-4xl md:text-5xl font-bold leading-none sm:text-6xl text-orange-500 "> "Skyline Heights Hotel"
                                </h1>
                                <p className="mt-6 lg:mb-0 text-lg sm:mb-12 md:w-1/2 mx-auto ">
                                    Sleek and contemporary, with skybar cocktails, business-class amenities, and a perfect view of the skyline.
                                </p>
                                <Link to='/allRooms'>
                                    <div className="mx-auto flex justify-center mt-3" data-aos="fade-down-right" data-aos-offset="100" >
                                        <div className="px-5 py-3 relative rounded group text-white font-medium inline-block">
                                            <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
                                            <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
                                            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
                                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
                                            <span className="relative ">Rooms</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <img className='absolute top-0 left-0 w-screen h-screen object-cover z-0' src={banner2} alt="Coming" />
                        </div>
                    </div>
                </section>
            </SwiperSlide>
            <SwiperSlide>
                <section className=" bangla-font px-3">
                    <div className="flex  mx-auto ">
                        <div className="text-center relative z-10 text-white mt-56 mx-auto">
                            <div data-aos="fade-down-left" data-aos-offset="100" className='bg-white/30 backdrop-blur-sm py-10 rounded-2xl border-2'>
                                <h1 className="text-4xl md:text-5xl font-bold leading-none sm:text-6xl text-orange-500 "> "Aurora Lakefront Lodge"
                                </h1>
                                <p className="mt-6 lg:mb-0 text-lg sm:mb-12 md:w-1/2 mx-auto ">
                                    Enjoy serenity by the water with rustic elegance, kayak rentals, and starlit evenings on the private dock.                                </p>
                                <Link to='/allRooms'>
                                    <div className="mx-auto flex justify-center mt-3" data-aos="fade-down-right" data-aos-offset="100" >
                                        <div className="px-5 py-3 relative rounded group text-white font-medium inline-block">
                                            <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
                                            <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
                                            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
                                            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
                                            <span className="relative ">Rooms</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div>
                            <img className='absolute top-0 left-0 w-screen h-screen object-cover z-0' src={banner3} alt="Coming" />
                        </div>
                    </div>
                </section>
            </SwiperSlide>
            <div className="autoplay-progress m-0" slot="container-end ">
                <span className='hidden' ref={progressContent}></span>
            </div>
        </Swiper>
    );
};

export default Banner;