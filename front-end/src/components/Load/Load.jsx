import './Load.css';
import Combobox from "react-widgets/Combobox";
import React from 'react';

const Load = () => {

    return (
        <div className="Load">
            <form>
                <div className='ChooseDb'>
                    Выберите бд 
                </div>
                <Combobox
                    data={["1", "2"]}
                />
                <button>Загрузить</button>
            </form>
        </div>
    );
};

export default Load;