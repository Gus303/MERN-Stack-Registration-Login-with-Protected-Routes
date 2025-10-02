import bcrypt from 'bcryptjs';
import User from './models/User.js';
import connectDB from './db/connection.js';

const register = async () => {
    try {
        connectDB();
        const hashPassword = await bcrypt.hash('admin', 10)
        const user = new User({
            name: 'admin ',
            email: 'admin@gmail.com',
            password: hashPassword,
            address: 'admin address',
            role: 'admin'
        })
        await user.save();
        console.log('Admin user created');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};

register();