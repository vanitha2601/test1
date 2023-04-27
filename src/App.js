import React from 'react';
import Chart from './Chart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QueryTree from './QueryTree';
import './App.css';
import Navbar from './components/Navbar';

function App() {

  return (
   
    <div>
   <Navbar></Navbar>
      
      <BrowserRouter>
        <Routes>

          <Route index element={<QueryTree />} />
          <Route path="/charts" element={<Chart />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}
export default App;


