import { 
    useContext, useState 
} from 'react';

import { ERROR_CODE, NAME_PATTERN, SUCCESS_CODE } from '../../configs/constants';
import CurrentUser from '../../contexts/CurrentUser';
import Button from '../Button/Button';
import Header from '../Header/Header';
import Input from '../Input/Input';
import './Profile.css';
import { successText } from '../../configs/texts';
import useValidation from '../../hooks/useValidation';

const Profile = ({ 
    onSignoutClick, 
    isMobile, 
    isTablet, 
    openMenu,
    errorText,
    onSaveClick,
    responseCode,
    isFormBlocked
}) => {

    const currentUser = useContext(CurrentUser);

    const [buttonDisabled, setIsButtonDisabled] = useState(true);
    const [isEditActive, setIsEditActive] = useState(false);

    const {
        errors, values, isValid, handleChange
    } = useValidation({ name: currentUser.name, email: currentUser.email });

    const editProfile = _ => setIsEditActive(true);

    const handleSubmit = e => {
        e.preventDefault();
        isValid && onSaveClick(values.name, values.email);
    }

    const onInput = _ => setIsButtonDisabled(false);

    return (
        
        <>

            <Header 
                type='white' 
                loggedIn={true} 
                isMobile={isMobile} 
                isTablet={isTablet} 
                openMenu={openMenu}
            />

            <section className='profile'>
                <div className='profile__content'>
                    <h3 className='profile__welcome-text'>Привет, {currentUser.name}!</h3>
                    <form className='profile__form' name='profileForm' onSubmit={handleSubmit}>
                        <span className='input__text_type_error input__text_type_profile_error'>{errors?.name}</span>
                        <div className='profile__input-container'>
                            <p className='profile__text'>Имя</p>
                            <Input 
                                type='profile'
                                isDisabled={!isEditActive || isFormBlocked}
                                title='Имя'
                                placeholder='имя'
                                inputName='name'
                                onChange={handleChange}
                                value={values.name}
                                inputType='text'
                                onInput={onInput}
                                minLength={2}
                                maxLength={30}
                                pattern={NAME_PATTERN}
                            />
                        </div>
                        
                        <div className='profile__input-container'>
                            <p className='profile__text'>Почта</p>
                            <Input
                                type='profile' 
                                isDisabled={!isEditActive || isFormBlocked}
                                title='E-mail'
                                placeholder='email' 
                                inputName='email'
                                onChange={handleChange}
                                value={values.email}
                                inputType='email'
                                onInput={onInput}
                            />
                            
                        </div>
                        <span className='input__text_type_error input__text_type_profile_error'>{errors?.email}</span>

                        <div className='profile__buttons'>
                            {responseCode === ERROR_CODE && <span className='profile__text profile__text_type_error'>{errorText}</span>}
                            {responseCode === SUCCESS_CODE && <span className='profile__text profile__text_type_success'>{successText}</span>}
                            {
                                isEditActive
                                ?   <Button 
                                        type='save' 
                                        disabled={buttonDisabled || isFormBlocked || !isValid} 
                                        buttonType='submit' 
                                        caption='Сохранить' 
                                        onClick={handleSubmit}
                                    />
                                :   <>
                                        <Button 
                                            type='profile' 
                                            caption='Редактировать' 
                                            onClick={editProfile} 
                                        />
                                        <Button 
                                            type='signout' 
                                            caption='Выйти из аккаунта' 
                                            onClick={onSignoutClick}
                                        />  
                                    </>
                            }
                        </div>
                    </form>
                </div>
            </section>
 
        </>                           
    )
}

export default Profile;