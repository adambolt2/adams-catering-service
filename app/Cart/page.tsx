// app/cart/page.tsx
'use client';
import React, { useEffect } from 'react';
import { useCart } from '../Context/CartContext';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  // Calculate the total price
  const { push } = useRouter(); // Use push method from useRouter

  useEffect(() => {
    const token = sessionStorage.getItem('AdminToken');

    if (!token) {
      push('/404'); // Redirect to the 404 page if token does not exist
    }
  }, [push]);

  
  const totalPrice = cartItems.reduce((total, item) => total + item.pricePerPiece * item.quantity, 0);

  const handleCheckout = () => {
    // Implement checkout logic here
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-3xl mb-6">Shopping Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-3xl mb-6 text-center font-semibold">Shopping Cart</h1>
      <ul className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between items-center py-4">
            <div className="flex-1">
              <h2 className="text-xl font-medium">{item.foodName}</h2>
              <p className="text-gray-600">${item.pricePerPiece.toFixed(2)} x {item.quantity}</p>
            </div>
            <button
              className="text-red-500 hover:text-red-700 font-semibold"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between items-center font-semibold text-xl">
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div className="mt-6 flex justify-between">
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
        <button
          className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition-colors"
          onClick={clearCart}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartPage;
