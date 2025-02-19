import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Search from '../Icons/Search';
import BaseUrl from '../Constant';

const Product = () => {
    const [data, setData] = useState([]);  // Stores the displayed data
    const [searchData, setSearchData] = useState([]);  // Stores the original unfiltered data
    const [orderId, setOrderId] = useState(""); // Stores input field value

    // Fetch all products/orders
    const getOrder = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${BaseUrl}/api/get/product/templete`, {
                method: 'GET',
                headers: {
                    "authorization": token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (!response.ok) throw new Error("Failed to fetch data");

            const data = await response.json();
            setData(data.items);
            setSearchData(data.items);  // Save original data for resetting search
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        getOrder();
    }, []);

    // Search function
    const SearchProduct = async (e) => {
        e.preventDefault();
        if (!orderId) {
            setData(searchData); // Reset data if input is empty
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${BaseUrl}/api/product/single/order/${orderId}`, {
                method: 'GET',
                headers: { 'authorization': token },
            });

            if (!response.ok) throw new Error("Failed to fetch search results");

            const data = await response.json();
            setData(data.items);
        } catch (error) {
            console.error("Error searching product:", error);
        }
    };

    return (
        <div className='bg-white relative'>
            {/* Header */}
            <div className='flex justify-between items-center py-3 px-4'>
                <h1 className='font-semibold'>Order</h1>
                <div className='flex justify-start items-center gap-3'>
                    {/* Input Field */}
                    <input 
                        type='number' 
                        placeholder='Enter your order id' 
                        value={orderId} 
                        onChange={(e) => setOrderId(e.target.value)} 
                        className='px-2 py-1 rounded focus:outline-none border' 
                    />
                    {/* Search Button */}
                    <button onClick={SearchProduct} className='border rounded px-4 py-[5px]'>
                        <Search />
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className='w-full overflow-x-auto'>
                <table className="min-w-[1550px] text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='shadow'>
                            <th scope="col" className="pl-4">
                                <div className="flex items-center">
                                    <input 
                                        id="checkbox-all-search" 
                                        type="checkbox" 
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600" 
                                    />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="pl-1 py-3">Product Name</th>
                            <th scope="col" className="px-4 py-3">Category</th>
                            <th scope="col" className="px-4 py-3">Price</th>
                            <th scope="col" className="px-4 py-3">S - Price</th>
                            <th scope="col" className="px-4 py-3">QTy</th>
                            <th scope="col" className="px-4 py-3">Status</th>
                            <th scope="col" className="px-4 py-3">Note</th>
                            <th scope="col" className="px-4 py-3 text-right pr-5">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((product) => <ProductCard key={product?.id} product={product} />)
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center py-4">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Product;
