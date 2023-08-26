import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import CarouselUpload from './pages/admin/CarouselUpload.jsx';
import ProductDetails from './pages/admin/ProductDetails.jsx';
import Product from './pages/admin/AddProduct.jsx';

import Navbar from './components/Navbar/navbar';
import Signup from './pages/auth/userSignup';
import GetProduct from './pages/shop/getProducts';
import Signin from './pages/auth/userSignin';
import Cart from './pages/shop/cart';
import Reset from './pages/auth/userReset';
import NewPassword from './pages/auth/userNewPassword';
import AdminLogin from './pages/admin/adminlogin';
import ShopProduct from './pages/shop/shopProduct';
import Thankyou from './pages/shop/thankyou';
import Home from './components/home';



const App = () => {
  return (
    
    <BrowserRouter>
    
     
        <Routes>
          {/* admin */}
          <Route path='/admin/login' element={<AdminLogin/>}/>
          <Route path="/admin-Page" element={<Sidebar />} />
          <Route path="/admin/CarouselUpload" element={<CarouselUpload />} />
          <Route path="/admin/addProduct" element={<Product />} />
          <Route path="/admin/ProductDetails" element={<ProductDetails />} />
          <Route path="/admin/addProduct/:id" element={<Product />} />
          <Route path="/" element={<Home />} />



          


          {/* cart */}
          <Route path="/shop/products" element={<ShopProduct />} />
          <Route path="/shop/getProduct/:id" element={<GetProduct />} />
          <Route path="/shop/getCart" element={<Cart />} />
          <Route path="/thankyou" element={<Thankyou/>} />






          {/* auth */}
          <Route path="/signup" element={<Signup />} />
          <Route path='/reset' element={<Reset/>}/>
          <Route path='/newpassword' element={<NewPassword/>}/>
          <Route path="/login" element={<Signin />} />


         
         </Routes>
         <Navbar/> 
    </BrowserRouter>
  );
};

export default App;