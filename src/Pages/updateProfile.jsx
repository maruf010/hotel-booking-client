
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
// import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../Contexts/AuthContext';
import Loading from '../components/Loading';


const UpdateProfile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.displayName || '');
            setPhoto(user.photoURL || '');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ displayName: name, photoURL: photo });
            <Loading></Loading>
            toast.success('Profile updated!');
            navigate('/profile');
        } catch (err) {
            toast.error('Failed to update profile', err);
        }
    };
    return (
        <>
            {/* <Helmet>
                <title>Edit Profile</title>
            </Helmet> */}
            <div className='font-three min-h-screen flex justify-center items-center'>
                <form onSubmit={handleSubmit} className="shadow-[0px_0px_20px_0px_rgba(156,39,176,0.3),0px_0px_40px_0px_rgba(156,39,176,0.1)]  p-6 rounded-xl  w-80 space-y-4">
                    <label className="label">Edit Name :</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Display Name"
                        className="border border-fuchsia-500 p-2 rounded w-full"
                    />
                    <label className="label mt-1">Edit Photo URL :</label>
                    <input
                        type="text"
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                        placeholder="Photo URL"
                        className="border border-fuchsia-500 p-2 rounded w-full"
                    />
                    <button
                        type="submit"
                        className="cursor-pointer bg-fuchsia-500 text-white w-full py-2 rounded hover:bg-fuchsia-600 mt-1 "
                    >
                        Save
                    </button>
                </form>
            </div>
        </>
    );
};

export default UpdateProfile;