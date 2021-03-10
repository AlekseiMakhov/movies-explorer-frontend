import './Header.css';
import cn from 'classnames';
import Button from '../Button/Button';
import { buttonLoginText, regText } from '../../configs/texts';
import Navigation from '../Navigation/Navigation';
import Account from '../Account/Account';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

const Header = ({ type, loggedIn }) => {
    return (
        <header className={cn('header', { 'header_type_light' : type === 'light' } )}>
            <div className='header__content'>
                <Logo />
                <div className='header__menu'>
                    {loggedIn && <Navigation />}
                    {!loggedIn && <Link className='header__link' to='/sign-up'>{regText}</Link>}
                    {!loggedIn 
                        ? <Button caption={buttonLoginText} type='login'/>
                        : <Account />}
                </div>
            </div>
        </header>
    )
}

export default Header;