import React from "react";

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center py-10 px-4">
            <div className="bg-white w-full max-w-5xl shadow-lg rounded-lg p-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mt-2">CONTACT US</h1>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left Form */}
                    <div>
                        <h2 className="text-sm font-semibold tracking-wider text-gray-500 mb-6">
                            ONLINE INQUIRY
                        </h2>
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Phone"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            />
                            <textarea
                                placeholder="Message"
                                rows="4"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Right Contact Details */}
                    <div>
                        <h2 className="text-sm font-semibold tracking-wider text-gray-500 mb-6">
                            CONTACT DETAILS
                        </h2>
                        <div className="space-y-6 text-gray-700">
                            <p>
                                <a href="mailto:michelle@signaturerealtynj.com" className="text-blue-500 hover:underline">
                                    michelle@signaturerealtynj.com
                                </a>
                                <br />
                                <span>(908) 686-1200</span>
                            </p>

                            <div>
                                <h3 className="font-bold">Westfield</h3>
                                <p>233 North Avenue E.<br />Westfield, NJ 07090</p>
                            </div>

                            <div>
                                <h3 className="font-bold">Summit</h3>
                                <p>357 Springfield Ave.<br />Short Hills, NJ 07901</p>
                            </div>

                            <div>
                                <h3 className="font-bold">Short Hills Office</h3>
                                <p>549 Millburn Ave.<br />Short Hills, NJ 07078</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
