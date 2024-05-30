import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setLoading, setError, setProducts } from '../redux/productsSlice';
import { addToCart } from '../redux/cartSlice';

const Products = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order
    const [sort, setSort] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            dispatch(setLoading(true));
            dispatch(setError(null));
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                dispatch(setProducts(response.data));
            } catch (err) {
                dispatch(setError(err.message));
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchProducts();
    }, [dispatch]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    
    const handleSortChange = (event) => {
        setSort(event.target.value);
    };

    const sortedProducts = [...products].sort((a, b) => {
        if (sort === 'low-to-high') {
            return a.price - b.price;
        } else if (sort === 'high-to-low') {
            return b.price - a.price;
        } else {
            return 0;
        }
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4 mobile-block">
            <div className="flex justify-end mb-4">
                <select value={sort} onChange={handleSortChange} className="border p-2">
                    <option value="">Sort by</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {sortedProducts.map((product) => (
                    <div key={product.id} className="border p-2 md:p-4 text-center custom-block">
                        <img src={product.image} alt={product.title} className="w-full  md:w-40 h-44 md:h-auto object-cover text-center" />
                        {/* <h2 className="text-lg ">{product.title}</h2> */}
                        <div className='button-block'>
                            <p>Price:${product.price}</p>
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
