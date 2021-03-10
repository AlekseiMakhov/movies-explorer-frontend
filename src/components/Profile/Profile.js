import { useState } from 'react';
import Button from '../Button/Button';
import Header from '../Header/Header';
import Input from '../Input/Input';
import './Profile.css';

const Profile = ({ signout }) => {
    const userName = 'Алексей';
    const email = 'aleks@gmail.com';
    const [isEditActive, setIsEditActive] = useState(false);

    const editProfile = _ => setIsEditActive(true)
    return (
        <>
            <Header type='light' loggedIn={true} />
            <section className='profile'>
                <div className='profile__content'>
                    <h3 className='profile__welcome-text'>Привет, {userName}!</h3>
                    <form className='profile__form'>
                        <div className='profile__input-container'>
                            <p className='profile__text'>Имя</p>
                            <Input type='profile' inputText={userName} isDisabled={!isEditActive}/>
                        </div>
                        <div className='profile__input-container'>
                            <p className='profile__text'>Почта</p>
                            <Input type='profile' inputText={email} isDisabled={!isEditActive}/>
                        </div>
                        <div className='profile__buttons'>
                        {
                            isEditActive
                            ?   <Button type='save' caption='Сохранить' />
                            :   <>
                                    <Button type='profile' caption='Редактировать' onClick={editProfile} />
                                    <Button type='signout' caption='Выйти из аккаунта' onClick={signout} />  
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