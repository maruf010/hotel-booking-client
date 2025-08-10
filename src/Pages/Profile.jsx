import React, { useContext } from 'react';
import { Link } from 'react-router';
import { FaRegEdit } from "react-icons/fa";
import { AuthContext } from '../Contexts/AuthContext';
import { Helmet } from 'react-helmet-async';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className="font-des min-h-screen bg-gray-50 flex justify-center items-center py-10 px-3">
                <div className="bg-white shadow-lg rounded-3xl p-6 w-full max-w-md relative overflow-hidden">
                    {/* Decorative Shapes */}
                    <div className="absolute top-0 left-0 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10"></div>
                    <div className="absolute top-10 right-0 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10"></div>

                    {/* Profile Image */}
                    <div className="flex justify-center">
                        <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <img
                                src={user?.photoURL}
                                alt="User"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-500 text-sm">Full name</p>
                        <h2 className="text-xl font-semibold text-gray-800">{user?.displayName}</h2>

                        <p className="text-gray-500 text-sm mt-4">E-mail</p>
                        <h4 className="text-lg font-medium text-gray-800">{user?.email}</h4>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                        <Link
                            to="/updateProfile"
                            className="flex-1 flex justify-center items-center gap-2 border border-gray-300 px-4 py-2 rounded-xl bg-white hover:bg-gray-100 transition"
                        >
                            <FaRegEdit className="text-gray-600" />
                            <span className="text-gray-700 font-medium">Edit profile</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
