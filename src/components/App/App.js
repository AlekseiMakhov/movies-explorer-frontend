import './App.css';
import '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import { 
  Redirect, Route, Switch, useHistory, useLocation 
} from 'react-router-dom';

import { useEffect, useState } from 'react';
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

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUser from '../../contexts/CurrentUser';
import { authorize, register, tokenCheck } from '../../utils/auth';
import { searchMovies } from '../../utils/utils';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { SHORT_MOVIES_DURATION } from '../../configs/constants';
import { editProfileError } from '../../configs/errors';

function App() {

  const location = useLocation().pathname;
  const history = useHistory();

  //стейты для отображения текста ошибки
  const [errorText, setErrorText] = useState('');
  const [userName, setUserName] = useState('');

  const [token, setToken] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  //определение ширины окна
  const isTablet = useMediaQuery({ query: '(max-width: 920px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 620px)' });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  //закрывает меню
  const closeMenu = _ => setIsMenuOpen(false);

  //открывает меню
  const openMenu = _ => { 
    setIsMenuOpen(true);
    document.addEventListener('keydown', handleEscButton);
  }  

  //Закрывает меню по escape
  const handleEscButton = e => {
    e.key === 'Escape' && closeMenu();
    document.removeEventListener('keydown', handleEscButton);
  }  

  //проверка токена при загрузке
  useEffect(_ => {
    checkToken();
  },[]);

  //сброс стейтов при смене локации
  useEffect(_ => {
    setIsError(false);
    setErrorText('');
    setIsLoading(false);
    setIsNotFound(false);
    setIsActive(false);
    setMovies([]);
    localStorage.removeItem('movies');
  },[location]);

  // Обработка запроса авторизации
  const onLogin = (email, password) => {
    authorize(email, password)   
        .then((data) => {
            if (data?.data) {
                localStorage.setItem('token', data.data);
                checkToken();
                setIsError(false);
                setErrorText('');
            }
        })
        .catch(err => {
            setIsError(true);
            setErrorText(err.message);
        });
  };

  // Обработка запроса регистрации
  const onRegister = (name, email, password) => {
    register(email, password, name)
      .then((res) => {
          if (res.id) {
              history.push(signinPage);
              setIsError(false);
              setErrorText('');
          }                   
      })
      .catch((err) => {
          setIsError(true);
          setErrorText(err.message);
      });
  };

  // Проверка токена  
  const checkToken = () => {
      if (localStorage.getItem('token')) {
          const token = localStorage.getItem('token');
          tokenCheck(token)
          .then(res => {
              if (res.name) {
                setUserName(res.name);
                handleLogin();
                setToken(token)
              }
          })
          .catch(err => console.log(err));
      }    
  }

  useEffect(_=> {
    if (location === savedMoviesPage) {
      mainApi.getMovies(token)
      .then(movies => {
        setSavedMovies(movies);
      })
      .catch(err=>err);
    }
  },[location])

  useEffect(_ => {
    if (token) {
      Promise.all([
        mainApi.getProfileInfo(token),
        mainApi.getMovies(token)
      ])
      .then(([user, allSavedMovies]) => {
        setCurrentUser(user);
        const filteredMovies = allSavedMovies.filter(movie => movie.owner === user._id);
        localStorage.setItem('savedMovies', JSON.stringify(filteredMovies));
        return filteredMovies;
      })
      .then(filteredMovies => setSavedMovies(filteredMovies))
      .catch(err => console.log(err));
    }
  },[token]);

  // Обновление данных пользователя
  function handleUpdateUser(name, email) {
    mainApi.editProfileInfo(name, email, token)
      .then(newUserInfo => {
        setCurrentUser(newUserInfo);
        setIsError(false);
        setErrorText('');
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
        setErrorText(editProfileError);
      });
  }

  // Вход в систему  
  const handleLogin = _ => {
    setLoggedIn(true);
    history.push(moviesPage);
  }

  // Выход из системы  
  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('movies');
    localStorage.removeItem('savedMovies');
    setCurrentUser({});
    setLoggedIn(false);
    history.push(promoPage);
  }

  //обработка кнопки поиска фильмов
  const handleSearchClick = e => {

    e.preventDefault();

    const isMoviesPage = location === moviesPage;
    const key = new RegExp(e.target.closest('.search-form__content').querySelector('.search-form__input').value, 'gi');
    const api = isMoviesPage ? moviesApi : mainApi;

    setIsLoading(true);

    api.getMovies(token)
      .then(allMovies => {
        const filteredMovies = searchMovies(allMovies, key);
        isMoviesPage ? setMovies(filteredMovies) : setSavedMovies(filteredMovies);
        localStorage.setItem(isMoviesPage ? 'movies': 'savedMovies', JSON.stringify(filteredMovies));
        !filteredMovies.length && setIsNotFound(true);
      })
      .catch( _ => {
        setIsError(true);
      })
      .finally( _ => setIsLoading(false))
  }

  function filterShortMovies () {
    const items = location === moviesPage ? movies : savedMovies;
    const moviesStorage = location === moviesPage ? 'movies' : 'savedMovies';

    !isActive 
        ?   localStorage.setItem(moviesStorage, JSON.stringify(items.filter(e => e.duration <= SHORT_MOVIES_DURATION)))
        :   localStorage.setItem(moviesStorage, JSON.stringify(items))
    setIsActive(!isActive);

    (!JSON.parse(localStorage.getItem(moviesStorage))||[]).length && !isError && setIsNotFound(true);
  }

  const handleCardButtonClick = movie => {

    if (location !== moviesPage) {

      mainApi.deleteMovie(movie._id, token)
      .then(deletedMovie => {
        const newMovies = savedMovies.filter(e => e.movieId !== deletedMovie.movieId);   
        setIsError(false);
        localStorage.setItem('savedMovies', JSON.stringify(newMovies));
        return newMovies;
      })
      .then(newMovies => setSavedMovies(newMovies))
      .catch( error => { 
        setIsError(true);
        console.log(error);
      })  
    }
    else {
    const saveditem = savedMovies.find(e => e.movieId === movie.id)  
    saveditem  
    ? mainApi.deleteMovie(saveditem._id, token)
      .then(deletedMovie => {
        const newMovies = savedMovies.filter(e => e.movieId !== deletedMovie.movieId);   
        setIsError(false);
        localStorage.setItem('savedMovies', JSON.stringify(newMovies));
        return newMovies;
      })
      .then(newMovies => setSavedMovies(newMovies))
      .catch( error => { 
        setIsError(true);
        console.log(error);
      })  
    : mainApi.addMovie(movie, token)
      .then(savedMovie => {
        setIsError(false);
        setSavedMovies([...savedMovies, savedMovie]);
        localStorage.setItem('savedMovies', JSON.stringify([...savedMovies, savedMovie]));
        return [...savedMovies, savedMovie];
      })
      .then(newMovies => setSavedMovies(newMovies))
      .catch ( error => {
        setIsError(true);
        console.log(error);
      })
    }
  }

  return (
    <CurrentUser.Provider value={currentUser}>
      <div className="app">
        {
          isMenuOpen 
            &&  <SideMenu 
                  closeMenu={closeMenu} 
                />
        }
        <Switch>
          <Route exact path={promoPage}>
            <Main 
              loggedIn={loggedIn}
              isMobile={isMobile} 
              isTablet={isTablet} 
              openMenu={openMenu}
            />
          </Route>

          <ProtectedRoute
            loggedIn={loggedIn}
            path={moviesPage}
            component={Movies}
            isMobile={isMobile} 
            isTablet={isTablet} 
            openMenu={openMenu}
            isLoading={isLoading}
            savedMovies={savedMovies}
            movies={movies}
            isNotFound={isNotFound} 
            isError={isError}
            filterShortMovies={filterShortMovies}
            isActive={isActive}
            onSearchClick={handleSearchClick}
            onCardButtonClick={handleCardButtonClick}
          />
          <ProtectedRoute
            loggedIn={loggedIn}
            path={savedMoviesPage}
            component={SavedMovies}
            isMobile={isMobile} 
            isTablet={isTablet} 
            openMenu={openMenu}
            isLoading={isLoading}
            savedMovies={savedMovies}
            movies={savedMovies}
            isNotFound={isNotFound} 
            isError={isError}
            filterShortMovies={filterShortMovies}
            isActive={isActive}
            onSearchClick={handleSearchClick}
            onCardButtonClick={handleCardButtonClick}
          /> 

          <Route exact path={signinPage}>
            <Login 
              onLogin={onLogin} 
              isError={isError}
              errorText={errorText}  
            />
          </Route>

          <Route exact path={signupPage}>
            <Register 
              onRegister={onRegister} 
              isError={isError}
              errorText={errorText} 
            />
          </Route>

          <ProtectedRoute
            loggedIn={loggedIn}
            path={profilePage}
            component={Profile}
            isMobile={isMobile} 
            isError={isError}
            errorText={errorText}
            isTablet={isTablet} 
            openMenu={openMenu}
            onSaveClick={handleUpdateUser}
            onSignoutClick={handleSignOut}
          />

          <Route exact path={notFoundPage}>
            <NotFound />
          </Route>

          <Route path={promoPage}>
            {
              loggedIn 
                ? <Redirect to={moviesPage} />
                : <Redirect to={promoPage} />
            }
          </Route>

        </Switch>
      </div>
    </CurrentUser.Provider>
  );
}

export default App;
