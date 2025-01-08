import React, {useEffect, useState} from 'react';
import '../../../../assets/css/login.css'
import {useRouter} from "next/router";
import {useSetNewPasswordCode} from "@/hooks/useSetNewPasswordCode";
import withOutAuth from '../../../../components/withOutAuth';
import Link from "next/link";
import Image from "next/image";
export async function getServerSideProps(context) {
    const { email } = context.params;

    // Log context.params for debugging
    console.log('context.params:', context.params);

    if (!email) {
        return {
            notFound: true, // Return a 404 page if email is missing
        };
    }

    // Ensure email is a string before checking for '@'
    const isEmail = typeof email === 'string' && email.includes('@');

    return {
        props: {
            paramsEmail: isEmail ? email : null,
        },
    };
}

const RecoveryAccountConfirmationCodeModal = ({paramsEmail}) => {
    const [code, setCode] = useState('');
    const { loading, newPasswordCodeData, newPasswordSetCode, codeErrorText, emailErrorText } = useSetNewPasswordCode();


    const router = useRouter();
    useEffect(() => {
        if (newPasswordCodeData) {
            if (newPasswordCodeData?.message === "Reset code confirmed. You can now reset your password.") {
                router.push(`/auth/recovery-account/new-password`);
            }

        }
    }, [newPasswordCodeData]);

    const handleCodeVerify = async (e) => {
        e.preventDefault();
        await newPasswordSetCode(paramsEmail, code);
    };

    return (
        <div className='login-wrapper'>
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
                <p className='login_form_info'>Мы отправим 4-х значный код на вашу эл.почту для
                    подтверждения личности
                </p>

                <div className='login_form_input'>
                    <input
                        type="number"
                        value={code}
                        onChange={(event) => {
                            setCode(event.target.value)
                        }}
                        placeholder="Код подтверждения"
                        className='login_form_input_field'
                    />
                    {codeErrorText &&
                        <p className='error_text2'>{codeErrorText}</p>
                    }
                </div>

                <button
                    className='login_form_btn'
                    onClick={(e) => {
                        handleCodeVerify(e)
                    }}
                >
                    Подтвердить
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

export default withOutAuth(RecoveryAccountConfirmationCodeModal);
