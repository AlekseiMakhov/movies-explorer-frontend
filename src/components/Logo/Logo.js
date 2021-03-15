import { Link } from 'react-router-dom';
import { promoPage } from '../../configs/links';
import './Logo.css';

const Logo = () => {
    return (
        <Link className='logo' to={promoPage}>
            <div className='logo__icon'></div>
        </Link>
    )
}

export default Logo;