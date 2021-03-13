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
                    <div className='footer__links'>
                        <a className='footer__link' target='blank' href={praktikumLink}>Яндекс.Практикум</a>
                        <a className='footer__link' target='blank' href={githubLink}>Github</a>
                        <a className='footer__link' target='blank' href={facebookLink}>Facebook</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;