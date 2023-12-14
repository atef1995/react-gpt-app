// Layout.js
import React from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import BreadcrumbsWrapper from '../components/BreadcrumbWrapper';
// If you have a header component, import it here
// import Header from './Header';

const Layout = ({ children }) => {
    return (
        <React.Fragment className="flex flex-col min-h-screen">
            <Navbar />
            <div className="p-6 md:p-1 lg:p-3 flex flex-col items-center justify-center relative bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 dark:bg-slate-800">
                <BreadcrumbsWrapper />
            </div>
            {/* If you have a header, you can render it here */}
            {/* <Header /> */}
            <main className="flex-grow">{children}</main>
            <Footer />
        </React.Fragment>
    );
};

export default Layout;
