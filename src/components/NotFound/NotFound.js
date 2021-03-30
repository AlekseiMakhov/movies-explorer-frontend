import { Link, useHistory } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    const history = useHistory();
    const goToPreviousPage = _ => history.goBack();
    return (
        <div className='not-found-page'>
            <div className='not-found-page__container'>
                <h3 className='not-found-page__title'>404</h3>
                <p className='not-found-page__text'>Страница не найдена</p>
            </div>
            <Link className='not-found-page__link' onClick={goToPreviousPage}>Назад</Link>
        </div>
    )
}

export default NotFound;