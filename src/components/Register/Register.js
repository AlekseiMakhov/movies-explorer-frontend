import { useEffect } from 'react';
import { NAME_PATTERN, PASSWORD_PATTERN } from '../../configs/constants';
import { signinPage } from '../../configs/links';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Welcome from '../Welcome/Welcome';
import './Register.css';
import useValidation from '../../hooks/useValidation';

const Register = ({ 
    onRegister, isError, errorText 
}) => {

    const { 
        errors, resetForm, values, isValid, handleChange 
    } = useValidation();

    const handleSubmit = e => {
        e.preventDefault();
        isValid && onRegister(values.name, values.email, values.password);
    }

    useEffect(_ => resetForm(),[]);

    return (
        <div className='register'>
            <Welcome welcomeText='Добро пожаловать!'/>
            <Form 
                formName='registerForm'
                isError={isError}
                errorText={errorText}
                children={
                    <>
                        <Input 
                            title='Имя' 
                            placeholder='имя'
                            inputName='name'
                            onChange={handleChange}
                            errorText={errors?.name}
                            value={values?.name}
                            inputType='text'
                            minLength={2}
                            maxLength={30}
                            pattern={NAME_PATTERN}
                        />
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
                buttonText='Регистрация'
                questionText='Уже зарегистрированы?'
                linkText='Войти'
                destination={signinPage}
                onSubmit={handleSubmit}
                disabled={!isValid}
            />
        </div>
    )
}

export default Register;