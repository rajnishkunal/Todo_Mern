import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import Todos from './components/ui/Todos';
import Register from './components/Register';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';
import Home from './components/Home';

const isAuthenticated = document.cookie.includes("token=");

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
   <Toaster position='top-center'/>
  <Routes>
   
    {/* <Route path="/" element={<Home/>} /> */}
    <Route path="/" element={isAuthenticated ? <Todos /> : <Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/todos" element={<Todos/>}/>
  </Routes>
</BrowserRouter>
)
