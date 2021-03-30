import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { profilePage } from '../../configs/links';
import CurrentUser from '../../contexts/CurrentUser';
import './Account.css';

const Account = ({ onClick }) => {
    const user = useContext(CurrentUser);
    return (
        <div className='account'>
            <p className='account__text'>{user?.name||'Имя'}</p>
            <Link className='account__icon' to={profilePage} onClick={onClick} ></Link>
        </div>
    )
}

export default Account;