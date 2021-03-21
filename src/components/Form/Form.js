import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './Form.css';

const Form = ({ 
    isError, 
    children, 
    errorText, 
    questionText, 
    linkText, 
    formName, 
    buttonText, 
    onSubmit, 
    destination,
    disabled
}) => {

    return (
        <form className='form' name={formName} onSubmit={onSubmit} >
            <fieldset className='form__input-fields'>
                {children}
            </fieldset>
            <div className='form__bottom'>
                {isError && <p className='form__error-text'>{errorText}</p>}
                <Button caption={buttonText} type='bottom' buttonType='submit' disabled={disabled} />
                <div className='form__text-container'>
                    <p className='form__text'>{questionText}</p>
                    <Link className='form__text form__text_type_link' to={destination}>{linkText}</Link>
                </div>
            </div>
        </form>
    )
}

export default Form;