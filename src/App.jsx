import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import AuthPage from './Pages/AuthPage'
import Checkout from './Pages/Checkout'
import NavBar from './Components/NavBar'
import AuthProvider from './context/AuthContext'
import CartProvider from './context/CartContext'
import ProductDetails from './Pages/ProductDetails'
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <>
          <NavBar></NavBar>
          <Routes>
            <Route path={'/'} element={<Home/>}></Route>
            <Route path={'/AuthPage'} element={<AuthPage/>}></Route>
            <Route path={'/Checkout'} element={<Checkout/>}></Route>
            <Route path={'/ProductDetails/:id'} element={<ProductDetails/>}></Route>
          </Routes>
        </>
      </CartProvider>
    </AuthProvider>
    
  )
}

export default App