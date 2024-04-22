import React, { useState } from 'react';
import './Sticker.css';
import Draggable from 'react-draggable';

const Sticker = ({ onDelete }) => {

    const [text, setText] = useState('');

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    return (
        <Draggable>
            <div className="Sticker">
                <textarea
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Введите текст..."
                    className="StickerText"
                />
                <button onClick={onDelete}>Удалить</button>
            </div>
        </Draggable>
    );
};

export default Sticker;

