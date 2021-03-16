import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import Footer from '../Footer/Footer';
import api from '../../utils/MoviesApi';
import { useState } from 'react';

const Movies = ({ isMobile, isTablet, openMenu }) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);
    const [movies, setMovies] = useState([]);
    const [isActive, setIsActive] = useState(false);

    const filterShortMovies = _ => {

        !isActive 
            ?   localStorage.setItem('movies', JSON.stringify(movies.filter(e => e.duration<=40)))
            :   localStorage.setItem('movies', JSON.stringify((movies)))
        setIsActive(!isActive);
    }
    
    const onSearchClick = event => {
        setIsLoading(true);
        const filter = new RegExp(event.target.closest('.search-form__content').querySelector('.search-form__input').value, 'gi');
        api.getMovies()
            .then(res => {
                const filteredMovies = res.filter(movie => {
                    return filter.test(movie.nameRU)
                        ||filter.test(movie.nameEN)
                        ||filter.test(movie.description)
                        ||filter.test(movie.director) && movie
                })
                localStorage.setItem('movies', JSON.stringify(filteredMovies));
                return filteredMovies
            })
            .then(movies => {
                setMovies(movies);
                setIsNotFound((movies||[]).length===0)
            })
            .catch(err => {
                setIsError(true);
                return err; 
            })
            .finally(_ => setIsLoading(false))
    }

    return (
        <div className='movies'>
            <Header 
                type='light' 
                loggedIn={true} 
                isMobile={isMobile} 
                isTablet={isTablet} 
                openMenu={openMenu} 
            />
            <SearchForm onSearchClick={onSearchClick} filterShortMovies={filterShortMovies} isActive={isActive} />
            <MoviesCardList 
                isMobile={isMobile} 
                isTablet={isTablet} 
                isLoading={isLoading} 
                isError={isError} 
                isNotFound={isNotFound} 
                // movies={movies}
            />
            <Footer />
        </div>
    )
}

export default Movies;