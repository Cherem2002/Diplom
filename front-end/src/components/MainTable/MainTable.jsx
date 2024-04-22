import React, { useState } from 'react';
import './MainTable.css';
import Table from '../Table/Table';
import Draggable from 'react-draggable';



const MainTable = ({ tableData }) => {
  console.log('Пришедшие данные:');
  console.log(tableData);

  if (!tableData || !tableData.length) {
    return null; // Возвращаем null, чтобы не создавать никаких элементов
  }

  return (
    <div className="MainTable">
      {tableData.map((table, index) => (
        <Draggable key={index}>
          <form key={table.id}>
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
