import React from 'react';
import { Breadcrumbs } from "@material-tailwind/react";
import { useLocation, Link } from 'react-router-dom'; // Assuming you're using react-router


const BreadcrumbsWrapper = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);
    const breadcrumbSeparator = (key) => <span key={key} className="mx-1">/</span>;
    return (
        <Breadcrumbs>
            <Link to="/" className="opacity-60 p-1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
            </Link>
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                return (
                    <React.Fragment key={name}>
                        {index > 0 && breadcrumbSeparator(`separator-${index}`)}
                        {isLast ? (
                            <span>{name}</span>
                        ) : (
                            <Link to={routeTo} className="opacity-60">{name}</Link>
                        )}
                    </React.Fragment>
                );
            })}
        </Breadcrumbs>
    );
};

export default BreadcrumbsWrapper;
