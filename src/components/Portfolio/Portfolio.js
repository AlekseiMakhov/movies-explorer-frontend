import { staticSiteLink, adaptiveSiteLink, oneSiteApp } from '../../configs/links';
import './Portfolio.css';

const Portfolio = () => {
    return (
        <div className='portfolio'>
            <h3 className='portfolio__title'>Портфолио</h3>
            <div className='portfolio__link'>
                <a className='portfolio__link-text' href={staticSiteLink} target='blank' >Статичный сайт</a>
                <a className='portfolio__link-text portfolio__link-text_type_arrow' href={staticSiteLink} target='blank'>
                    <div className='portfolio__link-arrow'></div>
                </a>
            </div>
            <div className='portfolio__link'>
                <a className='portfolio__link-text' href={adaptiveSiteLink} target='blank'>Адаптивный сайт</a>
                <a className='portfolio__link-text' href={adaptiveSiteLink} target='blank'>
                    <div className='portfolio__link-arrow'></div>
                </a>
            </div>
            <div className='portfolio__link'>
                <a className='portfolio__link-text' href={oneSiteApp} target='blank'>Одностраничное приложение</a>
                <a className='portfolio__link-text portfolio__link-text_type_arrow' href={oneSiteApp} target='blank'>
                    <div className='portfolio__link-arrow'></div>
                </a>
            </div>
        </div>
    )
}

export default Portfolio;