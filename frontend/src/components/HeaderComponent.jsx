import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const HeaderComponent = () => {
    return (
        <header className="header">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Main Page</Link>
                    </li>
                    <li style={{color: "black"}}>|</li>
                    <li>
                        <Link to="/bought-flights">Bought Flights</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default HeaderComponent;