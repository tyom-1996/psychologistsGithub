import React, {useState, useEffect} from 'react';
import '../../../../assets/css/login.css';
import {useRouter} from "next/router";
import { useRegisterVerifyCode } from '../../../../hooks/useRegisterVerifyCode';
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


// Code Component

const RegisterConfirmationAccountModal = ({paramsEmail}) => {
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const { registerVerifyCode, loading, codeErrorText, codeData } = useRegisterVerifyCode();

    useEffect(() => {

        console.log(paramsEmail,  'phone_email_params')
        if (paramsEmail) {
            console.log(paramsEmail)
            setEmail(paramsEmail);
        }

    }, [paramsEmail]);

    const router = useRouter();

    useEffect(() => {
        if (codeData?.token) {
            router.push(`/auth/login`);
        }
    }, [codeData]);

    const handleCodeVerify = async (e) => {
        console.log(email, 'phone+email')
        e.preventDefault();
        await registerVerifyCode(email ? email : null, code);
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

                <h1 className='login_form_title'>Подтверждение аккаунта</h1>
                <p className='login_form_info'>
                    Мы отправим 4-х значный код на вашу эл.почту для подтверждения личности
                </p>

                <div className='login_form_input_button_wrapper'>
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
                </div>


            </div>

        </div>

    );
};

export default withOutAuth(RegisterConfirmationAccountModal);
