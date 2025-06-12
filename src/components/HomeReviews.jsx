import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const HomeReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_baseurl}/latest-reviews`)
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <section className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-8">User Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review, idx) => (
                    <div key={idx} className="bg-base-200 p-4 rounded-xl shadow">
                        <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    color={i < review.rating ? '#ffc107' : '#e4e5e9'}
                                    size={18}
                                />
                            ))}
                        </div>
                        <p className="text-green-500 italic">"{review.comment}"</p>
                        <p className="text-sm text-gray-400 mt-2">- {review.user}</p>
                        <p className="text-xs text-gray-400">{new Date(review.timestamp).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HomeReviews;
