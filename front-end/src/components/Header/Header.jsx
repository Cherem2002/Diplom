import bar from './bar.png';
import tb from './tb.png';
import note from './note.png';
import im from './im.png';
import ex from './ex.png';
import back from './back.png';
import forward from './forward.png';
import './Header.css';
import Menu from '../Menu/Menu';
import Sticker from '../Sticker/Sticker';
import React, { useState } from 'react';
import Create from '../Create/Create';
import Export from '../Export/Export';
import Import from '../Import/Import';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Table from '../Table/Table';


const Header = ({ setTableData, tableData }) => {
    const [isGuestMenuOpen, setGuestMenuOpen] = useState(false);
    const [isBarMenuOpen, setBarMenuOpen] = useState(false);
    const [isStickerOpen, setIsStickerOpen] = useState(false);
    const [stickers, setStickers] = useState([]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isExportOpen, setExportOpen] = useState(false);
    const [isImportOpen, setImportOpen] = useState(false);
    const [isRegOpen, setRegOpen] = useState(false);
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isTableOpen, setTableOpen] = useState(false);

    const handleTableData = (data) => {
        setTableData(data);
      };


    const toggleTablePopup = () => {
        setTableOpen(true);
    }

    const toggleCreatePopup = () => {
        setIsCreateOpen(true);
    };

    const toggleExportPopup = () => {
        setExportOpen(true);
    };

    const toggleImportPopup = () => {
        setImportOpen(true);
    };

    const toggleRegPopup = () => {
        setRegOpen(true);
        setLoginOpen(false);
    };

    const toggleLoginPopup = () => {
        setLoginOpen(true);
        setRegOpen(false);
    };

    const toggleGuestMenu = () => {
        setGuestMenuOpen(!isGuestMenuOpen);
    };

    const toggleBarMenu = () => {
        setBarMenuOpen(!isBarMenuOpen);
    };

    const handleIconClick = () => {
        const newStickers = [...stickers, <Sticker key={stickers.length} onDelete={() => handleStickerDelete(stickers.length)} />];
        setStickers(newStickers);
    };

    const handleStickerDelete = (index) => {
        const updatedStickers = stickers.filter((sticker, i) => i !== index);
        setStickers(updatedStickers);
    };

    return (
        <header className='Header'>
            {isCreateOpen && <Create />}
            {isExportOpen && <Export tableData={tableData} />}
            {isImportOpen && <Import />}
            {isRegOpen && <Register toggleLoginPopup={toggleLoginPopup} />}
            {isLoginOpen && <Login toggleRegPopup={toggleRegPopup} />}
            {isTableOpen && <Table setTableOpen={setTableOpen} setTableData={setTableData} tableData={tableData}/>}
            <div className='Bar' onClick={toggleBarMenu}>
                <img src={bar} alt='Бар' />
                {isBarMenuOpen && <Menu toggleCreatePopup={toggleCreatePopup} />}
            </div>
            <div className='Steps'>
                <div className='Back'>
                    <img src={back} alt='Назад' />
                </div>
                <div className='Forward'>
                    <img src={forward} alt='Вперёд' />
                </div>
            </div>
            <div className='NT'>
                <div className="Note">
                    <img src={note} alt='Стикер' onClick={handleIconClick} />
                    {stickers.map((sticker, index) => (
                        <React.Fragment key={index}>{sticker}</React.Fragment>
                    ))}
                </div>
                <div className='Table' onClick={toggleTablePopup}>
                    <img src={tb} alt='Таблица' />
                </div>
            </div>
            <div className='im-ex'>
                <div className='Import' onClick={toggleImportPopup}>
                    <img src={im} alt='Импорт' />
                </div>
                <div className='Export' onClick={toggleExportPopup}>
                    <img src={ex} alt='Экспорт' />
                </div>
            </div>
            <div className='Name'>
                DBplanner
            </div>
            <div className='Login-link' onClick={toggleGuestMenu}>
                {isGuestMenuOpen ? (
                    <>
                        <a onClick={toggleLoginPopup}>Войти</a>
                        <a onClick={toggleRegPopup}>Зарегистрироваться</a>
                    </>
                ) : (
                    <span>Гость</span>
                )}
            </div>
        </header>
    );
};
export default Header;