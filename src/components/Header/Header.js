import './Header.css';
import cn from 'classnames';
import Button from '../Button/Button';
import { loginText, regText } from '../../configs/texts';
import Navigation from '../Navigation/Navigation';
import Account from '../Account/Account';
import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';
import { signupPage } from '../../configs/links';

const Header = ({ 
    type, loggedIn, isTablet, openMenu 
}) => {

    return (
        <header className={cn('header', 
            { 'header_type_light' : type === 'light' },
            { 'header_type_white' : type === 'white' } 
            )}>
            <div className='header__content'>
                <Logo />
                <div className='header__menu'>
                    {
                        !isTablet && loggedIn && <Navigation />
                    }
                    {
                        !loggedIn && <Link className='header__link' to={signupPage}>{regText}</Link>
                    }
                    {
                        !loggedIn 
                            ? <Button caption={loginText} type='login' />
                            : !isTablet && <Account />
                    }
                    {isTablet && loggedIn && <button type='button' className='header__burger-button' onClick={openMenu}></button>}
                </div>
            </div>
        </header>
    )
}

export default Header;