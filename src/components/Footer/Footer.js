import './Footer.css';
import { 
    copyright, footerText, praktikum, github, facebook 
} from '../../configs/texts';

import { 
    facebookLink, githubLink, praktikumLink 
} from '../../configs/links';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footer__content'>
                <p className='footer__text footer__text_type_project'>{footerText}</p>
                <div className='footer__container'>
                    <p className='footer__text'>{copyright}</p>
                    <div className='footer__links'>
                        <a className='footer__link' target='blank' href={praktikumLink}>{praktikum}</a>
                        <a className='footer__link' target='blank' href={githubLink}>{github}</a>
                        <a className='footer__link' target='blank' href={facebookLink}>{facebook}</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;