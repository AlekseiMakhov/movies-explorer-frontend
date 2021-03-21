import { useState } from 'react';
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
    onCardButtonClick, 
    movies, 
    savedMovies, 
    isMoviesPage,
}) => {

    const [moviesCount, setMoviesCount] = useState(isMobile ? 5 : isTablet ? 8 : 12);
    const icreaseCount = _ => setMoviesCount(isMobile||isTablet ? moviesCount+2 : moviesCount+3);

    return (
        <section className='movies-card-list'>
            {isLoading && <Preloader />}
            {isNotFound && <span className='movies-card-list__not-found'>{notFoundText}</span>}
            {isError && <span className='movies-card-list__not-found movies-card-list__not-found_type_error'>{someError}</span>}
            {
                !(isLoading||isNotFound||isError)
                    && ( <div className='movies-card-list__content'>
                            {(movies||[]).slice(0, moviesCount).map(movie =>
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
                movies?.length > moviesCount && <Button caption='Ещё' type='more' onClick={icreaseCount} />
            }

        </section>
    )
}

export default MoviesCardList;