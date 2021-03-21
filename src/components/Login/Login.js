import { useEffect } from 'react';
import { PASSWORD_PATTERN } from '../../configs/constants';
import { signupPage } from '../../configs/links';
import useValidation from '../../hooks/useValidation';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Welcome from '../Welcome/Welcome';
import './Login.css';

const Login = ({ 
    errorText, onLogin, isError 
}) => {

    const { 
        errors, resetForm, values, isValid, handleChange 
    } = useValidation();

    const handleSubmit = e => {
        e.preventDefault();
        isValid && onLogin(values.email, values.password);
    }

    useEffect(_ => resetForm(),[]);

    return (
        <div className='login'>
            <Welcome welcomeText='Добро пожаловать!'/>
            <Form 
                formName='registerForm'
                isError={isError}
                errorText={errorText}
                children={
                    <>
                        <Input 
                            title='E-mail' 
                            placeholder='email' 
                            inputName='email'
                            onChange={handleChange}
                            errorText={errors?.email}
                            value={values?.email}
                            inputType='email'
                        />
                        <Input 
                            title='Пароль' 
                            placeholder='пароль'
                            inputName='password'
                            onChange={handleChange}
                            errorText={errors?.password}
                            value={values?.password}
                            inputType='password'
                            pattern={PASSWORD_PATTERN}
                            minLength={6}
                        />
                    </>    
                }
                buttonText='Войти'
                questionText='Еще не зарегистрированы?'
                linkText='Регистрация'
                destination={signupPage}
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default Login;