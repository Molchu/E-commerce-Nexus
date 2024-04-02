
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Footer from './Components/Footer/Footer';
import ropa_banner from './Components/Assets/banner_ropa.png'
import electrodomesticos_banner from './Components/Assets/banner_electrodomesticos.png'
import gamer_banner from './Components/Assets/banner_gamer.png'
import joyas_banner from './Components/Assets/banner_joyas.png'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/ropa' element={<ShopCategory banner={ropa_banner} category="ropa"/>}/>
        <Route path='/electrodomesticos' element={<ShopCategory banner={electrodomesticos_banner} category="electrodomesticos"/>}/>
        <Route path='/gamer' element={<ShopCategory banner={gamer_banner} category="gamer"/>}/>
        <Route path='/joyeria' element={<ShopCategory banner={joyas_banner} category="joyeria"/>}/>
        <Route path="/product" element={<Product/>}>
          <Route path=":productId" element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
