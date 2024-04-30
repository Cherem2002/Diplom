// Table.js
import React, { useState } from 'react';
import './Table.css';
import Select from 'react-select';
import plus from './blue-plus.png';
import minus from './red-minus.png';

const Table = ({ tableData, setTableData, setTableOpen }) => {
  const [tableName, setTableName] = useState('');
  const [tableRows, setTableRows] = useState([
    {
      name: '',
      type: null,
      isPrimaryKey: false,
      isUnique: false,
      isAutoIncrement: false,
      isForeignKey: false,
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
    if (field === 'isForeignKey') {
      // Если выбран флажок ForeignKey, сделаем селекты для внешних ключей доступными
      if (value) {
        updatedRows[index].foreignTable = null;
        updatedRows[index].foreignField = null;
      }
    }
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
        isForeignKey: false,
        foreignTable: null,
        foreignField: null,
      },
    ]);
  };

  const deleteRow = (index) => {
    const updatedRows = [...tableRows];
    updatedRows.splice(index, 1);
    setTableRows(updatedRows);
  };

  const handleSubmit = (e) => {
    // Проверка наличия названия таблицы
    if (!tableName.trim()) {
      alert("Введите название таблицы.");
      return;
    }

    // Проверка наличия заполненных полей первой строки
    if (
      tableRows[0].name.trim() === '' ||
      tableRows[0].type === null
    ) {
      alert("Заполните первые 2 поля первой строки.");
      return;
    }
    e.preventDefault();
    const tableIdCounter = Date.now();
    const newTableData = { id: tableIdCounter, name: tableName, rows: tableRows };
    setTableData(prevTableData => [...prevTableData, newTableData]);
    console.log('Отправленные данные:');
    console.log(newTableData);
    setTableName('');
    setTableRows([{ /* reset rows to initial state */ }]);
    setTableOpen(false);
  };


  return (
    <div className='TableCreator'>
      <form onSubmit={handleSubmit}>
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
                <td><input type="checkbox" checked={row.isForeignKeyforeignKey} onChange={(e) => handleInputChange(index, 'isForeignKey', e.target.checked)} /></td>
                <td>
                  {/* Селект для внешней таблицы доступен только если выбран флажок ForeignKey */}
                  {row.isForeignKey && tableData && tableData.map((table) => (
                    <option key={table.id} value={table.id}>{table.name}</option>
                  ))}
                  {row.isForeignKey && (
                    <Select
                      options={tableData}
                      value={row.foreignTable}
                      onChange={(selectedOption) => handleInputChange(index, 'foreignTable', selectedOption)}
                    />
                  )}
                </td>
                <td>
                  {/* Селект для внешнего поля доступен только если выбран флажок ForeignKey и выбрана внешняя таблица */}
                  {row.isForeignKey && row.foreignTable && (
                    <Select
                      options={tableData.find(table => table.id === row.foreignTable.value).rows.map(row => ({ value: row.name, label: row.name }))}
                      value={row.foreignField}
                      onChange={(selectedOption) => handleInputChange(index, 'foreignField', selectedOption)}
                    />
                  )}
                </td>
                <td>{index === tableRows.length - 1 ? <img src={plus} alt='Плюс' style={{ width: '20px', height: '20px', cursor: 'pointer' }} onClick={addRow} /> : null}</td>
                <td>
                  {index === 0 ? null : (
                    <img src={minus} alt='Минус' style={{ width: '20px', height: '20px', cursor: 'pointer' }} onClick={deleteRow} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='Buttons'>
          <div className='CreateBtn'>
            <button type="submit">Сохранить</button>
          </div>
          <div className='CloseBtn'>
            <button type="button">Закрыть</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Table;



