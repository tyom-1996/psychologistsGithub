import Image from "next/image";
import '../../../assets/css/home.css';
import '../../../assets/css/globals.css';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import { useResetPassword } from '../../../hooks/useResetPassword';
import withOutAuth from '../../../components/withOutAuth';


const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const {resetPassword,resetPasswordData, loading, emailErrorText } = useResetPassword();

    useEffect(() => {
        if (resetPasswordData) {
            localStorage.setItem('email', email);
            router.push(`/auth/lostpwd/code`)
            // console.log(`/auth/lostpwd/code/${email}`, '`/auth/lostpwd/code/${email}`')
        }
    }, [resetPasswordData]);



    const router = useRouter();
    const handleResetPassword = async (e) => {
        e.preventDefault();
       await resetPassword(email);

    };

    return (
        <div className={'login-wrapper'}>

            <header>
                <Link href={'/'}>
                    <img src="/images/logo3.png" alt=""/>
                </Link>
            </header>

            <div className={'container-max-width login-wrapper-body'}>

                <div className="login-form">
                    <h1>Забыли пароль?</h1>

                    <div className="line"></div>

                    <p className={'res-desc'}>Мы отправим 6-и значный код на вашу эл. почту или номер телефона для подтверждения личности</p>

                    <div className="input-wrapper">
                        <input
                            value={email}
                            type="text"
                            placeholder={'Ваша эл. почта  или номер телефона'}
                            onChange={(event) => {
                                setEmail(event.target.value)
                            }}
                        />
                        {emailErrorText && emailErrorText.length > 0 &&
                            <p className='error_text'>{emailErrorText}</p>
                        }
                    </div>


                    <button
                        className={'login-button'}
                        onClick={(e) => {
                            handleResetPassword(e)
                        }}
                    >
                        Отправить
                    </button>


                </div>

            </div>

            <Footer/>
        </div>
    );
};
export default withOutAuth(ResetPassword)
