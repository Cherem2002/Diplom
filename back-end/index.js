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

// Обработчик для входа пользователя
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM "users" WHERE email = $1 AND password = $2', [email, password]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Неверный email или пароль' });
    }

    // В случае успешного входа можно выдать токен доступа или сессию
    // Для примера, можно просто вернуть сообщение об успешном входе
    return res.json({ message: 'Вход выполнен успешно' });
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    res.status(500).send('Ошибка сервера');
  }
});

// Обработчик для регистрации нового пользователя
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Проверяем, существует ли пользователь с таким же email
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Пользователь с таким email уже зарегистрирован' });
    }

    // Если пользователь с таким email не существует, создаем нового пользователя
    const newUser = await pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id', [email, password]);
    const userId = newUser.rows[0].id;

    // Возвращаем идентификатор нового пользователя
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

