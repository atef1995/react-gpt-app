import React from 'react';
// import './NavBar.css';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/q_and_a">Q&A</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
