import './Button.css';
import cn from 'classnames';

const Button = ({ caption, type, selected, filled, onClick }) => {
    return (
        <button className={cn('button', 
            { 'button_type_login': type === 'login' }, 
            { 'button_type_bottom': type === 'bottom' }, 
            { 'button_type_search': type === 'search' },
            { 'button_type_select': type === 'select' },
            { 'button_type_like': type === 'like' },
            { 'button_selected': selected },
            { 'button_filled': filled },
            { 'button_type_profile': type === 'profile' },
            { 'button_type_profile button_type_signout': type === 'signout' },
            { 'button_type_bottom button_type_save': type === 'save' },
            )} 
            type='button'
            onClick={onClick}
            >
            {caption}
        </button>
    )
}

export default Button;