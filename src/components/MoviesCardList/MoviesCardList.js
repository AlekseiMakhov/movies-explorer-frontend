import { useState } from 'react';
import { 
    DESKTOP_CARDS_COUNT, INCREASE_COUNT, MOBILE_CARDS_COUNT, MOBILE_INCREASE_COUNT, TABLET_CARDS_COUNT 
} from '../../configs/constants';
import { someError } from '../../configs/errors';
import { notFoundText } from '../../configs/texts';
import Button from '../Button/Button';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

const MoviesCardList = ({ 
    isMobile, 
    isTablet, 
    isLoading, 
    isError, 
    isNotFound, 
    savedMovies,
    onCardButtonClick, 
    isMoviesPage,
}) => {

    const [moviesCount, setMoviesCount] = useState(isMobile ? MOBILE_CARDS_COUNT : isTablet ? TABLET_CARDS_COUNT : DESKTOP_CARDS_COUNT);
    const icreaseCount = _ => setMoviesCount(isMobile||isTablet ? moviesCount+MOBILE_INCREASE_COUNT : moviesCount+INCREASE_COUNT);

    const cards = JSON.parse(localStorage.getItem(isMoviesPage ? 'movies' : 'savedMovies'));
    // const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));

    return (
        <section className='movies-card-list'>
            {isLoading && <Preloader />}
            {isNotFound && <span className='movies-card-list__not-found'>{notFoundText}</span>}
            {isError && <span className='movies-card-list__not-found movies-card-list__not-found_type_error'>{someError}</span>}
            {
                !(isLoading||isNotFound||isError)
                    && ( <div className='movies-card-list__content'>
                            {(cards||[]).slice(0, moviesCount).map(movie =>
                            <>
                                <MoviesCard 
                                    key={isMoviesPage ? ''+movie.id : movie._id}
                                    movie={movie}
                                    isMoviesPage={isMoviesPage}
                                    isSaved={isMoviesPage ? savedMovies.find(e => e.movieId === movie.id) : false }
                                    onCardButtonClick={onCardButtonClick}
                                /> 
                             </>   
                            )}
                        </div>)
            }
            {
                cards?.length > moviesCount && <Button caption='Ещё' type='more' onClick={icreaseCount} />
            }

        </section>
    )
}

export default MoviesCardList;