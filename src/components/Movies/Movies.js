import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

const Movies = () => {
    return (
        <div className='movies'>
            <Header type='light' loggedIn={true} />
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </div>
    )
}

export default Movies;