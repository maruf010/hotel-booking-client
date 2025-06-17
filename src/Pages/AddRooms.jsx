// import React, { useContext } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { Link, useNavigate } from 'react-router';
// import Swal from 'sweetalert2';
// import { AuthContext } from '../Contexts/AuthContext';
// import toast from 'react-hot-toast';



// const AddRooms = () => {
//     const { user } = useContext(AuthContext);
//     const email = user.email;
//     const navigate = useNavigate();

//     // const handleAddRoom = (e) => {
//     //     e.preventDefault();
//     //     const form = e.target;
//     //     const formData = new FormData(form);
//     //     const newRoom = Object.fromEntries(formData.entries())
//     //     newRoom.email = email;

//     //     const featuresString = newRoom.features.split(',').map(feature => feature.trim());
//     //     const facilitiesString = newRoom.facilities.split(',').map(facility => facility.trim());
//     //     newRoom.features = featuresString;
//     //     newRoom.facilities = facilitiesString;
//     //     newRoom.price = parseFloat(newRoom.price);
//     //     //send to server
//     //     fetch(`${import.meta.env.VITE_baseurl}/rooms`, {
//     //         method: 'POST',
//     //         headers: {
//     //             'Content-Type': 'application/json'
//     //         },
//     //         body: JSON.stringify(newRoom)
//     //     })
//     //         .then(res => res.json())
//     //         .then(data => {
//     //             console.log(data);
//     //             if (data.insertedId) {
//     //                 Swal.fire({
//     //                     title: "Room Added Successfully",
//     //                     icon: "success"
//     //                 });
//     //                 // navigate to home page
//     //                 navigate('/allRooms');
//     //                 // reset the form
//     //                 form.reset();
//     //             }

//     //         })
//     // };

//     const handleAddRoom = async (e) => {
//         e.preventDefault();
//         const form = e.target;
//         const formData = new FormData(form);
//         const newRoom = Object.fromEntries(formData.entries());
//         newRoom.email = email;

//         const featuresString = newRoom.features.split(',').map(feature => feature.trim());
//         const facilitiesString = newRoom.facilities.split(',').map(facility => facility.trim());
//         newRoom.features = featuresString;
//         newRoom.facilities = facilitiesString;
//         newRoom.price = parseFloat(newRoom.price);

//         try {
//             const accessToken = await user.getIdToken(); // 👈 Firebase access token

//             const response = await fetch(`${import.meta.env.VITE_baseurl}/rooms`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${accessToken}` // 👈 Include token in header
//                 },
//                 body: JSON.stringify(newRoom)
//             });

//             const data = await response.json();
//             if (data.insertedId) {
//                 toast.success('Room Added Successfully');
//                 navigate('/allRooms');
//                 form.reset();
//             } else {
//                 Swal.fire({
//                     title: "Error",
//                     text: data.message || "Something went wrong",
//                     icon: "error"
//                 });
//             }
//         } catch (error) {
//             console.error('Add Room Error:', error);
//             Swal.fire({
//                 title: "Error",
//                 text: error.message,
//                 icon: "error"
//             });
//         }
//     };
//     return (
//         <>
//             <Helmet>
//                 <title>Hotel Silk City | Add Room</title>
//             </Helmet>
//             <div className="mx-3 lg:w-11/12 lg:mx-auto min-h-screen">
//                 <h1 className="text-3xl text-center my-5 font-bold">Add Room now!</h1>
//                 <form onSubmit={handleAddRoom}>
//                     <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//                         <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
//                             <label className="label">Select Room Type</label>
//                             <select name='roomType' type="text" className="input w-full" placeholder="Select Room Type" required>
//                                 <option value="Deluxe Double Room">Deluxe Double Room</option>
//                                 <option value="Standard Single Room">Standard Single Room</option>
//                                 <option value="Family Suite">Family Suite</option>
//                                 <option value="Superior King Room">Superior King Room</option>
//                                 <option value="Executive Suite">Executive Suite</option>
//                             </select>
//                         </fieldset>
//                         <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
//                             <label className="label">Rooms Photo URL</label>
//                             <input name='image' type="text" className="input w-full" placeholder="Photo URL" required />
//                         </fieldset>
//                         <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
//                             <label className="label">Room features</label>
//                             <input name='features' type="text" className="input w-full" placeholder="Room features" required />
//                         </fieldset>
//                         <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
//                             <label className="label">Hotel Facilities</label>
//                             <input name='facilities' type="text" className="input w-full" placeholder="Hotel Facilities" required />
//                         </fieldset>
//                         <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
//                             <label className="label">Price per Night</label>
//                             <input name='price' type="text" className="input w-full" placeholder="Price per Night" required />
//                         </fieldset>
//                     </div>
//                     <input type="submit" className='bg-orange-500 text-white btn mt-4 w-full' value="Add Room" />
//                 </form>
//                 <Link to='/'>
//                     <button className="btn btn-primary mt-5 w-full">Back to Home</button>
//                 </Link>
//             </div>
//         </>
//     );
// };

// export default AddRooms;

import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { AuthContext } from '../Contexts/AuthContext';
import { addRoomPromise } from '../Api/addRoomApi';

const AddRooms = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddRoom = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newRoom = Object.fromEntries(formData.entries());

        newRoom.email = user.email;
        newRoom.features = newRoom.features.split(',').map(item => item.trim());
        newRoom.facilities = newRoom.facilities.split(',').map(item => item.trim());
        newRoom.price = parseFloat(newRoom.price);

        try {
            const accessToken = await user.getIdToken();
            const result = await addRoomPromise(newRoom, accessToken);
            console.log(user.accessToken);
            
            if (result.insertedId) {
                toast.success("Room Added Successfully");
                form.reset();
                navigate('/allRooms');
            } else {
                toast.error('Something went wrong!')
            }
        } catch (err) {
            console.error('Error adding room:', err);
            toast.error(err.message || 'Failed to add room')
        }
    };

    return (
        <>
            <Helmet>
                <title>Hotel Silk City | Add Room</title>
            </Helmet>
            <div className="font-web mx-3 lg:w-11/12 lg:mx-auto min-h-screen">
                <h1 className="text-3xl text-center my-5 font-bold text-orange-500">Add Room now!</h1>
                <form onSubmit={handleAddRoom}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <fieldset className="fieldset bg-base-200 border border-orange-500 p-4 rounded-box">
                            <label className="label">Select Room Type</label>
                            <select name="roomType" className="focus:border-green-500 focus:outline-none input w-full" required>
                                <option value="Deluxe Double Room">Deluxe Double Room</option>
                                <option value="Standard Single Room">Standard Single Room</option>
                                <option value="Family Suite">Family Suite</option>
                                <option value="Superior King Room">Superior King Room</option>
                                <option value="Executive Suite">Executive Suite</option>
                            </select>
                        </fieldset>
                        <fieldset className="fieldset bg-base-200 border border-orange-500 p-4 rounded-box">
                            <label className="label">Room Photo URL</label>
                            <input name="image" type="text" className="focus:border-green-500 focus:outline-none input w-full" placeholder="Photo URL" required />
                        </fieldset>
                        <fieldset className="fieldset bg-base-200 border border-orange-500 p-4 rounded-box">
                            <label className="label">Room Features (comma separated)</label>
                            <input name="features" type="text" className="focus:border-green-500 focus:outline-none input w-full" placeholder="e.g., AC, TV, WiFi" required />
                        </fieldset>
                        <fieldset className="fieldset bg-base-200 border border-orange-500 p-4 rounded-box">
                            <label className="label">Hotel Facilities (comma separated)</label>
                            <input name="facilities" type="text" className="focus:border-green-500 focus:outline-none input w-full" placeholder="e.g., Pool, Gym, Spa" required />
                        </fieldset>
                        <fieldset className="fieldset bg-base-200 border border-orange-500 p-4 rounded-box">
                            <label className="label">Price per Night</label>
                            <input name="price" type="number" className="focus:border-green-500 focus:outline-none input w-full" placeholder="Enter price" required />
                        </fieldset>
                        <fieldset className="fieldset bg-base-200 border border-orange-500 p-4 rounded-box">
                            <label className="label">Description</label>
                            <input name="description" type="text" className="focus:border-green-500 focus:outline-none input w-full" placeholder="Enter Room Description" required />
                        </fieldset>
                    </div>
                    <input type="submit" value="Add Room" className="btn bg-orange-500 text-white mt-4 w-full" />
                </form>
                <Link to="/">
                    <button className="btn btn-primary mt-5 w-full">Back to Home</button>
                </Link>
            </div>
        </>
    );
};

export default AddRooms;
