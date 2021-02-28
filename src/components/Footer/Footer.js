import './Footer.css';
import Divider from '../Divider/Divider';
import { footerText } from '../../configs/texts';
import { facebookLink, githubLink, praktikumLink } from '../../configs/links';

const Footer = () => {
    return (
        <footer className='footer'>
            <p className='footer__text footer__text_type_project'>{footerText}</p>
            <div className='footer__container'>
                <p className='footer__text'>©2021</p>
                <ul className='footer__links'>
                    <li className='footer__link'>
                        <a>{praktikumLink}</a>
                    </li>
                    <li className='footer__link'>
                        <a>{githubLink}</a>
                    </li>
                    <li className='footer__link'>
                        <a>{facebookLink}</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;