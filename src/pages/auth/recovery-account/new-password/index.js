import React, {useEffect, useState} from 'react';
import '../../../../assets/css/login.css'
import {PasswordShowIcon} from "@/assets/icons/PasswordShowIcon";
import {PasswordCloseIcon} from "@/assets/icons/PasswordCloseIcon";
import {useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";
import {useSetNewPassword} from "@/hooks/useSetNewPassword";
import withOutAuth from '../../../../components/withOutAuth';


const RecoveryAccountNewPassword = ({}) => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const { newPasswordSet, newPasswordData, confirmNewPasswordErrorText, newPasswordErrorText, emailErrorText } = useSetNewPassword();

    const router = useRouter();

    useEffect(() => {
        if (newPasswordData) {
            if (newPasswordData?.message === "Password reset successfully") {
                router.push('/auth/login');
            }
        }
    }, [newPasswordData]);
    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const toggleNewPasswordVisibility = () => {
        setIsNewPasswordVisible(!isNewPasswordVisible);
    };
    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    const handleNavigateToLogin = async (e) => {
        e.preventDefault();
       await newPasswordSet(email, newPassword, confirmPassword)

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
            <h1 className='login_form_title'>Восстановление аккаунта</h1>
            <p className='login_form_info'>Придумайте сложный пароль,содержащий
                строчные и прописные буквы,а так же цифры и символы</p>


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
            <div className='login_form_input'>
                <input
                    type={isNewPasswordVisible ? 'text' : 'password'}
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    placeholder='Новый пароль'
                    className='login_form_input_field'
                />
                <button className='password_icon_btn' onClick={toggleNewPasswordVisibility}>
                    {isNewPasswordVisible ? <PasswordShowIcon/> : <PasswordCloseIcon/>}
                </button>
            </div>
            {newPasswordErrorText &&
                <p className='error_text'>
                    {newPasswordErrorText}
                </p>
            }

            <div className='login_form_input'>
                <input
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    placeholder='Повторите пароль'
                    className='login_form_input_field'
                />
                <button className='password_icon_btn' onClick={toggleConfirmPasswordVisibility}>
                    {isConfirmPasswordVisible ? <PasswordShowIcon/> : <PasswordCloseIcon/>}
                </button>
            </div>
            {confirmNewPasswordErrorText &&
                <p className='error_text'>
                    {confirmNewPasswordErrorText}
                </p>
            }
            <button
                className='login_form_btn'
                onClick={(e) => {
                    handleNavigateToLogin(e)
                }}
            >
                Сохранить
            </button>
            <div className='recovery_line'>

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

export default withOutAuth(RecoveryAccountNewPassword);
