// 
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch('https://todo-mern-j4xc.onrender.com/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      const result = await res.json();
      if (result.message) {
        alert('Logged out successfully');
        navigate('/'); //  redirect to home page
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-2xl font-semibold shadow-lg hover:scale-105 hover:from-red-600 hover:to-pink-600 transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
