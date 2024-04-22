import './Import.css';
import React from 'react';
import Select from 'react-select'


const Import = () => {
    const options = [
        { value: 'PostgreSQL', label: 'PostgreSQL' },
        { value: 'Microsoft SQL Server', label: 'Microsoft SQL Server' },
        { value: 'MySQL', label: 'MySQL' }
    ]
    return (
        <div className="ImP">
            <form>
                <div className='ChooseSql'>
                    Выберите тип SQL
                </div>
                <Select options={options} />
                <div className='GenBtn'>
                    <button>Имортировать SQL</button>
                </div>
                <div className='DelBtn'>
                    <button>Закрыть</button>
                </div>
            </form>
        </div>
    );
};

export default Import;