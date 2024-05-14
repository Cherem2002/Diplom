import './Export.css';
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import axios from 'axios'; 


const Export = ({ tableData }) => {

    const [sqlOptions, setSQLOptions] = useState([]); 

    useEffect(() => {
        const fetchSQLOptions = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/sql_type`);
                const data = response.data.map(item => ({
                    value: item.name_sql,
                    label: item.name_sql,
                  }));
                setSQLOptions(data); 
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };

        fetchSQLOptions(); 
    }, []);

    console.log('Данные экспорт:',tableData);

    const [selectedSQLType, setSelectedSQLType] = useState(null); 

    const handleGenerateSQL = () => {
        if (selectedSQLType) {
            const generateSQLScript = (tableData, selectedSQLType) => {

                let sqlScript = '';

                if (selectedSQLType === 'PostgreSQL') {

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
                            if (row.isForeignKey && row.foreignTable && row.foreignField) {

                                columnScript += `, FOREIGN KEY (${row.name}) REFERENCES ${row.foreignTable.name}(${row.foreignField.name})`;
                              }
                            if (j !== table.rows.length - 1) {
                                columnScript += ',';
                            }
                            tableScript += `\t${columnScript}\n`;
                        }
                        tableScript += `);\n\n`;
                        sqlScript += tableScript;
                    }

                    if (selectedSQLType === 'MySQL') {
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
                                columnScript += ' AUTO_INCREMENT';
                              }
                              if (row.isForeignKey && row.foreignTable && row.foreignField) {
                                columnScript += `, FOREIGN KEY (${row.name}) REFERENCES ${row.foreignTable.name}(${row.foreignField.name})`;
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

                    if(selectedSQLType === 'Microsoft SQL Server'){
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
                                columnScript += ' IDENTITY(1,1)';
                              }
                              if (row.isForeignKey && row.foreignTable && row.foreignField) {
                                columnScript += `, FOREIGN KEY (${row.name}) REFERENCES ${row.foreignTable.name}(${row.foreignField.name})`;
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

                    if(selectedSQLType === 'Oracle'){
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
                              }
                              if (row.isForeignKey && row.foreignTable && row.foreignField) {
                                columnScript += `, FOREIGN KEY (${row.name}) REFERENCES ${row.foreignTable.name}(${row.foreignField.name})`;
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
                    
                }
                return sqlScript;
            };

            const sqlScript = generateSQLScript(tableData, selectedSQLType.value);
            console.log('Скрипт:',sqlScript); 
            const blob = new Blob([sqlScript], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
        
            const link = document.createElement('a');
            link.href = url;
            link.download = 'script.sql'; 
        
            link.click();
        
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
                    options={sqlOptions}
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