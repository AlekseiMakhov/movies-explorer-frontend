import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { profilePage } from '../../configs/links';
import CurrentUser from '../../contexts/CurrentUser';
import './Account.css';

const Account = () => {
    const user = useContext(CurrentUser);
    return (
        <div className='account'>
            <p className='account__text'>{user?.name||'Алексей'}</p>
            <Link className='account__icon' to={profilePage}></Link>
        </div>
    )
}

export default Account;