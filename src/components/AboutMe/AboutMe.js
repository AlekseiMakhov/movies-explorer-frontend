import { facebookLink, githubLink } from '../../configs/links';
import { aboutMeName, aboutMeProfession, aboutMeDescription } from '../../configs/texts';
import Portfolio from '../Portfolio/Portfolio';
import './AboutMe.css';

const AboutMe = () => {
    return (
        <section className='about-me'>
            <div className='about-me__content'>
                <h2 className='main-title'>Студент</h2>
                <div className='about-me__container'>
                    <div className='about-me__info'>
                        <h3 className='about-me__name'>{aboutMeName}</h3>
                        <p className='about-me__profession'>{aboutMeProfession}</p>
                        <p className='about-me__description'>{aboutMeDescription}</p>
                        <div className='about-me__links'>
                            <a className='about-me__link' href={facebookLink} target='blank'>Facebook</a>
                            <a className='about-me__link' href={githubLink} target='blank'>Github</a>
                        </div>
                    </div>
                    <div className='about-me__photo'></div>
                </div>
                <Portfolio />
            </div>
        </section>
    )
}

export default AboutMe;