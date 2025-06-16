import React from "react";
import { FaShieldAlt, FaUserCog, FaLock } from "react-icons/fa";
import { MdCancelScheduleSend } from "react-icons/md";



const ServiceSection = () => {
    const imageUrls = [
        { url: "https://i.ibb.co/k2hYwPjJ/app-banner1-1738819351.jpg" },
        { url: "https://i.ibb.co/k6MSJYgJ/16531216117-0a64a0dfb3-z.jpg" },
        { url: "https://i.ibb.co/Jj5dytBB/Web-oct-17th-enhanced.png" },
        { url: "https://i.ibb.co/b5GjNvWH/social-153147770.jpg" },
    ];

    return (
        <section className="py-16 mx-3 md:px-20">
            <h2 className="text-3xl font-bold text-center my-5">Our Services </h2>
            <div className="grid md:grid-cols-2 gap-10 items-center ">
                {/* Left Side Content */}
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">
                        When You Need Hotel! <br /> We Are <span className="text-green-600">Always Here</span>
                    </h2>
                    <p className="text-gray-500 mb-8">
                        At our company, we are committed to providing excellent customer service, transparent
                        pricing, and 24/7, reliable service. We understand the importance of keeping your rest  and comfortable.
                    </p>

                    {/* Services Grid */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="p-5 border border-orange-300 rounded-lg shadow hover:shadow-lg transition">
                            <FaShieldAlt className="text-2xl text-green-600 mb-2" size={30} />
                            <h4 className="font-semibold mb-1">Booking Service</h4>
                            <p className="text-sm text-gray-500">24/7 offline/online room booking system.</p>
                        </div>
                        <div className="p-5 border border-green-300 rounded-lg shadow hover:shadow-lg transition">
                            <FaUserCog className="text-2xl text-orange-500 mb-2" size={30} />
                            <h4 className="font-semibold mb-1">Customer Service</h4>
                            <p className="text-sm text-gray-500">Support available 24/7 for all bookings.</p>
                        </div>
                        <div className="p-5 border border-green-300 rounded-lg shadow hover:shadow-lg transition">
                            <FaLock className="text-2xl text-orange-500 mb-2" size={30} />
                            <h4 className="font-semibold mb-1">Secured Booking</h4>
                            <p className="text-sm text-gray-500">Secure your rooms with safe payment options.</p>
                        </div>
                        <div className="p-5 border border-orange-300 rounded-lg shadow hover:shadow-lg transition">
                            <MdCancelScheduleSend className="text-2xl text-green-600 mb-2" size={30} />
                            <h4 className="font-semibold mb-1">Flexible Cancellation</h4>
                            <p className="text-sm text-gray-500">Easily cancel or reschedule bookings without hidden charges</p>
                        </div>
                    </div>
                </div>

                {/* Right Side Images Grid - 2x2 */}
                <div className="grid grid-cols-2 gap-4">
                    {imageUrls.map((item, index) => (
                        <div
                            key={index}
                            className={`overflow-hidden rounded-xl shadow-lg ${item.height}`}
                        >
                            <img
                                src={item.url}
                                alt={`Service ${index + 1}`}
                                className="w-full h-56 object-cover transform transition-transform duration-500 hover:scale-110"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceSection;
