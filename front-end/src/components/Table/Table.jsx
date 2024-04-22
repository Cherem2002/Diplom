// Table.js
import React, { useState } from 'react';
import './Table.css';
import Select from 'react-select';
import plus from './blue-plus.png';
import {toggleTablePopup} from '../Header/Header'
import MainTable from '../MainTable/MainTable';

const Table = ({ setTableData  , setTableOpen}) => {
  const [tableName, setTableName] = useState('');
  const [tableRows, setTableRows] = useState([
    {
      name: '',
      type: null,
      isPrimaryKey: false,
      isUnique: false,
      isAutoIncrement: false,
      foreignKey: null,
      foreignTable: null,
      foreignField: null,
    },
  ]);

  const options = [
    { value: 'integer', label: 'integer' },
    { value: 'string', label: 'string' },
    { value: 'char', label: 'char' },
  ];

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...tableRows];
    updatedRows[index][field] = value;
    setTableRows(updatedRows);
  };

  const addRow = () => {
    setTableRows([
      ...tableRows,
      {
        name: '',
        type: null,
        isPrimaryKey: false,
        isUnique: false,
        isAutoIncrement: false,
        foreignKey: null,
        foreignTable: null,
        foreignField: null,
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tableData  = { name: tableName, rows: tableRows };
    setTableData(tableData );
    console.log('Отправленные данные:');
    console.log(tableData); 
    setTableName('');
    setTableRows([{ /* reset rows to initial state */ }]);
    setTableOpen(false);
  };

 
  return (
    <div className='TableCreator'>
      <form  onSubmit={handleSubmit}>
        <label>Название таблицы</label>
        <div>
          <input type="text" value={tableName} onChange={(e) => setTableName(e.target.value)} />
        </div>
        <label>Структура таблицы</label>
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Тип</th>
              <th>Основной ключ</th>
              <th>Уникальное поле</th>
              <th>Автоинкремент</th>
              <th>Внешний ключ</th>
              <th>Внешняя таблица</th>
              <th>Внешнее поле</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row, index) => (
              <tr key={index}>
                <td><input type="text" value={row.name} onChange={(e) => handleInputChange(index, 'name', e.target.value)} /></td>
                <td><Select options={options} value={row.type} onChange={(selectedOption) => handleInputChange(index, 'type', selectedOption.value)} /></td>
                <td><input type="checkbox" checked={row.isPrimaryKey} onChange={(e) => handleInputChange(index, 'isPrimaryKey', e.target.checked)} /></td>
                <td><input type="checkbox" checked={row.isUnique} onChange={(e) => handleInputChange(index, 'isUnique', e.target.checked)} /></td>
                <td><input type="checkbox" checked={row.isAutoIncrement} onChange={(e) => handleInputChange(index, 'isAutoIncrement', e.target.checked)} /></td>
                <td><Select options={options} value={row.foreignKey} onChange={(value) => handleInputChange(index, 'foreignKey', value)} /></td>
                <td><Select options={options} value={row.foreignTable} onChange={(value) => handleInputChange(index, 'foreignTable', value)} /></td>
                <td><Select options={options} value={row.foreignField} onChange={(value) => handleInputChange(index, 'foreignField', value)} /></td>
                <td>{index === tableRows.length - 1 ? <img src={plus} alt='Плюс' style={{ width: '20px', height: '20px', cursor: 'pointer' }} onClick={addRow} /> : null}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='Buttons'>
          <div className='RegBtn'>
            <button type="submit">Сохранить</button>
          </div>
          <div className='DlBtn'>
            <button type="button">Закрыть</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Table;



