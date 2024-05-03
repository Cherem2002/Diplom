import React from 'react';
import MainTable from '../../components/MainTable/MainTable';

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
