import { useState } from 'react';
import Button from '../Button/Button';
import './SearchForm.css';

const SearchForm = ({ onSearchClick, filterShortMovies, isActive }) => {

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