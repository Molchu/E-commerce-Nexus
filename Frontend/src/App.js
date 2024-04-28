import { useState } from "react";
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
import Profile from './Pages/Profile';
import ropa_banner from './Components/Assets/banner_ropa.png'
import electrodomesticos_banner from './Components/Assets/banner_electrodomesticos.png'
import gamer_banner from './Components/Assets/banner_gamer.png'
import joyas_banner from './Components/Assets/banner_joyas.png'
import Topbar from './Components/Topbar/Topbar'
import ShowSearch from './Pages/ShowSearch';
import GiftCard from './Pages/GiftCard';


function App() {
  const [results, setResults] = useState([]);
  return (
    <div>
      <BrowserRouter>
      <Topbar setResults={setResults}/>
      <Navbar/>
      <ShowSearch results={results} />
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/Ropa' element={<ShopCategory banner={ropa_banner} category="Ropa"/>}/>
        <Route path='/Electrodomesticos' element={<ShopCategory banner={electrodomesticos_banner} category="Electrodomesticos"/>}/>
        <Route path='/Gamer' element={<ShopCategory banner={gamer_banner}  category="Gamer"/>}/>
        <Route path='/Joyeria' element={<ShopCategory banner={joyas_banner} category="Joyeria"/>}/>
        <Route path="/product" element={<Product/>}>
        <Route path=":productId" element={<Product/>}/>

        </Route>
        <Route path='/showsearch' element={<ShowSearch/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/perfil' element={<Profile/>}/>
        <Route path='/regalo' element={<GiftCard/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;