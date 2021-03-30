import Account from '../Account/Account';
import Navigation from '../Navigation/Navigation';

import './Side-menu.css';

const SideMenu = ({ closeMenu }) => {
    return (
        <div className='side-menu'>
            <div className='side-menu__container'>
                <button className='side-menu__close' onClick={closeMenu}></button>
                
                <div className='side-menu__links'>
                    <Navigation isSideMenu={true}  closeMenu={closeMenu}/>
                </div>
                <Account onClick={closeMenu} />
            </div>
        </div>
        
    )
}

export default SideMenu;