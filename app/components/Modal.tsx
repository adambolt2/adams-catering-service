import React, { FC, useState, useEffect } from 'react';
import { useCart } from '../Context/CartContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  food: {
    id: string;
    foodName: string;
    foodDescription: string;
    allergens: string;
    imageUrl: string;
    pricePerPiece: number;
    stockCount: number;
    outofStock: boolean;
  } | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, food }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      // Reset quantity to 1 whenever the modal opens
      setQuantity(1);
    }
  }, [isOpen]);

  if (!isOpen || !food) return null;

  const handleAddToCart = () => {
    addToCart({
      id: food.id,
      foodName: food.foodName,
      pricePerPiece: food.pricePerPiece,
      quantity, // The quantity selected by the user
    });
    onClose(); // Close the modal after adding to cart
  };

  const handleQuantityChange = (newQuantity: number) => {
    // Ensure the quantity does not exceed stockCount or go below 1
    if (newQuantity > 0 && newQuantity <= food.stockCount) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button className="absolute top-2 right-2" onClick={onClose}>
          &times;
        </button>
        <img
          src={food.imageUrl}
          alt={food.foodName}
          className="w-full h-48 object-cover mb-4 rounded-md"
        />
        <h2 className="text-2xl font-semibold mb-4">{food.foodName}</h2>
        <p className="mb-4">{food.foodDescription}</p>
        <p className="mb-4">Allergens: {food.allergens}</p>
        <p className="mb-4 text-xl">Price per piece: ${food.pricePerPiece.toFixed(2)}</p>

        <div className="flex items-center justify-center mb-4">
          <button
            className="bg-gray-200 px-4 py-2 rounded-l-lg"
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            -
          </button>
          <span className="px-4 py-2 text-xl">{quantity}</span>
          <button
            className="bg-gray-200 px-4 py-2 rounded-r-lg"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= food.stockCount} // Disable if at max stock
          >
            +
          </button>
        </div>

        <div className="text-center mb-4">
          <p>Total: ${(food.pricePerPiece * quantity).toFixed(2)}</p>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
