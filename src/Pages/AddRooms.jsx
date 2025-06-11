import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Contexts/AuthContext';


const AddRooms = () => {
    const { user } = useContext(AuthContext)
    // const email = user.email
    // console.log(email);

    const navigate = useNavigate();
    const handleAddRecipe = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newRoom = Object.fromEntries(formData.entries())
        // console.log(newRecipe);
        // Add user email from context to newRecipe object
        // newRecipe.email = email;
        // newRecipe.likeCount = 0;
        //send to server
        fetch(`${import.meta.env.VITE_baseurl}/rooms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRoom)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: "Room Added Successfully",
                        icon: "success"
                    });
                    // navigate to home page
                    navigate('/allRooms');

                    // reset the form
                    form.reset();
                }

            })
    };

    return (
        <div className="mx-3 lg:w-11/12 lg:mx-auto min-h-screen">
            <h1 className="text-3xl text-center my-5 font-bold">Add Room now!</h1>
            <form onSubmit={handleAddRecipe}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label">Hotel Name</label>
                        <input name='title' type="text" className="input w-full" placeholder="Hotel Name" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label">Rooms Photo URL</label>
                        <input name='image' type="text" className="input w-full" placeholder="Photo URL" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label">Amenities</label>
                        <input name='amenities' type="text" className="input w-full" placeholder="Amenities" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label">Select Room Type</label>
                        <select name='roomType' type="text" className="input w-full" placeholder="Select Room Type">
                            <option value="Deluxe Double Room">Deluxe Double Room</option>
                            <option value="Standard Single Room">Standard Single Room</option>
                            <option value="Family Suite">Family Suite</option>
                            <option value="Superior King Room">Superior King Room</option>
                            <option value="Executive Suite">Executive Suite</option>
                        </select>
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label">Price per Night</label>
                        <input name='price' type="text" className="input w-full" placeholder="Price per Night" />
                    </fieldset>
                    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box  border p-4">
                        <label className="label">Hotel Location</label>
                        <input name='location' type="text" className="input w-full" placeholder="Hotel Location" />
                    </fieldset>
                </div>
                <input type="submit" className='bg-green-500 text-white btn mt-4 w-full' value="Add Room" />
            </form>
            <Link to='/'>
                <button className="btn btn-primary mt-5 w-full">Back to Home</button>
            </Link>
        </div>
    );
};

export default AddRooms;