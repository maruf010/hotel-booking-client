import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';

const Root = () => {
    return (
        <div>
            <div className='sticky top-0 z-50'>
                <Navbar></Navbar>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;