import React from 'react';
import Chart from './Chart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import QueryTree from './QueryTree';

function App() {

  return (
    <div>
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


