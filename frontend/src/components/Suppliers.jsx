import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Suppliers = () => {

    const [addModal, setAddModal] = useState(null);
    const [editSupplier, setEditSupplier] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    }

    const [loading, setLoading] = useState(false);
    const [suppliers, setSuppliers] = useState([]);

     const fetchSuppliers = async () => {
            setLoading(true);
            
            try {
                const response = await axios.get('http://localhost:3000/api/supplier', {   
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('pos-token')}`,
                    },
                });
                setSuppliers(response.data.suppliers);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
                setLoading(false);
            }
            finally{
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const handleEdit = (supplier) => {
      setFormData({
        name: supplier.name,
        email: supplier.email,
        number: supplier.number,
        address: supplier.address,
      });
      setEditSupplier(supplier._id)
      setAddModal(true);
    }

    const closeModal = () =>{
      setAddModal(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: ''
      })
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(editSupplier){
        try {
        const response = await axios.put(
            `http://localhost:3000/api/supplier/${editSupplier}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('pos-token')}`,
                },
            }
        );
        if (response.data.success) {
          fetchSuppliers();
            alert('Supplier edited successfully!');
            setAddModal(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              address: ''
            })
            setEditSupplier(null);
        } else {
            console.error('Error adding supplier:', response.data);
            alert('Error adding supplier. This supplier already exist.');
        }
    }catch (error) {
        console.error('Error adding supplier:', error);
        alert('Error adding supplier. Please try again later.');
}
      }else{
     try {
        const response = await axios.post(
            'http://localhost:3000/api/supplier/add',
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('pos-token')}`,
                },
            }
        );
        if (response.data.success) {
            alert('Supplier added successfully!');
            setAddModal(false);
            setFormData({
              name: '',
              email: '',
              phone: '',
              address: ''
            })
            setEditSupplier(null);
        } else {
            console.error('Error adding supplier:', response.data);
            alert('Error adding supplier. This supplier already exist.');
        }
    }catch (error) {
        console.error('Error adding supplier:', error);
        alert('Error adding supplier. Please try again later.');
}
    }
    }

  return (
    <div className='w-full h-full flex flex-col gap-4 p-4'>
        <h1 className='text-white text-2xl font-bold'>Supplier Management</h1>
      <div className='flex justify-between items-center'>
        <input 
        type="text" 
        placeholder='Search'
        className='border border-white text-white p-1 bg-gray-600 rounded px-4'
        />
        <button 
        className='px-4 py-1.5 bg-cyan-700 text-white rounded hover:bg-cyan-800 transition duration-200 cursor-pointer ' 
        onClick={ () => setAddModal(1)} 
        >Add Supplier</button>
      </div>
      {loading ? <div>Loading....</div> : (
        <table className='w-full border-collapse border border-gray-600 mt-4'>
            <thead>
                <tr className='bg-gray-100'>
                    <th className='border border-gray-600 p-2 text-xl'>Number</th>
                    <th className='border border-gray-600 p-2 text-xl'>Supplier Name</th>
                    <th className='border border-gray-600 p-2 text-xlborder border-gray-600 p-2 text-xl'>Email</th>
                    <th className='border border-gray-600 p-2 text-xl'>Phone</th>
                    <th className='border border-gray-600 p-2 text-xl'>Address</th>
                    <th className='border border-gray-600 p-2 text-xl'>Action</th>
                </tr>
            </thead>
            <tbody>
                {suppliers.map((supplier, index) => (
                    <tr key={supplier._id}>
                        <td className='bg-white border border-gray-600 p-2 text-xl'>{index + 1}</td>
                        <td className='bg-white border border-gray-600 p-2 text-xl'>{supplier.name}</td>
                        <td className='bg-white border border-gray-600 p-2 text-xl'>{supplier.email}</td>
                        <td className='bg-white border border-gray-600 p-2 text-xl'>{supplier.number}</td>  
                        <td className='bg-white border border-gray-600 p-2 text-xl'>{supplier.address}</td>
                        <td className='bg-white border border-gray-600 p-2 text-xl'>
                          <button 
                                        className='bg-blue-800 text-white p-2 rounded-md hover:bg-blue-900 duration-200 cursor-pointer mr-2'
                                        onClick={() => handleEdit(supplier)}
                                        >Edit</button>
                                        <button 
                                        className='bg-red-800 text-white p-2 rounded-md hover:bg-red-900 duration-200 cursor-pointer'
                                        onClick={() => handleDelete(category._id)}
                                        >Delete</button>
                        </td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
      )}
      {addModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center'>
            <div className='bg-gray-700 p-4 rounded shadow-md w-1/3 relative'>
                <h1 className='text-xl font-bold text-white'>Add Supplier</h1>
                <button 
                className='absolute top-4 right-4 font-bold text-lg text-white cursor-pointer'
                onClick={closeModal}
                >X</button>
                <form 
                className='flex flex-col gap-4 mt-4' 
                onSubmit={handleSubmit}>
                    <input 
                    type="text" 
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Supplier Name'
                    className='border p-1 bg-gray-600 text-white rounded px-4'
                    />
                    <input 
                    type="email" 
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Supplier Email'
                    className='border p-1 bg-gray-600 text-white rounded px-4'
                    />
                    <input 
                    type="Number" 
                    name='number'
                    value={formData.number}
                    onChange={handleChange}
                    placeholder='Supplier Phone'
                    className='border p-1 bg-gray-600 text-white rounded px-4'
                    />
                    <input 
                    type="text" 
                    name='address'
                    value={formData.address}
                    onChange={handleChange}
                    placeholder='Supplier Address'
                    className='border p-1 bg-gray-600 text-white rounded px-4'
                    />
                     <div className='flex space-x-2'>
                            <button 
                        type='submit'
                        className='w-full rounded-md bg-cyan-600 font-bold text-white p-3 cursor-pointer hover:bg-cyan-700 transition duration-200 mt-2'
                        >{editSupplier ? 'Save Changes' : 'Add Supplier'}</button>
                        { editSupplier && (
                            <button 
                            className='w-full rounded-md bg-gray-600 font-bold text-white p-3 cursor-pointer hover:bg-gray-800 transition duration-200 mt-2' 
                            onClick={closeModal}
                            >Cancel</button>
                        )}
                        </div>
                </form>
            </div>
        </div>
      )}
    </div>
  )
}

export default Suppliers
