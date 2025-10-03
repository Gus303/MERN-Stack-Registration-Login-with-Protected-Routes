import React, { useEffect, useState } from 'react'
import axios from 'axios';


const Categories = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = async () => {
            setLoading(true);
            
            try {
                const response = await axios.get('http://localhost:3000/api/category', {   
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('pos-token')}`,
                    },
                });
                console.log(response.data.categories);
                setCategories(response.data.categories);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
            'http://localhost:3000/api/category/add',
            { categoryName, categoryDescription },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('pos-token')}`,
                },
            }
        );
        if (response.data.success) {
            setCategoryName('');
            setCategoryDescription('');
            alert('Category added successfully!');
            fetchCategories();
        } else {
            console.error('Error adding category:', response.data);
            alert('Error adding category. This category already exist.');
        }
    }catch (error) {
    if (error.response) {
        alert(`Erro: ${error.response.data.message || error.response.statusText}`);
        console.error('Server error:', error.response);
    } else if (error.request) {
        alert('Server error. Verify the backend.');
        console.error('No response:', error.request);
    } else {
        alert('Error.');
        console.error('Erro:', error.message);
    }
}
};

if (loading) return <div>Loading...</div>;

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

            <div className='lg:w-2/3'>
                <div className='bg-gray-600 shadow-md rounded-lg p-4'>
                    <h2 className='text-center text-xl font-bold mb-4 text-white'>Categories</h2>
                    <table className='w-full border-collapse border border-gray-600'>
                        <thead>
                            <tr className='bg-gray-100'>
                                <th className='border border-gray-600 p-2 text-xl'>Number</th>
                                <th className='border border-gray-600 p-2 text-xl'>Category Name</th>
                                <th className='border border-gray-600 p-2 text-xl'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, index) => (
                                <tr key={index}>
                                    <td className='bg-white border border-gray-600 p-2 text-xl'>{index + 1}</td>
                                    <td className='bg-white border border-gray-600 p-2 text-xl'>{category.categoryName}</td>
                                    <td className='bg-white border border-gray-600 p-2 text-xl'>
                                        <button className='bg-blue-800 text-white p-2 rounded-md hover:bg-blue-900 cursor-pointer mr-2'>Edit</button>
                                        <button className='bg-red-800 text-white p-2 rounded-md hover:bg-red-900 cursor-pointer'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Categories
