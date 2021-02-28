import { facebookLink, githubLink } from '../../configs/links';
import { aboutMeName, aboutMeProfession, aboutMeDescription } from '../../configs/texts';
import Portfolio from '../Portfolio/Portfolio';
import './AboutMe.css';

const AboutMe = () => {
    return (
        <section className='about-me'>
            <h2 className='main-title'></h2>
            <div className='about-me__container'>
                <div className='about-me__content'>
                    <h3 className='about-me__name'>{aboutMeName}</h3>
                    <p className='about-me__profession'>{aboutMeProfession}</p>
                    <p className='about-me__description'>{aboutMeDescription}</p>
                    <div className='about-me__links'>
                        <a className='about-me__link' src={facebookLink}>Facebook</a>
                        <a className='about-me__link' src={githubLink}>Github</a>
                    </div>
                </div>
                <img className='about-me__photo' src={myPhoto} alt='my photo'/>
            </div>
            <Portfolio />
        </section>
    )
}

export default AboutMe;