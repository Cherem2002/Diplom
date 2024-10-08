import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home/Home';


function App() {

  const [tableData, setTableData] = useState([]);

  console.log('Данные app');
  console.log(tableData);

  
  return (
    <Router>
      <div className="App">
        <Header setTableData={setTableData} tableData={tableData} />
        <Routes>
          <Route path="/" element={<Home tableData={tableData} setTableData={setTableData} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
