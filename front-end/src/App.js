import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Export from './components/Export/Export';
import Import from './components/Import/Import';
import Load from './components/Load/Load';
import Table from './components/Table/Table';
import Create from './components/Create/Create';
import MainTable from './components/MainTable/MainTable';
import Home from './pages/Home/Home';


function App() {
  const [tableData, setTableData] = useState([]);

  return (
    <Router>
      <div className="App">
        <Header setTableData={setTableData} />
        <Routes>
          <Route path="/" element={<Home tableData={tableData} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
