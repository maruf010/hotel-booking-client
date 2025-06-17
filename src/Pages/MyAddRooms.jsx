import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { AuthContext } from '../Contexts/AuthContext';
import { Link } from 'react-router';
import { myAddRoomPromise } from '../Api/myAddRoomPromise';

const MyAddRooms = () => {
    const { user } = useContext(AuthContext);
    console.log(user.email);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            if (!user?.email || !user?.accessToken) return;
            const data = await myAddRoomPromise(user.email, user.accessToken);
            setRooms(data);
        };
        fetchRooms();
    }, [user?.email, user?.accessToken]);


    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${import.meta.env.VITE_baseurl}/rooms/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedRoom) {
                            // Remove from UI
                            setRooms(prev => prev.filter(room => room._id !== id));
                            Swal.fire('Deleted!', 'Room has been deleted.', 'success');
                        }
                    });
            }
        });
    };

    return (
        <>
            <Helmet>
                <title>Hotel Silk City | My Added Rooms</title>
            </Helmet>
            <div className='font-web min-h-screen mx-3 lg:w-11/12 lg:mx-auto space-y-6 my-5'>
                <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">My Added Rooms</h2>
                {rooms?.length === 0 && (
                    <div className="text-center my-5">
                        <p className="mb-3 text-gray-600">You haven't added any rooms yet.</p>
                        <Link to="/addRooms" className="btn btn-primary">Add Room</Link>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {rooms?.map(room => (
                        <div key={room._id} className="bg-base-200 p-4 rounded-lg shadow">
                            <img src={room.image} alt={room.roomType} className="w-full h-40 object-cover rounded mb-3" />
                            <h3 className="text-xl font-semibold mb-1">{room.roomType}</h3>
                            <p className="text-sm text-gray-600 mb-1"><strong>Features:</strong>
                                {
                                    room.features.map((feature, index) => (
                                        <span key={index} className="badge badge-outline mx-1">{feature}</span>
                                    ))}
                            </p>
                            <p className="text-sm text-gray-600 mb-1"><strong>Facilities:</strong>
                                {room.facilities.map((facility, index) => (
                                    <span key={index} className="badge badge-outline mx-1">{facility}</span>
                                ))}
                            </p>
                            <p className="text-sm text-gray-600 mb-3"><strong>Price:</strong> ${room.price}</p>
                            <button onClick={() => handleDelete(room._id)} className="btn btn-error w-full">
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MyAddRooms;
