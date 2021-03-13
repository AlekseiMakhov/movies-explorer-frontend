import Logo from '../Logo/Logo';
import './Welcome.css';

const Welcome = ({ welcomeText }) => {
    return (
        <div className='welcome'>
            <Logo />
            <h3 className='welcome__text'>{welcomeText}</h3>
        </div>
        
    )
}

export default Welcome;