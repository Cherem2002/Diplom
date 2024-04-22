import React from 'react';
import './Create.css';

const Create = () => {
    return (
        <div className="Create">
            <form>
                <div>
                    <label>Название схемы</label>
                    <input type="text" />
                </div>
                <div className='CrBtn'>
                    <button type="submit">Создать</button>
                </div>
                <div className='DlBtn'>
                    <button type="submit">Закрыть</button>
                </div>
            </form>
        </div>
    );
};

export default Create;

