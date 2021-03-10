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

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="app">
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route exact path='/movies'>
          <Movies />
        </Route>  
        <Route exact path='/saved-movies'>
          <SavedMovies />
        </Route>  
        <Route exact path='/sign-in'>
          <Login />
        </Route>
        <Route exact path='/sign-up'>
          <Register />
        </Route>
        <Route exact path='/profile'>
          <Profile />
        </Route>
        <Route exact path='/not-found'>
          <NotFound />
        </Route>
        <Route path='/'>
          {loggedIn ? <Redirect to='/movies'/> : <Redirect to='/'/>}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
