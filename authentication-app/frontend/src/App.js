import { Footer } from './components/Footer/Footer';
import { Signup } from './components/Signup/Signup';
import './App.css';

function App() {
  return (
    <div className='app'>
      <div className='wrapper'>
        <Signup />
        <Footer />
      </div>
    </div>
  );
}

export default App;
