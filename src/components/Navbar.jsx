import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="custom-nav p-4 text-white relative">
            <div className="flex justify-end items-center">
                <button className="text-white focus:outline-none lg:hidden" onClick={() => setIsOpen(!isOpen)}>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
                <div className={`nav-check absolute top-full left-0 w-full lg:w-auto lg:relative lg:flex lg:items-centerlg:px-2 lg:mt-0 ${isOpen ? 'block' : 'hidden'}`}>
                    <div className="flex flex-col lg:flex-row px-4 link-block">
                        <Link to="/products" className="block lg:inline-block text-white lg:mt-0">Products</Link>
                        <Link to="/electronics" className="block lg:inline-block text-white lg:mt-0">Electronics</Link>
                        <Link to="/jewelry" className="block lg:inline-block text-white lg:mt-0">Jewelry</Link>
                        <Link to="/mens-clothing" className="block lg:inline-block text-white lg:mt-0">Men's Clothing</Link>
                        <Link to="/womens-clothing" className="block lg:inline-block text-white lg:mt-0">Women's Clothing</Link>
                    </div>
                    <div className="flex flex-col lg:flex-row btn-block">
                        <Link to="/cart" className="block lg:inline-block text-white lg:mt-0 mr-2">Cart ({cartCount})</Link>
                        <button onClick={handleLogout} className="bg-red-500 px-2 py-2 mr-2 rounded mt-2 lg:mt-0 logout-btn">Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
