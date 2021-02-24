import SavedMoviesHeader from '../SavedMoviesHeader/SavedMoviesHeader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import Footer from '../Footer/Footer';

const SavedMovies = () => {
    return (
        <>
            <SavedMoviesHeader />
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </>
    )
}

export default SavedMovies;