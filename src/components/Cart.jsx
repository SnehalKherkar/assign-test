import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';

const Cart = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.items);

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    const totalValue = items.reduce((total, item) => total + item.price, 0);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-lg font-bold mb-4">Cart</h2>
            {items.length === 0 ? (
                <div>Your cart is empty</div>
            ) : (
                <div>
                    <div className="mt-4">
                        <h3 className="text-lg font-bold text-right">Total: ${totalValue.toFixed(2)}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {items.map((item) => (
                            <div key={item.id} className="border p-2 md:p-4 text-center custom-block">
                                <img src={item.image} alt={item.title} className="w-full  md:w-40 h-44 md:h-auto object-cover text-center" />
                                {/* <h2 className="text-lg ">{product.title}</h2> */}
                                <div className='button-block'>
                                    <p>Price:${item.price}</p>
                                    <button
                                        onClick={() => handleRemoveFromCart(item.id)}
                                        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
