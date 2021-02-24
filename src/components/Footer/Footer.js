import './Footer.css';
import Divider from '../Divider/Divider';
import { footerText } from '../../configs/texts';
import { facebookLink, githubLink, praktikumLink } from '../../configs/links';

const Footer = () => {
    return (
        <footer className='footer'>
            <p className='footer__text footer__text_type_project'>{footerText}</p>
            <Divider bold={false}/>
            <div className='footer__container'>
                <p className='footer__text'>©2021</p>
                <ul className='footer__links-list'>
                    <li className='footer__list-element'>
                        <a>{praktikumLink}</a>
                    </li>
                    <li className='footer__list-element'>
                        <a>{githubLink}</a>
                    </li>
                    <li className='footer__list-element'>
                        <a>{facebookLink}</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;