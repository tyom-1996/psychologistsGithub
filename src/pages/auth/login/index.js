import Image from "next/image";
import '../../../assets/css/login.css';
import { useEffect, useState } from "react";
import Link from "next/link";
import withOutAuth from '../../../components/withOutAuth';
import { useRouter } from "next/router";
import {PasswordShowIcon} from "@/assets/icons/PasswordShowIcon";
import {PasswordCloseIcon} from "@/assets/icons/PasswordCloseIcon";

const Login = () => {
    const [password, setPassword] = useState('');
    const [phoneEmail, setPhoneEmail] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const router = useRouter();

    useEffect(() => {

    }, []);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className={'login-wrapper'}>
            <header className='login-wrapper_header'>
                <Link href={'/'} className='login-wrapper_header_link'>
                    <Image
                        src="/svg/logo.svg"
                        alt="Company Logo"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                    />
                </Link>
            </header>
            <div className='login_form'>
                <h1 className='login_form_title'>Вход</h1>
                <div className='login_form_input'>
                    <input
                        type='text'
                        value={phoneEmail}
                        onChange={(e) => {
                            setPhoneEmail(e.target.value)
                        }}
                        placeholder='Ваша эл. почта  или номер телефона'
                        className='login_form_input_field'
                    />
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
                    <button className='password_icon_btn' onClick={togglePasswordVisibility}>
                        {isPasswordVisible ? <PasswordShowIcon /> : <PasswordCloseIcon />}
                    </button>
                </div>
                <div className='forget_password_link_wrapper'>
                    <Link href={'/'} className='forget_password_link'>
                        Забыли пароль?
                    </Link>
                </div>
                <div className="login_form_btn_parent">
                    <button
                        className='login_form_btn'
                        onClick={() => {
                            router.push(`/patient/patient-profile`);
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

export default Login;
