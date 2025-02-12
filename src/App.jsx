import {
  BrowserRouter as Router,
  Route,
  Routes,
 Navigate } from "react-router-dom";

import Home from './pages/home/Home';
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NoPage from "./pages/nopage/NoPage";
import MyState from "./context/data/myState"; // Update the path to the correct location of MyState
import Login from "./pages/registration/Login";
import Productinfo from "./pages/productinfo/Productinfo";
import Signup from "./pages/registration/Signup";
import AddProduct from "./pages/admin/page/AddProduct";
import UpdateProduct from "./pages/admin/page/UpdateProduct";


function App() {
  return (
    <MyState>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/order" element={
          <ProtectedRoute>
            <Order/>
          </ProtectedRoute>
        } />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/dashboard" element={
          
            <Dashboard/>
          
        } />
        <Route path= "/login" element={<Login/>} />
        <Route path= "/signup" element={<Signup/>} />
        <Route path= "/productinfo/:id" element={<Productinfo/>} />
        <Route path= "/addproduct" element={
          
            <AddProduct/>
          
        } />
        <Route path="/updateproduct" element={
          
            <UpdateProduct/>
          
        } />
        <Route path="/*" element={<NoPage/>} />
        
      </Routes>
    </Router>
    </MyState>
  )
}

export default App

export const ProtectedRoute = ({ children }) => {
 const user = localStorage.getItem('user')
 if (user){
  return children
 }else{
  return <Navigate to='/login' />
 }
}
// const ProtectedRouteForAdmin = ({ children }) => {
//   const admin = JSON.parse(localStorage.getItem('user'))
//   if (admin.user.email === 'kkakka@gmail.com' ){
//     return children
//   }else{
//     return <Navigate to='/login' />
//   }
//   }