import { techsText, techsTitle } from '../../configs/texts';
import './Techs.css';

const Techs = () => {
    return (
        <section className='techs'>
            <h2 className='main-title'></h2>
            <h4 className='techs__title'>{techsTitle}</h4>
            <p className='techs__text'>{techsText}</p>
            <ul className='techs__list'>
                <li className='techs__list-element'>HTML</li>
                <li className='techs__list-element'>CSS</li>
                <li className='techs__list-element'>JS</li>
                <li className='techs__list-element'>React</li>
                <li className='techs__list-element'>Git</li>
                <li className='techs__list-element'>Express.js</li>
                <li className='techs__list-element'>mongoDB</li>
            </ul>
        </section>
    )
}

export default Techs;