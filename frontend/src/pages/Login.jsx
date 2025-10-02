import React from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    
    const {login} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {email, password});

            if (response.data.success) {
                await login(response.data.user, response.data.token);
                if (response.data.user.role === "admin") {
                    navigate('/admin-dashboard');
                }else {
                    navigate('/customer-dashboard');
                }
            }else {
                alert(response.data.error);
            }
            
           
        } catch (error) {
            if(error.response) {
                setError(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
      <div className='flex flex-col items-center h-screen justify-center bg-gradient-to-b from-gray-900 to-cyan-900 space-y-6' >
        <h2 className='text-3xl text-white'>Inventory Management System</h2>
        <div className="border shadow-lg p-6 w-80 bg-gray-900">
        <h2 className='text-2xl text-white font-bold mb-4'>Login</h2>
        {error && (<div className='bg-red-200 text-red-700 p-2 mb-4 rounded'>
            {error}
            </div>)}  

        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className='block text-gray-300'>Email:</label>
                <input 
                type="email" 
                className='w-full bg-gray-800 text-white px-3 py-2 border' 
                name='email' 
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter Email' />
            </div>
            <div className="mb-4">
                <label className='block text-gray-300'>Password:</label>
                <input 
                type="password" 
                className='w-full bg-gray-800 text-white px-3 py-2 border' 
                name='password'
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter Password' />
            </div>
            <div className='mb-4'>
                <button type="submit" className='w-full bg-gray-600 text-white py-2'>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </div>
        </form>
      </div>
      </div>
    )
}

export default Login;