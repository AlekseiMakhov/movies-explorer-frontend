import Form from '../Form/Form';
import Input from '../Input/Input';
import Welcome from '../Welcome/Welcome';
import './Login.css';

const Login = () => {
    return (
        <div className='login'>
            <Welcome welcomeText='Рады видеть!'/>
            <Form 
                errorText='Что-то пошло не так...'
                children={
                    <>
                        <Input title='E-mail' placeholder='email' errorText=''/>
                        <Input title='Пароль' placeholder='пароль' errorText=''/>
                    </>
                }
                questionText='Уже зарегистрированы?'
                linkText='Войти'
            />
        </div>
    )
}

export default Login;