import Divider from '../Divider/Divider';
import './AboutProject.css';

const AboutProject = () => {
    return (
        <section className='about-project'>
            <h2 className='about-project__title'>О проекте</h2>
            <Divider bold={true}/>
            <div className='about-project__info'>
                <p className='about-project__subtitle'></p>
            </div>
        </section>
    )
}

export default AboutProject;