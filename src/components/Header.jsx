import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance';

export default function Header() {

const navigate=useNavigate()
    const handleLogout = async () => {
      try {
        const response = await axiosInstance.post('/admin/logout');
        console.log(response.data);
        navigate('/')
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    



  return (
    <header>
      <nav className="navbar text-black flex justify-around bg-white">
        <Link to={'/home'}>
        <span className="nav-item hover:bg-gray-200 p-2 rounded cursor-pointer transition font-semibold italic">Home</span>

        </Link>
        <Link to={'/employe-list'}>
        <span className="nav-item hover:bg-gray-200 p-2 rounded cursor-pointer transition font-semibold italic">Employee List</span>

        </Link>
        <Link>
        <span className="nav-item hover:bg-gray-200 p-2 rounded cursor-pointer transition font-semibold italic">Admin</span>

        </Link>
      
        <span
        onClick={handleLogout}
         className="nav-item hover:bg-gray-200 p-2 rounded cursor-pointer transition font-semibold italic">Logout</span>

      
      </nav>
    </header>
  );
}
