import Button from '../Button/Button';
import './SearchForm.css';

const SearchForm = () => {
    return (
        <section className='search-form'>
            <form className='search-form__content'>
                <div className='search-form__container'>
                    <input className='search-form__input' />
                    <Button type='search' />
                </div>
                <div className='search-form__select-container'>
                    <Button type='select' active={true} />
                    <p className='search-form__text'>Короткометражки</p>
                </div>
            </form>
        </section>
    )
}

export default SearchForm;