import { 
    useContext, useEffect, useState 
} from 'react';

import { NAME_PATTERN } from '../../configs/constants';
import CurrentUser from '../../contexts/CurrentUser';
import Button from '../Button/Button';
import Header from '../Header/Header';
import Input from '../Input/Input';
import './Profile.css';

const Profile = ({ 
    onSignoutClick, 
    isMobile, 
    isTablet, 
    openMenu,
    isError,
    errorText,
    onSaveClick,
}) => {

    const currentUser = useContext(CurrentUser);

    const [userName, setUserName] = useState(currentUser.name);
    const [userEmail, setUserEmail] = useState(currentUser.email);
    const [buttonDisabled, setIsButtonDisabled] = useState(true);
    const [isEditActive, setIsEditActive] = useState(false);

    const editProfile = _ => setIsEditActive(true);

    const handleSubmit = e => {
        e.preventDefault();
        onSaveClick(userName, userEmail);
    }

    useEffect(_ => isError && setIsButtonDisabled(true), [isError]);

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
                    <form className='profile__form' onSubmit={handleSubmit}>
                        <div className='profile__input-container'>
                            <p className='profile__text'>Имя</p>
                            <Input 
                                type='profile'
                                isDisabled={!isEditActive}
                                title='Имя'
                                placeholder='имя'
                                inputName='name'
                                onChange={e => setUserName(e.target.value)}
                                value={userName}
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
                                isDisabled={!isEditActive}
                                title='E-mail'
                                placeholder='email' 
                                inputName='email'
                                onChange={e => setUserEmail(e.target.value)}
                                value={userEmail}
                                inputType='email'
                                onInput={onInput}
                            />
                        </div>
                        <div className='profile__buttons'>
                            {isError && <span className='profile__error-text'>{errorText}</span>}
                            {
                                isEditActive
                                ?   <Button 
                                        type='save' 
                                        disabled={buttonDisabled} 
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