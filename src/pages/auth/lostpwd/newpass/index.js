import Image from "next/image";
import '../../../../assets/css/home.css';
import '../../../../assets/css/globals.css';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {useEffect, useState} from "react";
import Link from "next/link";


export default function Login() {

    useEffect(() => {

    }, []);


    return (
        <div className={'login-wrapper'}>

            <header>
                <Link href={'/'}>
                    <img src="/images/logo3.png" alt=""/>
                </Link>
            </header>

            <div className={'container-max-width login-wrapper-body'}>

                <div className="login-form">
                    <h1>Новый пароль</h1>

                    <div className="line"></div>

                    <p className={'res-desc'}>
                        Придумайте сложный пароль,содержащий
                        строчные и прописные буквы,а так же цифры и символы
                    </p>


                    <div className="input-wrapper">
                        <input type="text" placeholder={'Пароль'}/>
                    </div>

                    <div className="input-wrapper">
                        <input type="text" placeholder={'Повторите пароль'}/>
                    </div>


                    <Link href={'/auth/login'} className={'login-button'}>
                        Подтвердить
                    </Link>

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
}
