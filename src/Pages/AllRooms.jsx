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
    const { loading } = useContext(AuthContext);
    const [rooms, setRooms] = useState([]);
    const [selectedRange, setSelectedRange] = useState(priceRanges[0]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const roomsPerPage = 4;

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                let url = `${import.meta.env.VITE_baseurl}/rooms`;

                if (selectedRange.min !== null && selectedRange.max !== null) {
                    url += `?minPrice=${selectedRange.min}&maxPrice=${selectedRange.max}`;
                }

                const response = await fetch(url);
                const data = await response.json();
                setRooms(data);
                setCurrentPage(1); // Reset to first page when filter changes
            } catch (error) {
                console.error('Failed to fetch rooms:', error);
            }
        };

        fetchRooms();
    }, [selectedRange]);

    if (loading) return <Loading />;

    // 🧠 Filter by roomType (search input)
    const filteredRooms = rooms.filter(room =>
        room.roomType?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 🧠 Pagination logic (after filtering)
    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
    const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    return (
        <>
            <Helmet>
                <title>Hotel Silk City | All Rooms</title>
            </Helmet>

            <div className="font-web min-h-screen lg:max-w-11/12 lg:mx-auto">
                <h2 className="text-center text-3xl font-medium my-5 text-orange-500">All Rooms</h2>

                {/* 🔍 Search + Filter */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                    {/* RoomType Search */}
                    <div>
                        <input
                        type="text"
                        placeholder="Search by room type..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // reset page on search
                        }}
                        className="input input-bordered w-64 focus:outline-none"
                    />
                    </div>

                    {/* Price Filter Dropdown */}
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

                {/* 🏠 Rooms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-3 lg:mx-auto">
                    {currentRooms.length > 0 ? (
                        currentRooms.map(room => (
                            <RoomsCard key={room._id} room={room} />
                        ))
                    ) : (
                        <p className="text-center col-span-full text-2xl mt-10">No rooms found.</p>
                    )}
                </div>

                {/* 🔢 Pagination */}
                {filteredRooms.length > roomsPerPage && (
                    <div className="flex justify-center mt-8 space-x-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={`px-4 py-2 rounded-md border ${currentPage === i + 1
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-white text-orange-500 border-orange-500 hover:bg-orange-100'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default AllRooms;
