import React, { useState } from "react";
import HotelMap from "./HotelMap";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");

        try {
            const res = await fetch(`${import.meta.env.VITE_baseurl}/api/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (data.success) {
                setStatus("✅ Message sent successfully!");
                setFormData({ name: "", email: "", phone: "", message: "" });
            } else {
                setStatus("❌ Failed to send message");
            }
        } catch (err) {
            console.error(err);
            setStatus("❌ Something went wrong");
        }
    };

    const hotel = {
        name: 'Hotel SilkCity',
        lat: 24.36721091446024,
        lng: 88.60077209311325,
    };

    return (
        <div className="min-h-screen  flex justify-center items-center py-8 px-3 lg:w-11/12 lg:mx-auto">
            <div className=" w-full  shadow border border-gray-200 rounded-lg p-5 lg:p-10">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mt-2">CONTACT US</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-sm font-semibold tracking-wider mb-6">
                            ONLINE INQUIRY
                        </h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full border border-gray-300 rounded-md p-3"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full border border-gray-300 rounded-md p-3"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                className="w-full border border-gray-300 rounded-md p-3"
                            />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Message"
                                rows="4"
                                className="w-full border border-gray-300 rounded-md p-3"
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition"
                            >
                                Send Message
                            </button>
                        </form>
                        {status && <p className="mt-4 text-center">{status}</p>}
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold tracking-wider text-gray-500 mb-6">
                            CONTACT DETAILS
                        </h2>
                        <div className='mt-4 md:mt-0' data-aos="fade-down-left" data-aos-offset="100">
                            <HotelMap lat={hotel.lat} lng={hotel.lng} hotelName={hotel.name} />
                        </div>
                        <div className=" text-gray-700 grid grid-cols-2 xl:grid-cols-4 gap-5 mt-5">
                            <div>
                                <h3 className="font-bold">Rajshahi,Bangladesh</h3>
                                <p>233 North Avenue E.<br />Ranibazar, RH 07090</p>
                            </div>
                            <div>
                                <h3 className="font-bold">Summit</h3>
                                <p>357 Purbachal Ave.<br />300 feet, DH 07901</p>
                            </div>
                            <div>
                                <h3 className="font-bold">Silkcity Office</h3>
                                <p>549 Gulshan Ave.<br />Main Badda, DH 07078</p>
                            </div>
                            <div>
                                <a href="#" className="text-blue-500 hover:underline">
                                    hotel.info@gmail.com
                                </a>
                                <br />
                                <span>(+880) 1300-100000</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactUs;
