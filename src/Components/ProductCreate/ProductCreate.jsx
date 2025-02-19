import React, { useEffect, useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import InputComponent from '../Input/InputComponent';
import Button from '../Input/Button';
import SelectionComponent from '../Input/SelectionComponent';
import BaseUrl from '../Constant';

const ProductCreate = () => {
    // State for storing selected image file
    const [image_url, setImage_Url] = useState();
    
    // State for storing fetched product categories
    const [category, setCategory] = useState([]);

    // Product type options (Physical or Digital)
    let type = [{ id: 1, name: "Physical" }, { id: 2, name: "Digital" }];

    // State for handling product description (Rich text editor)
    const [value, setValue] = useState('');

    // State for handling product form data
    const [values, setValues] = useState({
        categoryId: 1,
        qty: 0,
        product_type: true, // Default to Physical
    });

    // Function to create a new product
    const handleCreate = async (image_url) => {
        values.image_url = image_url; // Assign uploaded image URL
        values.description = value; // Assign description content
        const token = localStorage.getItem('token'); // Retrieve token from local storage

        console.log(values, "values");

        try {
            const response = await fetch(`${BaseUrl}/api/create/product`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            alert(data?.message); // Show response message
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    // Function to handle image upload
    const handleUpload = async () => {
        const formData = new FormData();

        if (image_url) {
            formData.append('image_url', image_url); // Append image file
        } else {
            console.error("Image file is missing in the payload");
            return;
        }

        const token = localStorage.getItem('token'); // Retrieve token

        try {
            const response = await fetch(`${BaseUrl}/api/upload/image`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                },
                body: formData,
            });

            const data = await response.json();
            if (data) {
                handleCreate(data.image_url); // Proceed to product creation after image upload
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    // Fetch product categories on component mount
    useEffect(() => {
        const GetCategory = async () => {
            const response = await fetch(`${BaseUrl}/api/get/category`);
            const data = await response.json();
            setCategory(data?.items || []); // Store fetched categories
        };

        GetCategory();
    }, []);

    return (
        <div>
            <div>
                <h1 className='text-3xl font-semibold text-center py-5'>Product Create</h1>

                <div className='max-w-[600px] mx-auto border border-[#c71f66] rounded-lg p-5'>
                    {/* Product form fields */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 pb-14'>
                        
                        {/* Image upload input */}
                        <div className='mt-5 grid col-span-2'>
                            <h1 className='font-semibold py-1'>Select your Product Picture</h1>
                            <input 
                                accept="image/*" 
                                onChange={(e) => { setImage_Url(e.target.files[0]) }} 
                                type='file' 
                            />
                        </div>

                        {/* Input fields for product details */}
                        <InputComponent 
                            onChange={(e) => setValues({ ...values, name: e })} 
                            label={"Product Name"} 
                            placeholder={"Product Name"} 
                        />
                        <SelectionComponent 
                            options={type} 
                            onSelect={(e) => setValues({ ...values, product_type: e?.name })} 
                            label={"Product Type"} 
                        />
                        <InputComponent 
                            onChange={(e) => setValues({ ...values, cost: e })} 
                            label={"Cost Price"} 
                            placeholder={"Cost Price"} 
                            type={"number"} 
                        />
                        <InputComponent 
                            onChange={(e) => setValues({ ...values, price: e })} 
                            label={"Sell Price"} 
                            placeholder={"Sell Price"} 
                            type={"number"} 
                        />
                        <InputComponent 
                            onChange={(e) => setValues({ ...values, standard_price: e })} 
                            label={"Standard Price"} 
                            placeholder={"Standard Price"} 
                            type={"number"} 
                        />
                        <SelectionComponent 
                            options={category} 
                            onSelect={(e) => setValues({ ...values, category: e?.id })} 
                            label={"Product Category"} 
                        />

                        {/* Product description (Rich text editor) */}
                        {/* <div className='my-2 grid col-span-2'>
                            <h1 className='font-semibold py-1'>Description</h1>
                            <ReactQuill theme="snow" value={value} onChange={setValue} />
                        </div> */}
                    </div>

                    {/* Submit button */}
                    <div>
                        <Button onClick={handleUpload} isDisable={false} name={"Create"} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;
