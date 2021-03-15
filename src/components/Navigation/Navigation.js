import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import './Navigation.css';
import { moviesPage, savedMoviesPage } from '../../configs/links';
import { navlink2, navlink3 } from '../../configs/texts';

const Navigation = () => {
    const location = useLocation();
    return (
        <nav className='navigation'>
            <Link className={cn( 'navigation__link', { 'navigation__link_active' : location.pathname===moviesPage } )} to={moviesPage}>{navlink2}</Link>
            <Link className={cn( 'navigation__link', { 'navigation__link_active' : location.pathname===savedMoviesPage } )} to={savedMoviesPage}>{navlink3}</Link>
        </nav>
    )
}

export default Navigation;