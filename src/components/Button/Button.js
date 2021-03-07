import './Button.css';
import cn from 'classnames';

const Button = ({ caption, type }) => {
    return (
        <button className={cn('button', { 'button_type_logout': type==='logout' })}>{caption}</button>
    )
}

export default Button;