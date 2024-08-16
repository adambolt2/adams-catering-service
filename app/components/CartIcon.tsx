// app/components/CartIcon.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { useCart } from '../Context/CartContext';

const CartIcon = () => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center justify-center">
      <Link href="/Cart">
        <div className="relative bg-gray-800 text-white rounded-full p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 6h12M16 13l-2 6M9 13l2 6"
            />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 rounded-full bg-red-600 text-white w-6 h-6 text-xs flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CartIcon;
