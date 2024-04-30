// EditTableForm.js
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import plus from '../Table/blue-plus.png';
import minus from '../Table/red-minus.png';
import './EditTable.css';

const EditTable = ({ tableName, tableRows, onClose, onDelete, tableData }) => {

    const [editedTableName, setEditedTableName] = useState(tableName);
    const [editedTableRows, setEditedTableRows] = useState(tableRows);

    const handleDelete = () => {
        onDelete(); // Вызываем функцию onDelete, переданную из родительского компонента
    };


    const options = [
        { value: 'integer', label: 'integer' },
        { value: 'string', label: 'string' },
        { value: 'char', label: 'char' },
    ];

    const handleInputChange = (index, field, value) => {
        const updatedRows = [...editedTableRows];
        updatedRows[index][field] = value;
        if (field === 'isForeignKey') {
            // Если выбран флажок ForeignKey, сделаем селекты для внешних ключей доступными
            if (value) {
                updatedRows[index].foreignTable = null;
                updatedRows[index].foreignField = null;
            }
        }
        setEditedTableRows(updatedRows);
    };

    const addRow = () => {
        setEditedTableRows([
            ...editedTableRows,
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
        const updatedRows = [...editedTableRows];
        updatedRows.splice(index, 1);
        setEditedTableRows(updatedRows);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Отправляем обновленные данные родительскому компоненту или выполняем другую логику сохранения
        const updatedTableData = { name: editedTableName, rows: editedTableRows };
        console.log('Отредактированные данные:');
        console.log(updatedTableData);
        onClose();
    };

    return (
        <div className='EditTable'>
            <form onSubmit={handleSubmit}>
                <label>Название таблицы</label>
                <div>
                    <input type="text" value={editedTableName} onChange={(e) => setEditedTableName(e.target.value)} />
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
                                <td>
                                    <Select
                                        options={options}
                                        value={row.type}
                                        onChange={(selectedOption) => handleInputChange(index, 'type', selectedOption.value)}
                                    />
                                </td>
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
                                <td>
                                    {index === tableRows.length - 1 ? (
                                        <img src={plus} alt='Плюс' style={{ width: '20px', height: '20px', cursor: 'pointer' }} onClick={addRow} />
                                    ) : null}
                                </td>
                                <td>
                                    {index === 0 ? null : (
                                        <img src={minus} alt='Минус' style={{ width: '20px', height: '20px', cursor: 'pointer' }} onClick={() => deleteRow(index)} />
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
                        <button onClick={handleDelete}>Удалить</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditTable;
