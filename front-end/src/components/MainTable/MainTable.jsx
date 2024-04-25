import React, { useState } from 'react';
import './MainTable.css';
import EditTable from '../EditTable/EditTable';
import Draggable from 'react-draggable';



const MainTable = ({ tableData }) => {

  const [isEditTableOpen, setIsEditTableOpen] = useState(false);
  const [currentTableName, setCurrentTableName] = useState('');
  const [currentTableRows, setCurrentTableRows] = useState([]);

  const handleTableClick = (tableName, tableRows) => {
    setCurrentTableName(tableName);
    setCurrentTableRows(tableRows);
    setIsEditTableOpen(true);
  };

  console.log('Пришедшие данные:');
  console.log(tableData);

  if (!tableData || !tableData.length) {
    return null; // Возвращаем null, чтобы не создавать никаких элементов
  }

  return (
    <div className="MainTable">
      {isEditTableOpen && (
        <EditTable
          tableName={currentTableName}
          tableRows={currentTableRows}
          onClose={() => setIsEditTableOpen(false)}
        />
      )}
      {tableData.map((table, index) => (
        <Draggable key={index}>
          <form key={table.id} onClick={() => handleTableClick(table.name, table.rows)}>
            <h2>{table.name}</h2>
            <table>
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Тип</th>
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, index) => (
                  <tr key={index}>
                    <td>{row.name}</td>
                    <td>{row.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
          </Draggable>
        ))}
        </div>
  );
};

export default MainTable;
