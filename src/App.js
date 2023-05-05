import React from 'react';
import Chart from './Chart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QueryTree from './QueryTree';
import DatabaseTableUI from './DatabaseTableUI';
import './App.css';
import Navbar from './components/Navbar';
import CreateTablePopup from './CreateTablePopup';

function App() {

  return (
   
    <div>
   {/* <Navbar></Navbar> */}
      
      <BrowserRouter>
        <Routes>
        <Route index element={<CreateTablePopup />} />
        <Route path="/databasetableui" element={<DatabaseTableUI />} />
          <Route path="/querytree" element={<QueryTree />} />
          <Route path="/charts" element={<Chart />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}
export default App;


