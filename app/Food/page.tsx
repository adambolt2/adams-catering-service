// app/food/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import Modal from '../components/Modal'; // Adjust the path as needed

interface FoodItem {
  id: string;
  foodName: string;
  foodDescription: string;
  allergens: string;
  foodType: string;
  imageUrl: string;
  pricePerPiece: number;
  stockCount: number;
  outofStock: boolean;
}

interface Props {
  searchParams: { [key: string]: string | undefined }; // Type the searchParams prop
}

const FoodPage: FC<Props> = ({ searchParams }) => {
  const foodType = searchParams.type || "Not provided";
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null); // State for selected food item
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const { push } = useRouter(); // Use push method from useRouter

  useEffect(() => {
    const token = sessionStorage.getItem('AdminToken');

    if (!token) {
      push('/404'); // Redirect to the 404 page if token does not exist
    }
  }, [push]);

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const token = sessionStorage.getItem('AdminToken');
        const response = await fetch(`https://localhost:7097/api/foods?foodType=${foodType}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch food items');
        }

        const data: FoodItem[] = await response.json();
        console.log(data);
        setFoodItems(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodData();
  }, [foodType]);

  const handleFoodClick = (food: FoodItem) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFood(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (foodItems.length === 0) return <p>No food items found for {foodType}</p>;

  return (
    <div className='bg-gray-100'>
      <h1 className='mb-10 text-center font text-3xl'>{foodType} Page</h1>
   
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foodItems.map((food) => (
          <div
            key={food.id}
            className="border p-4 rounded-lg shadow-lg cursor-pointer"
            onClick={() => handleFoodClick(food)} // Open modal on click
          >
            <img src={food.imageUrl} alt={food.foodName} className="w-full h-48 object-cover mb-4 rounded-md" />
            <h2 className="text-2xl font-semibold">{food.foodName}</h2>
            <p className="mt-2">{food.foodDescription}</p>
            <p className="mt-2 text-sm text-gray-500">Allergens: {food.allergens}</p>
          </div>
        ))}
      </div>

      {/* Render Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} food={selectedFood} />
    </div>
  );
};

export default FoodPage;
