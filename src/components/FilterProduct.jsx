'use client';
import { useState } from 'react';

const SidebarFilter = ({ onSortChange }) => {
    const [sortOption, setSortOption] = useState('price-low-high');

    const handleSortChange = (event) => {
        const value = event.target.value;
        setSortOption(value);
        onSortChange(value); 
    };

    return (
        <div className="p-4 bg-gray-200 rounded-lg">
            <h1 className="text-xl font-bold mb-2">Filter</h1>
            <h2 className="text-lg font-semibold mb-1">Sort By</h2>
            <select 
                value={sortOption} 
                onChange={handleSortChange} 
            >
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="reviews">Reviews</option>
            </select>
        </div>
    );
};

export default SidebarFilter;
