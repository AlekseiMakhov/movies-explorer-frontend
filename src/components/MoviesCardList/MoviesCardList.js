import { movies } from '../../configs/constants';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import './MoviesCardList.css';

const MoviesCardList = () => {
    return (
        <section className='movies-card-list'>
            {!movies && <Preloader />}
            <div className='movies-card-list__content'>
                {movies.map(movie=> {
                    return <MoviesCard key={movie.id} movie={movie} /> 
                })}
            </div>
        </section>
    )
}

export default MoviesCardList;