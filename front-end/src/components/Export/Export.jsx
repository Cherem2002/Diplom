import './Export.css';
import React, { useState } from 'react';
import Select from 'react-select'


const Export = ({ tableData }) => {
    const options = [
        { value: 'PostgreSQL', label: 'PostgreSQL' },
        { value: 'Microsoft SQL Server', label: 'Microsoft SQL Server' },
        { value: 'MySQL', label: 'MySQL' },
        { value: 'Oracle', label: 'Oracle' }
    ]

    console.log('Данные экспорт:',tableData);

    const [selectedSQLType, setSelectedSQLType] = useState(null); // Храним выбранный тип SQL

    const handleGenerateSQL = () => {
        if (selectedSQLType) {
            const generateSQLScript = (tableData, selectedSQLType) => {

                let sqlScript = '';

                if (selectedSQLType === 'PostgreSQL') {
                    // Логика для PostgreSQL
                    for (let i = 0; i < tableData.length; i++) {
                        let table = tableData[i];
                        let tableScript = `CREATE TABLE ${table.name} (\n`;
                        for (let j = 0; j < table.rows.length; j++) {
                            let row = table.rows[j];
                            let columnScript = `${row.name} ${row.type}`;
                            if (row.isPrimaryKey) {
                                columnScript += ' PRIMARY KEY';
                            }
                            if (row.isUnique) {
                                columnScript += ' UNIQUE';
                            }
                            if (row.isAutoIncrement) {
                                columnScript += ' SERIAL';
                            }
                            if (j !== table.rows.length - 1) {
                                columnScript += ',';
                            }
                            tableScript += `\t${columnScript}\n`;
                        }
                        tableScript += `);\n\n`;
                        sqlScript += tableScript;
                    }
                    
                }
                // Логика создания SQL скрипта на основе данных о таблицах и выбранного типа SQL
                return sqlScript;
            };

            const sqlScript = generateSQLScript(tableData, selectedSQLType.value);
            console.log('Скрипт:',sqlScript); // Выводим сгенерированный SQL скрипт в консоль (вместо этого можно реализовать функциональность сохранения файла)
            const blob = new Blob([sqlScript], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
        
            // Создаем ссылку для скачивания файла
            const link = document.createElement('a');
            link.href = url;
            link.download = 'script.sql'; // Название файла
        
            // Автоматически нажимаем на ссылку для скачивания файла
            link.click();
        
            // Очищаем URL объекта Blob
            URL.revokeObjectURL(url);
        
        } else {
            alert('Выберите тип SQL');
        }
    };

    return (
        <div className="ExP">
            <form>
                <div className='ChooseSql'>
                    Выберите тип SQL
                </div>
                <Select
                    options={options}
                    value={selectedSQLType}
                    onChange={setSelectedSQLType}
                />
                <div className='GenBtn'>
                    <button onClick={handleGenerateSQL}>Сгенерировать SQL</button>
                </div>
                <div className='DelBtn'>
                    <button>Закрыть</button>
                </div>
            </form>
        </div>
    );
};

export default Export;