// client/src/pages/Home.jsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-pink-400 text-white px-6'>
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className='text-5xl font-bold mb-6 text-center'
      >
        Welcome to the Todo App
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className='text-lg mb-10 text-center max-w-xl'
      >
        Organize your tasks efficiently, track your progress, and stay productive with our modern and secure Todo App.
      </motion.p>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className='flex gap-4'
      >
        <Button onClick={() => navigate('/login')} className='text-lg px-6 py-2'>
          Login
        </Button>
        <Button onClick={() => navigate('/register')} className='text-lg px-6 py-2'>
          Register
        </Button>
      </motion.div>
    </div>
  );
};

export default Home;
