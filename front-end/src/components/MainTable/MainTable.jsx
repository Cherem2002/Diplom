import React, { useState, useEffect } from 'react';
import './MainTable.css';
import EditTable from '../EditTable/EditTable';
import Draggable from 'react-draggable';
import Xarrow from 'react-xarrows';


const MainTable = ({ tableData, setTableData }) => {

  const [isEditTableOpen, setIsEditTableOpen] = useState(false);
  const [currentTableName, setCurrentTableName] = useState('');
  const [currentTableRows, setCurrentTableRows] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState(null);

  const [positions, setPositions] = useState({});

  const handleDrag = (e, data, tableId) => {
    setPositions(prevPositions => ({
      ...prevPositions,
      [tableId]: { x: data.x, y: data.y }
    }));
  };

  const handleTableDoubleClick = (tableIdCounter, tableName, tableRows) => {
    setSelectedTableId(tableIdCounter);
    setCurrentTableName(tableName);
    setCurrentTableRows(tableRows);
    setIsEditTableOpen(true);
  };

  const handleDeleteTable = () => {
    const updatedTableData = tableData.filter(table => table.id !== selectedTableId);
    setTableData(updatedTableData);
    setIsEditTableOpen(false);
  };

  console.log('Данные MainTable:');
  console.log(tableData);


  if (!tableData || !tableData.length) {
    return null;
  }


  return (
    <div className="MainTable">
      {isEditTableOpen && (
        <EditTable
          tableName={currentTableName}
          tableRows={currentTableRows}
          onClose={() => setIsEditTableOpen(false)}
          onDelete={handleDeleteTable}
        />
      )}
      {tableData.map((table, index) => (
        <Draggable
          key={index}
          onStop={(e, data) => handleDrag(e, data, table.id)}
        >
          <form
            id={`table-${table.id}`}
            key={table.id}
            onDoubleClick={() => handleTableDoubleClick(table.id, table.name, table.rows)}
            style={{ position: 'absolute' }}
          >
            <h2>{table.name}</h2>
            <table>
              <thead>
                <tr>
                  <th>Имя</th>
                  <th>Тип</th>
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{row.name}</td>
                    <td>{row.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </Draggable>
      ))}
      {tableData.map((table) =>
        table.rows.map((row, rowIndex) =>
          row.isForeignKey && row.foreignTable ? (
            <Xarrow
              key={`arrow-${table.id}-${rowIndex}`}
              start={`table-${table.id}`}
              end={`table-${row.foreignTable.value}`}
            />
          ) : null
        )
      )}
    </div>
  );
};

export default MainTable;
