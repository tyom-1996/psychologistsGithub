import Image from "next/image";
import '../../../assets/css/login.css';
import { useEffect, useState } from "react";
import Link from "next/link";
import withOutAuth from '../../../components/withOutAuth';
import { useRouter } from "next/router";
import {PasswordShowIcon} from "@/assets/icons/PasswordShowIcon";
import {PasswordCloseIcon} from "@/assets/icons/PasswordCloseIcon";
import { useLogin } from '../../../hooks/useLogin';

const Login = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { login, loading, emailErrorText, passwordErrorText, loginData, passwordErrorText2} = useLogin();

    const router = useRouter();

    useEffect(() => {
        // router.push(`/patient/patient-profile`);
    }, []);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    useEffect(() => {
        if (emailErrorText) {
            console.log(loginData, 'logindata___')
            if (emailErrorText == 'Почта не подтверждена. Проверьте вашу почту.') {
                setTimeout(() => {
                    router.push(`/auth/register/code/${email}`);
                }, [1000])
            }
        }

    }, [emailErrorText])

    useEffect(() => {
        if (loginData) {
            console.log(loginData, 'logindata___')
            if (loginData?.token) {
                if (loginData?.user?.role == 'user') {
                     router.push('/patient/patient-profile');
                } else {
                    router.push('/psychologists/psychologists-profile');
                }

            }

        }

    }, [loginData])

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
    };

    return (
        <div className={'login-wrapper'}>
            <header className='login-wrapper_header'>
                <Link href={'/'} className='login-wrapper_header_link'>
                    <img
                        src="/svg/logo.svg"
                        alt="Company Logo"
                    />
                </Link>
            </header>
            <div className='login_form'>
                <h1 className='login_form_title'>Вход</h1>
                {passwordErrorText2 &&
                    <p className='error_text2'>
                        {passwordErrorText2}
                    </p>
                }
                <div className='login_form_input'>
                    <input
                        type='text'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        placeholder='Ваша эл. почта'
                        className='login_form_input_field'
                    />
                    {emailErrorText &&
                        <p className='error_text2'>
                            {emailErrorText}
                        </p>
                    }
                </div>
                <div className='login_form_input' id='login_form_input_password1'>
                    <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        value={password}
                        onChange={(e) =>
                            setPassword( e.target.value)
                        }
                        placeholder='Пароль'
                        className='login_form_input_field'
                    />
                    {passwordErrorText &&
                        <p className='error_text2'>
                            {passwordErrorText}
                        </p>
                    }
                    <button className='password_icon_btn' onClick={togglePasswordVisibility}>
                        {isPasswordVisible ? <PasswordShowIcon /> : <PasswordCloseIcon />}
                    </button>
                </div>
                {/*<div className='forget_password_link_wrapper'>*/}
                {/*    <Link href={'/auth/recovery-account'} className='forget_password_link'>*/}
                {/*        Забыли пароль?*/}
                {/*    </Link>*/}
                {/*</div>*/}
                <div className="login_form_btn_parent">
                    <button
                        className='login_form_btn'
                        onClick={(e) => {
                            handleSubmit(e)
                        }}
                    >
                        Войти
                    </button>
                </div>

                <div className='login_form_register_info_link'>
                    <p className='login_form_register_info'>Еще не зарегистрированы?</p>
                    <Link href={'/auth/register'} className='login_form_register_link'>
                        Регистрация
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default withOutAuth(Login);
