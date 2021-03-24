import Button from '../Button/Button';
import './SearchForm.css';

const SearchForm = ({ 
    onSearchClick, 
    filterShortMovies, 
    isActive, 
    isFormBlocked
}) => {

    return (
        <section className='search-form'>
            <form className='search-form__content'>
                <div className='search-form__container'>
                    <input className='search-form__input' minLength='1' placeholder='Введите текст для поиска' disabled={isFormBlocked} required />
                    <Button type='search' onClick={onSearchClick} buttonType='submit' disabled={isFormBlocked} />
                </div>
                <div className='search-form__select-container'>
                    <Button type='select' active={isActive} onClick={filterShortMovies} disabled={isFormBlocked} />
                    <span className='search-form__text'>Короткометражки</span>
                </div>
            </form>
        </section>
    )
}

export default SearchForm;