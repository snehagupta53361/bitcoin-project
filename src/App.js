
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Coins from './components/Coins';
import CoinsDetails from './components/CoinsDetails';
import Home from './components/Home';
import Exchanges from './components/Exchanges';
import Footer from './components/Footer';


function App() {
  return (
    <>
      <Router>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/coins' element={<Coins/>}/>
          <Route path='/exchanges' element = {<Exchanges/>}/>
          <Route path='/coins/:id' element={<CoinsDetails/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;

