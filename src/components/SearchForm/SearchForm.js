import { useState } from 'react';
import Button from '../Button/Button';
import './SearchForm.css';

const SearchForm = ({ onSearchClick, movies }) => {

    const [isActive, setIsActive] = useState(false);
    // const shortMovies = JSON.parse(localStorage.getItem('movies'))||[];

    const filterShortMovies = _ => {
        setIsActive(!isActive);
        console.log(movies);
        isActive 
            ?   localStorage.setItem('movies', JSON.stringify(movies.filter(e => e.duration<=40)))
            :   localStorage.setItem('movies', JSON.stringify((movies)))
    }

    return (
        <section className='search-form'>
            <form className='search-form__content'>
                <div className='search-form__container'>
                    <input className='search-form__input' />
                    <Button type='search' onClick={onSearchClick} />
                </div>
                <div className='search-form__select-container'>
                    <Button type='select' active={isActive} onClick={filterShortMovies} />
                    <p className='search-form__text'>Короткометражки</p>
                </div>
            </form>
        </section>
    )
}

export default SearchForm;