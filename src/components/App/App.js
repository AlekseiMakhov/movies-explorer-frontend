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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 1280px)' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = _ => setIsMenuOpen(false);
  const openMenu = _ => setIsMenuOpen(true);

  return (
    <div className="app">
      {
        isMenuOpen && <SideMenu closeMenu={closeMenu} />
      }
      <Switch>
        <Route exact path='/'>
          <Main isMobile={isMobile} openMenu={openMenu} />
        </Route>
        <Route exact path='/movies'>
          <Movies isMobile={isMobile} openMenu={openMenu} />
        </Route>  
        <Route exact path='/saved-movies'>
          <SavedMovies isMobile={isMobile} openMenu={openMenu} />
        </Route>  
        <Route exact path='/sign-in'>
          <Login />
        </Route>
        <Route exact path='/sign-up'>
          <Register />
        </Route>
        <Route exact path='/profile'>
          <Profile isMobile={isMobile} openMenu={openMenu} />
        </Route>
        <Route exact path='/not-found'>
          <NotFound />
        </Route>
        <Route path='/'>
          {loggedIn ? <Redirect to='/saved-movies'/> : <Redirect to='/'/>}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
