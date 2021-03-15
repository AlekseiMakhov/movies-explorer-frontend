import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import Footer from '../Footer/Footer';
import api from '../../utils/MoviesApi';
import { useEffect, useState } from 'react';

const Movies = ({ isMobile, isTablet, openMenu }) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isNotFound, setIsNotFound] = useState(false);

    const [movies, setMovies] = useState([]);

    useEffect(_ => {
        api.getMovies()
            .then(res => {
                setMovies(res);
                try
                    {
                        localStorage.setItem('movies', JSON.stringify(movies))
                    }
                catch {new Error('Error')}
                console.log(res);    
            })
            .catch(err=>err)
    }, [])
    
    const onSearchClick = event => {
        setIsLoading(true);
        const filter = new RegExp(event.target.closest('.search-form__content').querySelector('.search-form__input').value, 'gi');
        api.getMovies()
            .then(res => {
                const filteredMovies = res.filter(e => {
                    console.log(e.nameRU.search(filter));
                    return e.nameRU.search(filter)>=0
                        ||e.nameEN.search(filter)>=0
                        ||e.description.search(filter)>=0
                        ||e.nameRU.search(filter)>=0 ? e : null
                })
                localStorage.setItem('movies', JSON.stringify(filteredMovies))
                filteredMovies = [] && setIsNotFound(true);
            // console.log(res);    
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
            <SearchForm onSearchClick={onSearchClick} movies={movies} />
            <MoviesCardList 
                isMobile={isMobile} 
                isTablet={isTablet} 
                isLoading={isLoading} 
                isError={isError} 
                isNotFound={isNotFound} 
            />
            <Footer />
        </div>
    )
}

export default Movies;