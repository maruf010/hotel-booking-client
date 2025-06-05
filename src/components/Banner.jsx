import React, { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router';


const Banner = () => {
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time) => {
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
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
                    <div className="container mx-auto">
                        <div className="text-center relative z-10 text-white mt-48 md:mt-52 lg:mt-64">
                            <h1 className=" text-4xl md:text-5xl font-bold leading-none sm:text-6xl "> "🥥 নারিকেল সন্দেশ — ঝটপট ঘরে বানানো সেরা উপহার"
                            </h1>
                            <p className="bangla-font mt-6 mb-8 text-lg sm:mb-12 md:w-1/2 mx-auto">
                                নরম ও মোলায়েম নারকেল আর ক্ষীরের মিশ্রণে তৈরি হয় এই দারুণ সুস্বাদু সন্দেশ।  যেকোনো উৎসব, অতিথি আপ্যায়ন বা ঘরোয়া উপহারের জন্য এটি একেবারে পারফেক্ট!
                            </p>
                            <Link to='/allRooms'>
                                <div className="mx-auto flex justify-center pb-52">
                                    <a onClick={() => {
                                        (prev => !prev)
                                        window.scrollTo({ top: 800, behavior: 'smooth' })
                                    }}
                                        className="px-5 py-3 relative rounded group text-white font-medium inline-block">
                                        <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
                                        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
                                        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
                                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
                                        <span className="relative " >Rooms</span>
                                    </a>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <img className='absolute top-0 left-0 w-screen h-screen object-cover z-0' src="" alt="Coming" />
                        </div>
                    </div>
                </section>
            </SwiperSlide>
            {/* slide 2 */}
            <SwiperSlide>
                <section className="h-full bangla-font px-3">
                    <div className="container mx-auto ">
                        <div className="text-center relative z-10 text-white mt-48 md:mt-52 lg:mt-64">
                            <h1 className="text-4xl md:text-5xl font-bold leading-none sm:text-6xl"> "শাক ভাজি মিক্স — স্বাস্থ্যকর ও উপকারী ডেইলি মিল"
                            </h1>
                            <p className="mt-6 mb-8 text-lg sm:mb-12 md:w-1/2 mx-auto">দিনের প্রায় কোনও সময়েই তৈরি করে পরিবেশন করতে পারবেন এই রঙ-বেরঙের শাক-সরষে ও ভাজি মিশ্রণ, যা সুস্বাদু হওয়ার পাশাপাশি দেহের পুষ্টির চাহিদা পূরণ করে।
                            </p>
                            <Link to='/allRooms'>
                                <div className="mx-auto flex justify-center">
                                    <a onClick={() => {
                                        (prev => !prev)
                                        window.scrollTo({ top: 700, behavior: 'smooth' })
                                    }} className="px-5 py-3 relative rounded group text-white font-medium inline-block">
                                        <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
                                        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
                                        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
                                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
                                        <span className="relative ">Rooms</span>
                                    </a>
                                </div>
                            </Link>

                        </div>
                        <div>
                            <img className='absolute top-0 left-0 w-screen h-screen object-cover z-0' src="" alt="Coming" />
                        </div>
                    </div>
                </section>
            </SwiperSlide>
            {/* slide 3 */}
            <SwiperSlide>
                <section className=" bangla-font">
                    <div className="container mx-auto ">
                        <div className="text-center relative z-10 text-white mt-48 md:mt-52 lg:mt-64">
                            <h1 className="text-4xl md:text-5xl font-bold leading-none sm:text-6xl">🍗 চিকেন রোস্ট — বিয়েবাড়ির স্বাদ এখন ঘরেই"
                            </h1>
                            <p className="mt-6 mb-8 text-lg sm:mb-12 md:w-1/2 mx-auto">সুন্দর করে মসলা মাখানো চিকেন, ঘন গ্রেভিতে রান্না, আর তার সাথে ঘরভর্তি সুগন্ধ — ঠিক যেন বিয়েবাড়ির স্পেশাল চিকেন রোস্ট!
                            </p>
                            <Link to='/allRooms'>
                                <div className="mx-auto flex justify-center">
                                    <a onClick={() => {
                                        (prev => !prev)
                                        window.scrollTo({ top: 700, behavior: 'smooth' })
                                    }} className="px-5 py-3 relative rounded group text-white font-medium inline-block">
                                        <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
                                        <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
                                        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
                                        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
                                        <span className="relative ">Rooms</span>
                                    </a>
                                </div>
                            </Link>
                        </div>
                        <div>
                            <img className='absolute top-0 left-0 w-screen h-screen object-cover z-0' src="" alt="Coming" />
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