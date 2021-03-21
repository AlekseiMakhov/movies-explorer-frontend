import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';

const Movies = ({ 
    isMobile, 
    isTablet, 
    openMenu, 
    onSearchClick, 
    isNotFound, 
    isError, 
    isLoading, 
    onCardButtonClick, 
    savedMovies, 
    loggedIn, 
    isActive, 
    filterShortMovies
}) => {

    useEffect(()=>{
        localStorage.removeItem('movies');
    },[]);

    return (
        <div className='movies'>
            <Header 
                type='light' 
                isMobile={isMobile} 
                isTablet={isTablet} 
                openMenu={openMenu}
                loggedIn={loggedIn}
            />
            <SearchForm 
                onSearchClick={onSearchClick} 
                filterShortMovies={filterShortMovies} 
                isActive={isActive} 
            />
            <MoviesCardList 
                isMobile={isMobile} 
                isTablet={isTablet} 
                isLoading={isLoading}
                isError={isError} 
                isNotFound={isNotFound} 
                savedMovies={savedMovies}
                onCardButtonClick={onCardButtonClick}
                movies={JSON.parse(localStorage.getItem('movies')) || []}
                isMoviesPage={true}
            />
            <Footer />
        </div>
    )
}

export default Movies;