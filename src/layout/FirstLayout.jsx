import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function FirstLayout() {
  return (
    <div>
      {/* <Header /> */}
      <main className='min-h-96'>
        <Outlet />
      </main>
    </div>
  );
}
