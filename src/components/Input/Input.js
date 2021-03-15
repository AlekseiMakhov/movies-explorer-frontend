import './Input.css';

const Input = ({ 
    title, placeholder, errorText, type, inputText, isDisabled 
}) => {
    return (
        <>
            {
                type === 'profile'
                ?   <input className='input input_type_profile' placeholder={placeholder} value={inputText} disabled={isDisabled} required />
                :   <>
                        <p className='input__text'>{title}</p>
                        <input className='input' placeholder={placeholder}/>
                        <p className='input__text_type_error'>{errorText}</p>
                    </>
            }
            
        </>
    )
}

export default Input;