import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import Footer from '../Footer/Footer';

const SavedMovies = ({ 
    isMobile, 
    isTablet, 
    openMenu, 
    onSearchClick, 
    isNotFound, 
    isError, 
    isLoading, 
    onCardButtonClick, 
    loggedIn, 
    savedMovies, 
    isActive, 
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
            />
            <MoviesCardList 
                isMobile={isMobile} 
                isTablet={isTablet} 
                isLoading={isLoading} 
                isError={isError} 
                isNotFound={isNotFound} 
                movies={JSON.parse(localStorage.getItem('savedMovies')) || []}
                savedMovies={savedMovies}
                onCardButtonClick={onCardButtonClick}
                isMoviesPage={false}
            />
            <Footer />
        </div>
    )
}

export default SavedMovies;