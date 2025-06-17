import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FaStar } from 'react-icons/fa';

const ReviewCarousel = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_baseurl}/latest-reviews`)
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.error(err));
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1280 },
            items: 3
        },
        desktop: {
            breakpoint: { max: 1280, min: 1024 },
            items: 2
        },
        tablet: {
            breakpoint: { max: 1024, min: 640 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 640, min: 0 },
            items: 1
        }
    };

    return (
        <div className='lg:max-w-11/12 lg:mx-auto mx-3 py-10 overflow-hidden'>
            <h2 className='text-3xl font-bold text-center mb-6'>User Top Reviews</h2>
            <Carousel
                responsive={responsive}
                autoPlay={true}
                infinite={true}
                autoPlaySpeed={2000}
                arrows={false}

                removeArrowOnDeviceType={["tablet", "mobile"]}
            >
                {reviews.map((review, index) => (
                    <div key={index} className=" p-7 rounded-lg m-2 shadow-lg">
                        <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    size={18}
                                    color={i < review.rating ? '#facc15' : '#e5e7eb'}
                                />
                            ))}
                        </div>
                        <p className="italic text-green-600 text-xl">"{review.comment}"</p>
                        <div className='flex gap-3 mt-3'>
                            <div>
                                <img className='h-16 w-16 rounded-full' src={review.photo} alt="soon" />
                            </div>
                            <div>
                                <p className=" text-gray-500 mt-2  text-lg">- {review.user}</p>
                                <p className=" text-gray-400  text-sm">
                                    {new Date(review.timestamp).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ReviewCarousel;
