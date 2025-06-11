
import React from "react";
import {
  createHashRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import RoleBasedRoute from "./PrivateRoute";

import Login from "../Screens/Auth/Userlogin";
import Home from "../Screens/HOME/User/Home";
import Admindashboard from "../Screens/HOME/Admin/Admindashboard";
import Venderdashboard from "../Screens/HOME/Vendar/Venderdashboard";

import MainLayout from "../Layout/MainLayout";
import Adduser from "../Screens/HOME/Admin/Adduser";
import Addvender from "../Screens/HOME/Admin/Addvender";
import Userlist from "../Screens/HOME/Admin/Userlist";
import Venderlist from "../Screens/HOME/Admin/Venderlist";

import Addproductvender from "../Screens/HOME/Vendar/Addproductvender";
import Venderproductlist from "../Screens/HOME/Admin/Venderproductlist";
import Productlist from "../Screens/HOME/Vendar/Productlist";
import ApprovedProduct from "../Screens/HOME/Vendar/ApprovedProduct";
import CartPage from "../Screens/HOME/User/CartPage";
import Payment from "../Screens/HOME/User/Payment";
import contactForm from "../Screens/HOME/User/ContactForm";

const router = createHashRouter(
  createRoutesFromElements(
    <>
      {/* Login Route with redirect based on role */}
      <Route
        path="/"
        element={
          <RoleBasedRoute protect={false}>
            <Login />
          </RoleBasedRoute>
        }
      />

      {/* Customer Protected Routes */}
      <Route
        path="/user"
        element={
          <RoleBasedRoute requiredRole="customer" protect={true}>
            <MainLayout />
          </RoleBasedRoute>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="contact" element={<contactForm />} />
        <Route path="payment" element={<Payment />} />
      </Route>

      {/* Admin Protected Routes */}
      <Route
        path="/Admindashboard"
        element={
          <RoleBasedRoute requiredRole="admin" protect={true}>
            <MainLayout />
          </RoleBasedRoute>
        }
      >
        <Route index element={<Admindashboard />} />
        <Route path="adduser" element={<Adduser />} />
        <Route path="addvender" element={<Addvender />} />
        <Route path="userlist" element={<Userlist />} />
        <Route path="venderlist" element={<Venderlist />} />
        <Route path="Venderproduct" element={<Venderproductlist />} />
      </Route>

      {/* Vendor Protected Routes */}
      <Route
        path="/Venderdashboard"
        element={
          <RoleBasedRoute requiredRole="vendor" protect={true}>
            <MainLayout />
          </RoleBasedRoute>
        }
      >
        <Route path="Addproduct" element={<Addproductvender />} />
        <Route path="Allproduct" element={<ApprovedProduct />} />
        <Route path="Products" element={<Productlist />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </>
  )
);

function AppRouters() {
  return <RouterProvider router={router} />;
}

export default AppRouters;
