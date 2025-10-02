import React, { useState } from 'react'
import axios from 'axios';

const Categories = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(
            'http://localhost:3000/api/category/add',
             { categoryName, categoryDescription },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('pos-token')}`,
            },
        }
    );
        if(response.data.success) {
            alert('Category added successfully:');
            setCategoryName('');
            setCategoryDescription('');
        } else {
            console.error('Error adding category:', data);
            alert('Error adding category. Please try again.');
        }
    };
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-8 text-white'>Category Management</h1>
      
        <div className='flex flex-col lg:flex-row gap-4'>
            <div className='lg:w-1/3'>
                <div className='bg-gray-600 p-4 rounded-lg shadow-mb'>
                    <h2 className='text-center text-xl font-bold mb-4 text-white'>Add Category</h2>
                    <form 
                    className='space-y-4'
                    onSubmit={handleSubmit}
                    >
                        <div>
                            <input 
                            type="text" 
                            placeholder='Category Name'
                            className='border w-full p-2 rounded-md text-white'
                            onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </div>
                        <div>
                            <input 
                            type="text" 
                            placeholder='Category Description'
                            className='border w-full p-2 rounded-md text-white'
                            onChange={(e) => setCategoryDescription(e.target.value)}
                            />
                        </div>
                        <button 
                        type='submit'
                        className='w-full rounded-md bg-cyan-600 font-bold text-white p-3 cursor-pointer hover:bg-cyan-700 transition duration-200'
                        >Add Category</button>
                    </form>
                </div>
            </div>

            <div>

            </div>
        </div>
    </div>
  )
}

export default Categories
