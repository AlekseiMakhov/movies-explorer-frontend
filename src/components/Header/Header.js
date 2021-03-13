import './Header.css';
import cn from 'classnames';
import Button from '../Button/Button';
import { buttonLoginText, regText } from '../../configs/texts';
import Navigation from '../Navigation/Navigation';
import Account from '../Account/Account';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

const Header = ({ type, loggedIn, isMobile, openMenu }) => {

    return (
        <header className={cn('header', 
            { 'header_type_light' : type === 'light' },
            { 'header_type_white' : type === 'white' } 
            )}>
            <div className='header__content'>
                <Logo />
                <div className='header__menu'>
                    {!isMobile && loggedIn && <Navigation />}
                    {!isMobile && !loggedIn && <Link className='header__link' to='/sign-up'>{regText}</Link>}
                    {!loggedIn 
                        ? !isMobile && <Button caption={buttonLoginText} type='login'/>
                        : !isMobile && <Account />}
                    {isMobile && <button type='button' className='header__burger-button' onClick={openMenu}></button>}
                </div>
            </div>
        </header>
    )
}

export default Header;