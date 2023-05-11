import React from 'react';
import Chart from './Chart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QueryTree from './QueryTree';
import DatabaseTableUI from './DatabaseTableUI';
import MyComponent from './MyComponent';
import './App.css';
import Navbar from './components/Navbar';
import CreateTablePopup from './CreateTablePopup';
import DnDFlow from './DnDFlow';
import Flow from './Flow';

function App() {

  return (
   
    <div>
   {/* <Navbar></Navbar> */}
      
      <BrowserRouter>
        <Routes>
        <Route index element={<CreateTablePopup />} />
        <Route path="/databasetableui" element={<DatabaseTableUI />} />
        <Route path="/MyComponent" element={<MyComponent />} />
          <Route path="/querytree" element={<QueryTree />} />
          <Route path="/charts" element={<Chart />} />
          <Route path="/DnDFlow" element={<DnDFlow />} />
          <Route path="/Flow" element={<Flow />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}
export default App;


