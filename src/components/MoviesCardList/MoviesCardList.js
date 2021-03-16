import { useEffect, useState } from 'react';
import { someError } from '../../configs/errors';
import { notFoundText } from '../../configs/texts';
import Button from '../Button/Button';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

const MoviesCardList = ({ isMobile, isTablet, isLoading, isError, isNotFound }) => {

    const movies = JSON.parse(localStorage.getItem('movies'));
    const [moviesCount, setMoviesCount] = useState(isMobile?5:isTablet?8:9);
    const icreaseCount = _ => setMoviesCount(isMobile||isTablet?moviesCount+2:moviesCount+3)

    return (
        <section className='movies-card-list'>
            {isLoading && <Preloader />}
            {isNotFound && <span className='movies-card-list__not-found'>{notFoundText}</span>}
            {isError && <span className='movies-card-list__not-found movies-card-list__not-found_type_error'>{someError}</span>}

            {
                !(isLoading||isNotFound||isError)
                    && ( <div className='movies-card-list__content'>
                            {console.log(movies)}
                            {console.log(isNotFound, isError)}
                            {(movies||[]).slice(0, moviesCount).map(movie=> {
                                return <MoviesCard key={movie.id} movie={movie} /> 
                            })}
                        </div>)
            }
            {
                movies?.length > moviesCount && <Button caption='Ещё' type='more' onClick={icreaseCount} />
            }

        </section>
    )
}

export default MoviesCardList;