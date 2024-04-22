import React, { useState } from 'react';
import './MainTable.css';
import Table from '../Table/Table';


const MainTable = ({ tableData }) => {
  console.log('Пришедшие данные:');
  console.log(tableData);

  if (!tableData || !tableData.name || !tableData.rows) {
    return null; // Возвращаем null, чтобы не создавать никаких элементов
  }

  return (
    <div className="MainTable">
      <form>
        <h2>{tableData.name}</h2>
        <table>
          <thead>
            <tr>
              <th>Имя</th>
              <th>Тип</th>
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default MainTable;
