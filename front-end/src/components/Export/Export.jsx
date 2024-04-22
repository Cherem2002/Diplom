import './Export.css';
import React, { useState } from 'react';
import Select from 'react-select'


const Export = () => {
    const options = [
        { value: 'PostgreSQL', label: 'PostgreSQL' },
        { value: 'Microsoft SQL Server', label: 'Microsoft SQL Server' },
        { value: 'MySQL', label: 'MySQL' }
    ]
    return (
        <div className="ExP">
            <form>
                <div className='ChooseSql'>
                    Выберите тип SQL
                </div>
                <Select options={options} />
                <div className='GenBtn'>
                    <button>Сгенерировать SQL</button>
                </div>
                <div className='DelBtn'>
                    <button>Закрыть</button>
                </div>
            </form>
        </div>
    );
};

export default Export;