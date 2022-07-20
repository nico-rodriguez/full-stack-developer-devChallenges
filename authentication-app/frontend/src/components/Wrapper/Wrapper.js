import { Outlet } from 'react-router-dom';

import { Footer } from 'components/Footer/Footer';

import './Wrapper.css';

export default function Wrapper() {
  return (
    <div className='app'>
      <div className='wrapper'>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
