import './Footer.css';
import { footerText } from '../../configs/texts';
import { facebookLink, githubLink, praktikumLink } from '../../configs/links';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer__content'>
                <p className='footer__text footer__text_type_project'>{footerText}</p>
                <div className='footer__container'>
                    <p className='footer__text'>©2021</p>
                    <ul className='footer__links'>
                        <li className='footer__link'>
                            <a src={praktikumLink}>Яндекс.Практикум</a>
                        </li>
                        <li className='footer__link'>
                            <a src={githubLink}>Github</a>
                        </li>
                        <li className='footer__link'>
                            <a src={facebookLink}>Facebook</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;