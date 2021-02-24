import './Header.css';
// import '../Navigation/Navigation';
import Button from '../Button/Button';
import { buttonLoginText, regText } from '../../configs/texts';

const Header = () => {
    return (
        <header className='header'>
            <div className='header__content'>
                <a className='header__logo' src='#'></a>
                {/* <Navigation />
                <div className='header__account'>
                    <p className='header__text_type_account'></p>
                    <div className='header__account-icon'></div>
                </div> */}

                <p>{regText}</p>
                <Button caption={buttonLoginText}/>
            </div>
        </header>
    )
}

export default Header;