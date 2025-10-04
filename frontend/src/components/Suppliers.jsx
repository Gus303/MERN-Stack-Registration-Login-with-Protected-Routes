import React, { useState } from 'react'

const Suppliers = () => {

    const [addEditModal, setAddEdiModal] = useState(null);
  return (
    <div className='w-full h-full flex flex-col p-4 gap-4'>
        <h1 className='text-white text-2xl font-bold'>Supplier Management</h1>
      <div className='flex justify-between items-center'>
        <input 
        type="text" 
        placeholder='Search'
        className='border border-white text-white p-1 bg-gray-600 rounded px-4'
        />
        <button 
        className='px-4 py-1.5 bg-cyan-700 text-white rounded hover:bg-cyan-800 transition duration-200 cursor-pointer ' 
        onClick={ () => setAddEdiModal(1)} 
        >Add Supplier</button>
      </div>

      {addEditModal && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center'>
            <div className='bg-gray-700 p-4 rounded shadow-md w-1/3 relative'>
                <h1 className='text-xl font-bold'>Add Supplier</h1>
                
                <button className='Absolute top-4 right-4 font-bold text-white'>X</button>
                <form className='flex flex-col gap-4 mt-4'>
                    
                    <input type="text" 
                    placeholder='Supplier Name'
                    className='border p-1 bg-gray-600 text-white rounded px-4'
                    />
                    <input type="email" 
                    placeholder='Supplier Email'
                    className='border p-1 bg-gray-600 text-white rounded px-4'
                    />
                    <input type="Number" 
                    placeholder='Supplier Phone'
                    className='border p-1 bg-gray-600 text-white rounded px-4'
                    />
                    <input type="text" 
                    placeholder='Supplier Address'
                    className='border p-1 bg-gray-600 text-white rounded px-4'
                    />
                    <button className='px-4 py-1.5 bg-cyan-600 text-white rounded cursor-pointer hover:bg-cyan-700 transition duration-200'>Add Supplier</button>
                </form>
            </div>
        </div>
      )}
    </div>
  )
}

export default Suppliers
