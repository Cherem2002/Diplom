import React, { useState } from 'react';
import './Sticker.css';

const Sticker = ({onDelete}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [text, setText] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const offsetX = e.clientX - dragStart.x;
            const offsetY = e.clientY - dragStart.y;
            setPosition({ x: position.x + offsetX, y: position.y + offsetY });
            setDragStart({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    return (
        <div
            className="Sticker"
            style={{ top: position.y, left: position.x }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Введите текст..."
                className="StickerText"
            />
            <button onClick={onDelete}>Удалить</button>
        </div>
    );
};

export default Sticker;

