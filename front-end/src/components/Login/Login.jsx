import './Login.css';
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ toggleRegPopup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('/login', { email, password });
            console.log(response.data.message); 
        } catch (error) {
            console.error('Ошибка при входе:', error.response.data.message);
        }
    };

    const handleToggleRegPopup = () => {
        toggleRegPopup(); 
    };

    return (
        <div className='Login'>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Пароль</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='RegBtn'>
                    <button>Войти</button>
                </div>
                <div className='ClBtn'>
                    <button>Закрыть</button>
                </div>
                <p>
                    Нету аккаунта?
                    <a onClick={handleToggleRegPopup}>
                        Зарегистрируйтесь
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;