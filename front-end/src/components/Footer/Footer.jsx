import minus from './minus.png';
import plus from './plus.png';
import './Footer.css';


const Footer = () => {


    return (
        <div className='Footer'>
            <div className='PM'>
                <img src={minus} alt='Минус' style={{ width: '20px', height: '20px' }} />
                <div className='Zoom'>
                    100
                </div>
                <img src={plus} alt='Плюс' style={{ width: '20px', height: '20px' }} />
            </div>
        </div>
    );
};
export default Footer;