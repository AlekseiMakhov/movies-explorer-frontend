import './Input.css';
import cn from 'classnames';

const Input = ({ 
    title, 
    placeholder,
    errorText, 
    type, 
    isDisabled, 
    inputName, 
    minLength, 
    maxLength, 
    inputType,
    onChange,
    pattern,
    value,
    onInput
}) => {

    return (
        <>
            {
                type === 'profile'
                    ?   <input 
                            className={cn('input input_type_profile', { 'input_invalid': errorText })} 
                            placeholder={placeholder} 
                            value={value || ''}
                            name={inputName}
                            disabled={isDisabled}
                            minLength={minLength} 
                            maxLength={maxLength}
                            type={inputType}
                            onChange={onChange}
                            pattern={pattern}
                            onInput={onInput}
                            required 
                        />
            
                :   <>
                        <p className='input__text'>{title}</p>
                        <input 
                            name={inputName} 
                            className={cn('input', { 'input_invalid': errorText })} 
                            placeholder={placeholder} 
                            minLength={minLength} 
                            maxLength={maxLength}
                            value={value||''}
                            type={inputType}
                            disabled={isDisabled}
                            onChange={onChange}
                            pattern={pattern}
                            required
                        />
                        <span className='input__text_type_error'>{errorText||''}</span>
                    </>
            }
            
        </>
    )
}

export default Input;