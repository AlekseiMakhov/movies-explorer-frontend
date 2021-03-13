import { buttonLoginText } from '../../configs/texts';
import Button from '../Button/Button';
import './Form.css';

const Form = ({ children, errorText, questionText, linkText }) => {
    return (
        <form className='form'>
            <fieldset className='form__input-fields'>
                {children}
            </fieldset>
            <div className='form__bottom'>
                <p className='form__error-text'>{errorText}</p>
                <Button caption={buttonLoginText} type='bottom'/>
                <div className='form__text-container'>
                    <p className='form__text'>{questionText}</p>
                    <p className='form__text form__text_type_link'>{linkText}</p>
                </div>
            </div>
        </form>
    )
}

export default Form;