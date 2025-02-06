import React, {useState, useEffect} from 'react';
import '../../../assets/css/login.css'
import {useRouter} from "next/router";
import { useResetPassword } from '../../../hooks/useResetPassword';
import withOutAuth from '../../../components/withOutAuth';
import Link from "next/link";
import Image from "next/image";
import {PasswordShowIcon} from "@/assets/icons/PasswordShowIcon";
import {PasswordCloseIcon} from "@/assets/icons/PasswordCloseIcon";
const RecoveryAccountMainModal = ({}) => {
    const [email, setEmail] = useState('');
    const {resetPassword,resetPasswordData, loading, emailErrorText } = useResetPassword();


    const router = useRouter();
    const goBack = () => {
        router.back();
    };
    useEffect(() => {
        if (resetPasswordData) {
            if (resetPasswordData?.message === "Reset code sent to your email") {
                localStorage.setItem('email', email);
                router.push(`/auth/recovery-account/code/${email}`);
            }
        }
    }, [resetPasswordData]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        await resetPassword(email);

    };
    return (
        <div className='login-wrapper'>
            <header className='login-wrapper_header'>
                <Link href={'/'} className='login-wrapper_header_link'>
                    <img
                        src="/svg/logo.svg"
                        alt="Company Logo"
                    />
                </Link>
            </header>
            <div className='login_form'>
                <h1 className='login_form_title'>Восстановление аккаунта</h1>
                <div className='login_form_input'>
                    <input
                        type='text'
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                        placeholder='Email'
                        className='login_form_input_field'
                    />
                    {emailErrorText &&
                        <p className='error_text2'>{emailErrorText}</p>
                    }
                </div>
                <button
                    className='login_form_btn'
                    onClick={(e) => {
                        handleResetPassword(e)
                    }}
                >
                    Далее
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

export default withOutAuth(RecoveryAccountMainModal);
