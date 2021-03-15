import './App.css';
import '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import SideMenu from '../Side-menu/Side-menu';
import { useMediaQuery } from 'react-responsive';
import { 
  moviesPage, profilePage, promoPage, savedMoviesPage, signinPage, signupPage, notFoundPage 
} from '../../configs/links';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const isTablet = useMediaQuery({ query: '(max-width: 920px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 620px)' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = _ => setIsMenuOpen(false);
  const openMenu = _ => setIsMenuOpen(true);

  return (
    <div className="app">
      {
        isMenuOpen && <SideMenu closeMenu={closeMenu} />
      }
      <Switch>
        <Route exact path={promoPage}>
          <Main isMobile={isMobile} isTablet={isTablet} openMenu={openMenu} />
        </Route>
        <Route exact path={moviesPage}>
          <Movies isMobile={isMobile} isTablet={isTablet} openMenu={openMenu} />
        </Route>  
        <Route exact path={savedMoviesPage}>
          <SavedMovies isMobile={isMobile} isTablet={isTablet} openMenu={openMenu} />
        </Route>  
        <Route exact path={signinPage}>
          <Login />
        </Route>
        <Route exact path={signupPage}>
          <Register />
        </Route>
        <Route exact path={profilePage}>
          <Profile isMobile={isMobile} isTablet={isTablet} openMenu={openMenu} />
        </Route>
        <Route exact path={notFoundPage}>
          <NotFound />
        </Route>
        <Route path='/'>
          {
            loggedIn 
              ? <Redirect to={moviesPage} /> 
              : <Redirect to={promoPage} />
          }
        </Route>
      </Switch>
    </div>
  );
}

export default App;
