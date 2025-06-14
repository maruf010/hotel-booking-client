import React, { useState, useEffect, useContext } from 'react';
import RoomsCard from '../components/RoomsCard';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../Contexts/AuthContext';
import Loading from '../components/Loading';

const priceRanges = [
    { label: 'All Prices', min: null, max: null },
    { label: '3000 - 5000', min: 3000, max: 5000 },
    { label: '5001 - 8000', min: 5001, max: 8000 },
    { label: '8001 - 12000', min: 8001, max: 12000 },
    { label: '12001 - 15000', min: 12001, max: 15000 },
];

const AllRooms = () => {

    const {loading} = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);
    const [selectedRange, setSelectedRange] = useState(priceRanges[0]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                let url = `${import.meta.env.VITE_baseurl}/rooms`;

                // Append price filters if selectedRange has min and max
                if (selectedRange.min !== null && selectedRange.max !== null) {
                    url += `?minPrice=${selectedRange.min}&maxPrice=${selectedRange.max}`;
                }

                const response = await fetch(url);
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error('Failed to fetch rooms:', error);
            }
        };

        fetchRooms();
    }, [selectedRange]);

    if (loading) {
        return (
            <Loading></Loading>
        );
    }

    return (
        <>
            <Helmet>
                <title>Hotel Silk City | All Rooms</title>
            </Helmet>

            <div className="min-h-screen lg:max-w-11/12 lg:mx-auto">
                <h2 className="text-center text-3xl font-medium my-5 text-orange-500">All Rooms</h2>

                {/* Price Filter Dropdown */}
                <div className="flex justify-center mb-6">
                    <select
                        className="select select-bordered w-48 focus:outline-none"
                        value={selectedRange.label}
                        onChange={(e) => {
                            const range = priceRanges.find(pr => pr.label === e.target.value);
                            setSelectedRange(range);
                        }}
                    >
                        {priceRanges.map((range) => (
                            <option key={range.label} value={range.label}>
                                {range.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Rooms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-3 lg:mx-auto">
                    {rooms.length > 0 ? (
                        rooms.map(room => (
                            <RoomsCard key={room._id} room={room} />
                        ))
                    ) : (
                        <p className="text-center col-span-full text-2xl mt-10">No rooms found in this price range.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default AllRooms;
