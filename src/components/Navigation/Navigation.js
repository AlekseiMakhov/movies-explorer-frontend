import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';
import './Navigation.css';
import { 
    moviesPage, promoPage, savedMoviesPage 
} from '../../configs/links';

import { 
    navlink1, navlink2, navlink3 
} from '../../configs/texts';

const Navigation = ({ isSideMenu, closeMenu }) => {
    const location = useLocation();
    return (
        <nav className={cn('navigation', {'navigation_type_side': isSideMenu })} >
            {isSideMenu 
                &&   <Link className={
                        cn('navigation__link_type_side', { 'navigation__link_type_side_active' : location.pathname===promoPage } )} 
                        to={promoPage} onClick={closeMenu}>{navlink1}
                    </Link>
            }

            {isSideMenu
                ?   <Link className={
                        cn('navigation__link_type_side', { 'navigation__link_type_side_active' : location.pathname===moviesPage } )}
                        to={moviesPage} onClick={closeMenu}>{navlink2}
                    </Link>
                :   <Link className={
                        cn('navigation__link', { 'navigation__link_active' : location.pathname===moviesPage } )}
                        to={moviesPage}>{navlink2}
                    </Link>    
            }

            {isSideMenu
                ?   <Link className={
                        cn('navigation__link_type_side', 
                            { 'navigation__link_type_side_active' : location.pathname===savedMoviesPage } 
                        )}
                        to={savedMoviesPage} onClick={closeMenu}>{navlink3}
                    </Link>
                :   <Link className={
                        cn('navigation__link', 
                            { 'navigation__link_active' : location.pathname===savedMoviesPage } 
                        )}
                        to={savedMoviesPage}>{navlink3}
                    </Link>    
            }
            
        </nav>
    )
}

export default Navigation;