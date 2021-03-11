import { Link } from 'react-router-dom';
import Account from '../Account/Account';

import './Side-menu.css';

const SideMenu = ({ closeMenu }) => {
    return (
        <div className='side-menu'>
            <div className='side-menu__container'>
                <button className='side-menu__close' onClick={closeMenu}></button>
                <div className='side-menu__links'>
                    <Link className='side-menu__link' to='/'>Главная</Link>
                    <Link className='side-menu__link side-menu__link_active' to='/movies'>Фильмы</Link>
                    <Link className='side-menu__link' to='/saved-movies'>Сохраненные фильмы</Link>
                </div>
                <Account />
            </div>
        </div>
        
    )
}

export default SideMenu;