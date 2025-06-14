import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';


const Root = () => {
    return (
        <div>
            <ScrollToTop></ScrollToTop>
            <div className='sticky top-0 z-50'>
                <Navbar></Navbar>
            </div>
            <div className=''>
                <Outlet></Outlet>
            </div>
            <div >
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Root;