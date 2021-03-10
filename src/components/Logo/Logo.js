import { Link } from 'react-router-dom';
import { mainPageLink } from '../../configs/links';
import './Logo.css';

const Logo = () => {
    return (
        <Link className='logo' to={mainPageLink}>
            <div className='logo__icon'></div>
        </Link>
    )
}

export default Logo;