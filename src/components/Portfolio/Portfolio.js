import { staticSiteLink, adaptiveSiteLink, oneSiteApp } from '../../configs/links';
import './Portfolio.css';

const Portfolio = () => {
    return (
        <div className='portfolio'>
            <h3 className='portfolio__title'>Портфолио</h3>
            <div className='portfolio__link'>
                <a className='portfolio__link-text' src={staticSiteLink}>Статичный сайт</a>
                <a className='portfolio__link-text portfolio__link-text_type_arrow' src={staticSiteLink}>
                    <div className='portfolio__link-arrow'></div>
                </a>
            </div>
            <div className='portfolio__link'>
                <a className='portfolio__link-text' src={adaptiveSiteLink}>Адаптивный сайт</a>
                <a className='portfolio__link-text' src={adaptiveSiteLink}>
                    <div className='portfolio__link-arrow'></div>
                </a>
            </div>
            <div className='portfolio__link'>
                <a className='portfolio__link-text' src={oneSiteApp}>Одностраничное приложение</a>
                <a className='portfolio__link-text portfolio__link-text_type_arrow' src={oneSiteApp}>
                    <div className='portfolio__link-arrow'></div>
                </a>
            </div>
        </div>
    )
}

export default Portfolio;