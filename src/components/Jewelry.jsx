import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setLoading, setError, setProducts } from '../redux/productsSlice';
import { addToCart } from '../redux/cartSlice';

const Jewelry = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        const fetchJewelry = async () => {
            dispatch(setLoading(true));
            dispatch(setError(null));
            try {
                const response = await axios.get('https://fakestoreapi.com/products/category/jewelery');
                dispatch(setProducts(response.data));
            } catch (err) {
                dispatch(setError(err.message));
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchJewelry();
    }, [dispatch]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="border p-4">
                        <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
                        <h2 className="text-lg font-bold">{product.title}</h2>
                        <p>${product.price}</p>
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Jewelry;
