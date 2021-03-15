import './Button.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { loginText } from '../../configs/texts';

const Button = ({ 
    caption, type, selected, filled, onClick, active
}) => {
    return (
        <>
        {
        type==='login' 
            ?   <Link className='button button_type_login' to='/sign-in'>{loginText}</Link>
            :    <button className={cn('button', 
                    { 'button_type_bottom': type === 'bottom' }, 
                    { 'button_type_search': type === 'search' },
                    { 'button_type_select': type === 'select' },
                    { 'button_type_select button_selected': active },
                    { 'button_type_like': type === 'like' },
                    { 'button_selected': selected },
                    { 'button_filled': filled },
                    { 'button_type_profile': type === 'profile' },
                    { 'button_type_profile button_type_signout': type === 'signout' },
                    { 'button_type_bottom button_type_save': type === 'save' },
                    { 'button_type_more': type === 'more' },
                    )}
                    type='button'
                    onClick={onClick}
                    >
                    {caption}
                </button>
        }
        </>
    )
}

export default Button;