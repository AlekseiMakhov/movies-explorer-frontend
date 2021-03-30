import './App.css';
import '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import { 
  Redirect,
  Route, Switch, useHistory, useLocation 
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
  moviesPage, profilePage, promoPage, savedMoviesPage, signinPage, signupPage 
} from '../../configs/links';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import CurrentUser from '../../contexts/CurrentUser';
import { authorize, register, tokenCheck } from '../../utils/auth';
import { searchMovies } from '../../utils/utils';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';
import { CONFLICT_REQUEST, ERROR_CODE, SHORT_MOVIES_DURATION, SUCCESS_CODE } from '../../configs/constants';
import { conflictError, editProfileError } from '../../configs/errors';

function App() {

  const location = useLocation().pathname;
  const history = useHistory();

  //стейты для отображения текста ошибки
  const [errorText, setErrorText] = useState('');
  // стейт токена
  const [token, setToken] = useState('');
  // стейт для текущего пользователя
  const [currentUser, setCurrentUser] = useState({});
  // состояние авторизации
  const [loggedIn, setLoggedIn] = useState(false);
  // стейт состояния проверки токена
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  //определение ширины окна
  const isTablet = useMediaQuery({ query: '(max-width: 920px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 620px)' });
  // код ответа для отображения удачного/неудачного обновления данных пользователя
  const [responseCode, setResponseCode] = useState(0);
  // состояние открытия бокового меню
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // состояние запроса для отображения прелоудера
  const [isLoading, setIsLoading] = useState(false);
  // стейт наличия ошибки запроса
  const [isError, setIsError] = useState(false);
  // стейт для отображения текста "ничего не найдено"
  const [isNotFound, setIsNotFound] = useState(false);
  // состояние чекбокса на странице Фильмы
  const [isActive, setIsActive] = useState(false);
  // состояние чекбокса на странице Сохраненные фильмы
  const [isSavedCheckBox, setIsSavedCheckBox] = useState(false);
  // состояние блокировки формы при запросе
  const [isFormBlocked, setIsFormBlocked] = useState(false);
  // стейт со всеми фильмами с сервера
  const [movies, setMovies] = useState([]);
  // стейт с отфильтрованными по поиску фильмами
  const [findedMovies, setFindedMovies] = useState([]);
  // стейт с отфильтрованными по поиску сохраненными фильмами
  const [findedSavedMovies, setFindedSavedMovies] = useState([]);
  // стейт со всеми сохраненными фильмами
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
  },[token]);

  //сброс стейтов при смене локации
  useEffect(_ => {
    setIsError(false);
    setErrorText('');
    setIsLoading(false);
    setIsNotFound(false);
    setResponseCode(0);
    setIsFormBlocked(false);
  },[location]);

  // Обработка запроса авторизации
  const onLogin = (email, password) => {
    setIsFormBlocked(true);
    authorize(email, password)   
        .then((data) => {
            if (data?.data) {
                localStorage.setItem('token', data.data);
                checkToken();
                setIsError(false);
                setErrorText('');
                history.push(moviesPage);
            }
        })
        .catch(err => {
            setIsError(true);
            setErrorText(err.message);
        })
        .finally(_ => setIsFormBlocked(false));
  };

  // Обработка запроса регистрации
  const onRegister = (name, email, password) => {
    setIsFormBlocked(true);
    register(email, password, name)
      .then((res) => {
          if (res.id) {
            onLogin(email, password);
            setIsError(false);
            setErrorText('');
          }                   
      })
      .catch((err) => {
          setIsError(true);
          setErrorText(err.message);
      })
      .finally(_ => setIsFormBlocked(false));
  };

  // Проверка токена  
  const checkToken = () => {
      if (localStorage.getItem('token')) {
          const token = localStorage.getItem('token');
          tokenCheck(token)
          .then(res => {
              if (res.name) {
                handleLogin();
                setToken(token);
              }
          })
          .catch(err => console.log(err));
      }
  }

  useEffect(_ => {
    if (token) {
      Promise.all([
        mainApi.getProfileInfo(token),
        mainApi.getMovies(token)
      ])
      .then(([user, allSavedMovies]) => {
        setCurrentUser(user);
        const filteredMovies = allSavedMovies.filter(movie => movie.owner === user._id && movie);
        localStorage.setItem('savedMovies', JSON.stringify(filteredMovies));
        return filteredMovies;
      })
      .then(filteredMovies => { 
        setSavedMovies(filteredMovies);
        setFindedSavedMovies(filteredMovies);
      })
      .catch(err => console.log(err));
    }
  },[token]);

  // Обновление данных пользователя
  function handleUpdateUser(name, email) {
    setResponseCode(0);
    setIsFormBlocked(true);
    mainApi.editProfileInfo(name, email, token)
      .then(newUserInfo => {
        setCurrentUser(newUserInfo);
        setResponseCode(SUCCESS_CODE);
        setErrorText('');
      })
      .catch(err => {
        setResponseCode(ERROR_CODE);
        console.log(err.status);
        setErrorText(err.status === CONFLICT_REQUEST ? conflictError : editProfileError);
      })
      .finally(_ => setIsFormBlocked(false));
  }

  // Вход в систему  
  const handleLogin = _ => {
    setLoggedIn(true);
    setIsTokenChecked(true);
  }

  // Выход из системы  
  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('movies');
    localStorage.removeItem('savedMovies');
    setMovies([]);
    setSavedMovies([]);
    setIsSavedCheckBox(false);
    setIsActive(false);
    setCurrentUser({});
    setLoggedIn(false);
    setIsFormBlocked(false);
    setIsTokenChecked(false);
    history.push(promoPage);
  }

  //обработка кнопки поиска фильмов
  const handleSearchClick = e => {

    e.preventDefault();
 
    setIsNotFound(false);

    const isMoviesPage = location === moviesPage ? true : false;
    const key = new RegExp(e.target.closest('.search-form__content').querySelector('.search-form__input').value, 'gi');

    //если поиск первый раз, делаем запрос к серверу
    if (!movies.length && isMoviesPage) {
      setIsLoading(true);
      setIsFormBlocked(true);
      moviesApi.getMovies(token)
        .then(allMovies => {
          setMovies(allMovies)
          return allMovies;
        })
        .then(allMovies => {
          const filteredMovies = searchMovies(allMovies, key);
          localStorage.setItem('movies', JSON.stringify(filteredMovies));
          setFindedMovies(filteredMovies);
          !filteredMovies.length && setIsNotFound(true);
        })
        .catch( _ => {
          setIsError(true);
        })
        .finally( _ => { 
          setIsLoading(false);
          setIsFormBlocked(false);
        })
    }
    //иначе работаем с сохраненными данными
    else {
      // в зависимости от локации фильтруем соответствующие данные, сохраняем их в локальное хранилище
      const moviesStorage = isMoviesPage ? 'movies' : 'savedMovies';
      const allMovies = isMoviesPage ? movies : savedMovies;
      const filteredMovies = searchMovies(allMovies, key);
      isMoviesPage ? setFindedMovies(filteredMovies) : setFindedSavedMovies(filteredMovies);
      localStorage.setItem(moviesStorage, JSON.stringify(filteredMovies));
      !filteredMovies.length && setIsNotFound(true);
    }
  }

  //фильтр фильмов по длительности
  function filterShortMovies () {
    //в зависимости от локации присваиваем переменные
    const isMoviesPage = location === moviesPage ? true : false;
    const moviesStorage = isMoviesPage ? 'movies' : 'savedMovies';
    const checkBoxState = isMoviesPage ? isActive : isSavedCheckBox;
    const locationFindedMovies = isMoviesPage ? findedMovies : findedSavedMovies;

    setIsNotFound(false);

    !checkBoxState 

        ?   localStorage.setItem(moviesStorage, JSON.stringify(locationFindedMovies.filter(e => e.duration <= SHORT_MOVIES_DURATION)))
        :   localStorage.setItem(moviesStorage, JSON.stringify(locationFindedMovies))

    isMoviesPage ? setIsActive(!checkBoxState) : setIsSavedCheckBox(!checkBoxState);

    (!JSON.parse(localStorage.getItem(moviesStorage)).length && !isError) && setIsNotFound(true);
  }

  //обработка клика по кнопке сохранения/удаления
  const handleCardButtonClick = movie => {

    if (location !== moviesPage) {
      //если на странице с сохраненными фильмами, делаем только запрос на удаление
      mainApi.deleteMovie(movie._id, token)
      .then(deletedMovie => {
        const newMovies = savedMovies.filter(e => e.movieId !== deletedMovie.movieId);   
        setIsError(false);
        localStorage.setItem('savedMovies', JSON.stringify(newMovies));
        return newMovies;
      })
      .then(newMovies => {
        setSavedMovies(newMovies);
        setFindedSavedMovies(newMovies);
      })
      .catch( error => { 
        setIsError(true);
        console.log(error);
      })  
    }
    else {
    const savedMovie = savedMovies.find(e => e.movieId === movie.id)  
    savedMovie  
    ? mainApi.deleteMovie(savedMovie._id, token)
      .then(deletedMovie => {
        const newMovies = savedMovies.filter(e => e.movieId !== deletedMovie.movieId);   
        setIsError(false);
        localStorage.setItem('savedMovies', JSON.stringify(newMovies));
        return newMovies;
      })
      .then(newMovies => {
        setSavedMovies(newMovies);
        setFindedSavedMovies(newMovies);
      })
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
      .then(newMovies => {
        setSavedMovies(newMovies)
        setFindedSavedMovies(newMovies);
      })
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
          {/* страница Промо */}
          <Route exact path={promoPage}>
            <Main 
              loggedIn={loggedIn}
              isMobile={isMobile} 
              isTablet={isTablet} 
              openMenu={openMenu}
            />
          </Route>
          {/* страница Фильмы */}
          {isTokenChecked &&
          <ProtectedRoute
            loggedIn={loggedIn}
            exact path={moviesPage}
            component={Movies}
            isMobile={isMobile} 
            isTablet={isTablet} 
            openMenu={openMenu}
            isLoading={isLoading}
            savedMovies={savedMovies}
            isNotFound={isNotFound} 
            isError={isError}
            filterShortMovies={filterShortMovies}
            isActive={isActive}
            onSearchClick={handleSearchClick}
            onCardButtonClick={handleCardButtonClick}
            isFormBlocked={isFormBlocked}
          />}
          {/* страница Сохраненные фильмы */}
          {isTokenChecked &&
            <ProtectedRoute
              loggedIn={loggedIn}
              exact path={savedMoviesPage}
              component={SavedMovies}
              isMobile={isMobile} 
              isTablet={isTablet} 
              openMenu={openMenu}
              isLoading={isLoading}
              isNotFound={isNotFound} 
              isError={isError}
              isFormBlocked={isFormBlocked}
              filterShortMovies={filterShortMovies}
              isActive={isSavedCheckBox}
              onSearchClick={handleSearchClick}
              onCardButtonClick={handleCardButtonClick}
            /> 
          } 
          {/* страница логина */}
          <Route exact path={signinPage}>
            {loggedIn
              ? <Redirect to={moviesPage} />
              : <Login 
                  onLogin={onLogin}
                  isError={isError}
                  isFormBlocked={isFormBlocked}
                  errorText={errorText}
                />
            }
          </Route>
          {/* страница регистрации */}
          <Route exact path={signupPage}>
          {loggedIn
            ? <Redirect to={moviesPage} />
            : <Register 
                onRegister={onRegister} 
                isError={isError}
                isFormBlocked={isFormBlocked}
                errorText={errorText}
              />
          }  
          </Route>
          
          {/* страница профиля */}
          {isTokenChecked &&
          <ProtectedRoute
            loggedIn={loggedIn}
            exact path={profilePage}
            component={Profile}
            isMobile={isMobile} 
            isError={isError}
            errorText={errorText}
            isTablet={isTablet}
            isFormBlocked={isFormBlocked}
            openMenu={openMenu}
            onSaveClick={handleUpdateUser}
            onSignoutClick={handleSignOut}
            responseCode={responseCode}
          />}
          {/* страница не найдена */}
          {isTokenChecked &&
          <Route path='*'>
            <NotFound />
          </Route>
          }
        </Switch>
      </div>
    </CurrentUser.Provider>
  );
}

export default App;
