// EditTableForm.js
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import plus from '../Table/blue-plus.png';
import minus from '../Table/red-minus.png';
import './EditTable.css';

const EditTable = ({ tableName, tableRows, onClose }) => {

    const [editedTableName, setEditedTableName] = useState(tableName);
    const [editedTableRows, setEditedTableRows] = useState(tableRows);

    useEffect(() => {
        setEditedTableName(tableName);
    }, [tableName])


    const options = [
        { value: 'integer', label: 'integer' },
        { value: 'string', label: 'string' },
        { value: 'char', label: 'char' },
    ];

    const handleInputChange = (index, field, value) => {
        const updatedRows = [...editedTableRows];
        updatedRows[index][field] = value;
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
                foreignKey: null,
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
                                    <td>
                                        <Select
                                            options={options}
                                            value={row.foreignKey}
                                            onChange={(value) => handleInputChange(index, 'foreignKey', value)}
                                        />
                                    </td>
                                    <td>
                                        <Select
                                            options={options}
                                            value={row.foreignTable}
                                            onChange={(value) => handleInputChange(index, 'foreignTable', value)}
                                        />
                                    </td>
                                    <td>
                                        <Select
                                            options={options}
                                            value={row.foreignField}
                                            onChange={(value) => handleInputChange(index, 'foreignField', value)}
                                        />
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
                            <button type="button">Закрыть</button>
                        </div>
                    </div>
                </form>
        </div>
    );
};

export default EditTable;