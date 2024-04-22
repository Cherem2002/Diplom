import React, { useState } from 'react';
import MainTable from '../../components/MainTable/MainTable';
import Header from '../../components/Header/Header';

const Home = ({ tableData }) => {
    console.log('Данные home:');
    console.log(tableData);
    return (
        <div className="Home">
            <MainTable tableData={tableData} />
        </div>
    );
};
export default Home;
