import './Header.css';
// import '../Navigation/Navigation';
import Button from '../Button/Button';
import { buttonLoginText, regText } from '../../configs/texts';

const Header = () => {
    return (
        <header className='header'>
            <div className='header__content'>
                <a className='header__logo' src='#'></a>
                <div className='header__menu'>
                    {/* <Navigation /> */}
                    <p>{regText}</p>
                    <Button caption={buttonLoginText} type='logout'/>
                </div>
            </div>
        </header>
    )
}

export default Header;