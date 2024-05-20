import MainTable from '../../components/MainTable/MainTable';
import React, {useEffect} from 'react';


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
