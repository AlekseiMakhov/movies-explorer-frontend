import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import Footer from '../Footer/Footer';

const Movies = ({ 
    isMobile, 
    isTablet, 
    openMenu, 
    onSearchClick, 
    isNotFound, 
    isError, 
    isLoading, 
    onCardButtonClick, 
    loggedIn,
    isActive,
    isFormBlocked, 
    savedMovies,
    filterShortMovies
}) => {

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
                isFormBlocked={isFormBlocked}
            />
            <MoviesCardList 
                isMobile={isMobile} 
                isTablet={isTablet} 
                isLoading={isLoading}
                savedMovies={savedMovies}
                isError={isError} 
                isNotFound={isNotFound} 
                onCardButtonClick={onCardButtonClick}
                isMoviesPage={true}
            />
            <Footer />
        </div>
    )
}

export default Movies;