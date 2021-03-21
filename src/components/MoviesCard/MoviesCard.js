import {  MOVIES_BASE_URL } from '../../configs/constants';
import Button from '../Button/Button';
import './MoviesCard.css';

const MoviesCard = ({ 
    movie, isMoviesPage, isSaved, onCardButtonClick 
}) => {
    
    const duration = `${Math.floor(movie?.duration/60)}ч ${movie?.duration % 60}м`;

    const thumbnailLink = isMoviesPage 
        ? MOVIES_BASE_URL+movie?.image?.formats?.thumbnail.url 
        : movie?.thumbnail;

    const trailerLink = isMoviesPage 
        ? movie?.trailerLink 
        : movie?.trailer;

    const onButtonClick = _ => onCardButtonClick(movie);

    return (
        <article className='movies-card'>
            <a href={trailerLink} target='blank'>
                <img className='movies-card__picture' src={thumbnailLink} alt={movie?.nameRU} />
            </a>
            <div className='movies-card__info'>
                <h3 className='movies-card__title'>{movie?.nameRU}</h3>
                {isMoviesPage
                    ?   <Button 
                            type='like' 
                            filled={isSaved} 
                            onClick={onButtonClick} 
                    />
                    :   <Button 
                            type='delete'
                            onClick={onButtonClick} 
                     />
                }    
            </div>
            <p className='movies-card__duration'>{duration}</p>
        </article>
    )
}

export default MoviesCard;