import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Create from '../Create/Create';
import './Menu.css';

const Menu = ({ toggleCreatePopup }) => {


    return (
        <div className='Bar-menu'>
            <div className='Creat' onClick={toggleCreatePopup}>
                <a>Создать</a>
            </div>
            <div className='Down'>
                <a>Загрузить</a>
            </div>
            <div className='Sav'>
                <a>Сохранить</a>
            </div>
        </div>
    );
};

export default Menu;
