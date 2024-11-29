import Image from "next/image";
import '../../../../assets/css/home.css';
import '../../../../assets/css/globals.css';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import { useSetNewPassword } from '../../../../hooks/useSetNewPassword';
import withOutAuth from '../../../../components/withOutAuth';



const SetNewPassword = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {setNewPassword, loading,codeErrorText, passwordErrorText, confirmPasswordErrorText, newPasswordData } = useSetNewPassword();


    useEffect(() => {
        let paramsEmail = localStorage.getItem('email');
        setEmail(paramsEmail)
        console.log(paramsEmail, 'email_params')

    }, []);



    const router = useRouter();
    useEffect(() => {
        if (newPasswordData && newPasswordData == 'Пароль успешно обновлен') {
            router.push(`/auth/login`);
        }
    }, [newPasswordData]);
    const handleSetNewPassword = async (e) => {
        e.preventDefault();
        await setNewPassword(email, code, password, confirmPassword);

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

                    <p className={'res-desc'}>
                        Введите код подтверждения
                    </p>


                    <div className="input-wrapper">
                        <input
                            type="number"
                            value={code}
                            onChange={(event) => setCode(event.target.value)}
                            placeholder="Код подтверждения"
                        />
                        {codeErrorText && <p className="error_text">{codeErrorText}</p>}

                    </div>

                    <div className="input-wrapper">
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                            placeholder="Пароль"
                        />
                        {passwordErrorText && passwordErrorText.length > 0 &&
                            <p className='error_text'>{passwordErrorText}</p>
                        }
                    </div>

                    <div className="input-wrapper">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(event) => {
                                setConfirmPassword(event.target.value)
                            }}
                            placeholder="Повторите пароль"
                        />
                        {confirmPasswordErrorText && confirmPasswordErrorText.length > 0 &&
                            <p className='error_text'>{confirmPasswordErrorText}</p>
                        }
                    </div>
                    <button  className={'login-button'}
                             onClick={(e) => {
                                 handleSetNewPassword(e)
                             }}

                    >
                        Подтвердить
                    </button>

                    {/*<div className="line"></div>*/}

                    {/*<p className={'go-to-reg'}>*/}
                    {/*    Еще не зарегистрированы?*/}
                    {/*</p>*/}

                    {/*<Link href={'/auth/register'} className={'login-button-transparent'}>*/}
                    {/*    Подтвердить*/}
                    {/*</Link>*/}
                </div>

            </div>

            <Footer/>
        </div>
    );
};

export default withOutAuth(SetNewPassword)
