import { MOVIES_BASE_URL } from '../../configs/constants';
import Button from '../Button/Button';
import './MoviesCard.css';

const MoviesCard = ({ movie }) => {
    const duration = `${Math.floor(movie?.duration/60)}ч ${movie?.duration % 60}м`;
    const filled = movie.id % 2;
    return (
        <article className='movies-card'>
            <img className='movies-card__picture' src={MOVIES_BASE_URL+movie?.image?.formats?.thumbnail.url} alt={movie?.nameRU} />
            <div className='movies-card__info'>
                <h3 className='movies-card__title'>{movie?.nameRU}</h3>
                <Button type='like' filled={filled} />
            </div>
            <p className='movies-card__duration'>{duration}</p>
        </article>
    )
}

export default MoviesCard;