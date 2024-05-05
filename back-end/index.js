import express from 'express';
const app = express();
const port = 4000;
import pg from 'pg';
import cors from 'cors';



const { Pool } = pg;

app.use(cors());


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Diplom',
  password: '12072002',
  port: 1880,
});

app.get('/sql_type', (req, res) => {
  
  pool.query('SELECT name_sql FROM "SQL"', (error, result) => {
    if (error) {
      console.error('Ошибка при выполнении запроса:', error);
      res.status(500).send('Ошибка сервера');
    } else {
      res.json(result.rows);
    }
  });
});

app.get('/', (req, res) => {
  res.send('Привет, мир!');
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

