import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import Footer from '../Footer/Footer';

const SavedMovies = () => {
    return (
        <div className='movies'>
            <Header type='light' loggedIn={true}/>
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </div>
    )
}

export default SavedMovies;