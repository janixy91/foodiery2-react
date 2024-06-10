import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, NavLink, RouterProvider } from "react-router-dom";
import "./index.css";
import Register from "./routes/register";
import Home from "./routes/home/Home";
import Dashboard from "./routes/dashboard";
import NoMatch from "./routes/noMatch";
import SignIn from "./routes/signIn";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import Toast from "./components/atoms/Toast";
import ForgotPassword from "./routes/forgotPassword";
import RestaurantList from "./routes/restaurant";
import Profile from "./routes/profile";
import NewPlate from "./routes/newPlate";
import Visited from "./routes/visited";
import Wishlist from "./routes/wishlist/Wishlist";
import RestaurantDetail from "./routes/restaurant-detail/RestaurantDetail";
import MyProvider from "./context/Provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Awards from "./routes/awards/Awards";

const App = () => {
  return (
    <GoogleOAuthProvider clientId="611124602994-meub9tn628kvv0rdg6t7tq9r0flk95gi.apps.googleusercontent.com">
      <AuthProvider>
        <MyProvider>
          <Routes>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route path="/" element={<SignIn />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/restaurant" element={<RestaurantList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/visited" element={<Visited />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/create-plate" element={<NewPlate />} />
            <Route path="/restaurant-detail" element={<RestaurantDetail />} />
            <Route path="/awards" element={<Awards />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toast />
        </MyProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};
export default App;
