import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import './Navigation.css';

const Navigation = () => {
    const location = useLocation();
    return (
        <nav className='navigation'>
            <Link className={cn( 'navigation__link', { 'navigation__link_active' : location.pathname==='/movies' } )} to='/movies'>Фильмы</Link>
            <Link className={cn( 'navigation__link', { 'navigation__link_active' : location.pathname==='/saved-movies' } )} to='/saved-movies'>Сохраненные фильмы</Link>
        </nav>
    )
}

export default Navigation;