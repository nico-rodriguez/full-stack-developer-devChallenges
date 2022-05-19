import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Signup } from './pages/Signup/Signup';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/signup' />} />
        <Route
          path='/signup'
          element={
            <div className='app'>
              <div className='wrapper'>
                <Signup />
                <Footer />
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
