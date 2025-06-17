import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Root = () => {

    useEffect(() => {
        AOS.init({
            duration: 700,
            once: true,
        });
    }, []);

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