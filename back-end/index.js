import express from 'express';
const app = express();
const port = 4000;
import pg from 'pg';
import cors from 'cors';

const { Pool } = pg;

app.use(cors());
app.use(express.json());


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Diplom',
  password: '12072002',
  port: 1880,
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const user = await pool.query('SELECT * FROM "users" WHERE email = $1 AND password = $2', [email, password]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    console.log('Вход выполнен успешно');
    return res.json({ message: 'Вход выполнен успешно' });
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    res.status(500).send('Ошибка сервера');
  }
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  console.log('Полученные данные:', req.body);

  try {
    // Проверка существующего пользователя
    const existingUser = await pool.query('SELECT * FROM "users" WHERE email = $1', [email]);
    console.log('Результат проверки существующего пользователя:', existingUser.rows);
    
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Пользователь с таким email уже зарегистрирован' });
    }

    // Вставка нового пользователя
    const newUser = await pool.query('INSERT INTO "users" (email, password) VALUES ($1, $2) RETURNING id_user', [email, password]);
    console.log('Результат вставки нового пользователя:', newUser.rows);
    
    const userId = newUser.rows[0].id_user;

    // Возвращение id нового пользователя
    return res.json({ userId });
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    res.status(500).send('Ошибка сервера');
  }
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

