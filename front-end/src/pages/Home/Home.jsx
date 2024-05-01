import React, { useState } from 'react';
import MainTable from '../../components/MainTable/MainTable';
import Export from '../../components/Export/Export';
import Header from '../../components/Header/Header';

const Home = ({ tableData, setTableData }) => {
    
    console.log('Данные home:');
    console.log(tableData);
    return (
        <div className="Home">
            <MainTable tableData={tableData} setTableData={setTableData}/>
        </div>
    );
};
export default Home;
