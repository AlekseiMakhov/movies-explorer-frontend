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
    isActive,
    isFormBlocked,
    filterShortMovies,
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
                isError={isError} 
                isNotFound={isNotFound} 
                onCardButtonClick={onCardButtonClick}
                isMoviesPage={false}
            />
            <Footer />
        </div>
    )
}

export default SavedMovies;