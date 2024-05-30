import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Electronics from './components/Electronics';
import Jewelry from './components/Jewelry';
import MensClothing from './components/MensClothing';
import WomensClothing from './components/WomensClothing';
import Cart from './components/Cart';
import "./App.css"

const App = () => {
    const token = useSelector((state) => state.auth.token);

    return (
        <Router>
            {token && <Navbar />}
            <Routes>
                <Route path="/" element={token ? <Navigate to="/products" /> : <Login />} />
                <Route path="/products" element={token ? <Products /> : <Navigate to="/" />} />
                <Route path="/electronics" element={token ? <Electronics /> : <Navigate to="/" />} />
                <Route path="/jewelry" element={token ? <Jewelry /> : <Navigate to="/" />} />
                <Route path="/mens-clothing" element={token ? <MensClothing /> : <Navigate to="/" />} />
                <Route path="/womens-clothing" element={token ? <WomensClothing /> : <Navigate to="/" />} />
                <Route path="/cart" element={token ? <Cart /> : <Navigate to="/" />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
