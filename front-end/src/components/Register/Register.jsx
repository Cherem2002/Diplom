import './Register.css';
import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ toggleLoginPopup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:4000/register', { email, password });
            console.log(response.data.message); 
        } catch (error) {
            console.error('Ошибка при регистрации:', error.response.data.message);
        }
    };

    const handleToggleLoginPopup = () => {
        toggleLoginPopup();
    };

    return (
        <div className='Register'>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Пароль</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='RegBtn'>
                    <button>Зарегистрироваться</button>
                </div>
                <div className='ClBtn'>
                    <button>Закрыть</button>
                </div>
                <p>
                    Есть аккаунт?
                    <a onClick={handleToggleLoginPopup}>
                        Войдите
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Register;