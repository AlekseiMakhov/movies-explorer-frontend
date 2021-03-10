import { Link } from 'react-router-dom';
import './Account.css';

const Account = () => {
    return (
        <div className='account'>
            <p className='account__text'>Текущий пользователь</p>
            <Link className='account__icon' to='profile'></Link>
        </div>
    )
}

export default Account;