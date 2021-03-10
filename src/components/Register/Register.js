import Form from '../Form/Form';
import Input from '../Input/Input';
import Welcome from '../Welcome/Welcome';
import './Register.css';

const Register = () => {
    return (
        <div className='login'>
            <Welcome welcomeText='Рады видеть!'/>
            <Form 
                errorText='Что-то пошло не так...'
                children={
                    <>
                        <Input title='Имя' placeholder='имя' errorText='Что-то пошло не так...'/>
                        <Input title='E-mail' placeholder='email' errorText='Что-то пошло не так...'/>
                        <Input title='Пароль' placeholder='пароль' errorText='Что-то пошло не так...'/>
                    </>
                }
                questionText='Еще не зарегистрированы?'
                linkText='Регистрация'
            />
        </div>
    )
}

export default Register;