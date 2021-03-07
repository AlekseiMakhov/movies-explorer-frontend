import { aboutProjectSub1,
    aboutProjectSub2, aboutProjectText1, aboutProjectText2 
} from '../../configs/texts';
import './AboutProject.css';

const AboutProject = () => {
    return (
        <section className='about-project'>
            <div className='about-project__content'>
                <h2 className='main-title'>О проекте</h2>
                <div className='about-project__info'>
                    <h4 className='about-project__subtitle'>{aboutProjectSub1}</h4>
                    <h4 className='about-project__subtitle'>{aboutProjectSub2}</h4>
                    <p className='about-project__text'>{aboutProjectText1}</p>
                    <p className='about-project__text'>{aboutProjectText2}</p>
                </div>
                <div className='about-project__timeline'>
                    <p className='about-project__text about-project__text_type_week-1'>1 неделя</p>
                    <p className='about-project__text about-project__text_type_week-4'>4 недели</p>
                    <p className='about-project__text about-project__text_type_bottom'>Back-end</p>
                    <p className='about-project__text about-project__text_type_bottom'>Front-end</p>
                </div>
            </div>
        </section>
    )
}

export default AboutProject;