import { useState } from 'react';
import {useRouter} from "next/router";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState('');
    const [phoneNumberErrorText, setPhoneNumberErrorText] = useState('');
    const [passwordEmailErrorText, setPasswordEmailErrorText] = useState('');
    const [passwordPhoneErrorText, setPasswordPhoneErrorText] = useState('');
    const [loginData, setLoginData] = useState(null);
    const router = useRouter();
    const validateInputs = (email, phoneNumber, passwordEmail, passwordPhone, type) => {
        let isValid = true;


        if (type === 'phone') {
            if (!phoneNumber) {
                setPhoneNumberErrorText('Поле является обязательным.');
                isValid = false;
            }
            if (!passwordPhone) {
                setPasswordPhoneErrorText('Поле является обязательным.');
                isValid = false;
            }

        } else if (type === 'email') {
            if (!email) {
                setEmailErrorText('Поле является обязательным.');
                isValid = false;
            }
            if (!passwordEmail) {
                setPasswordEmailErrorText('Поле является обязательным.');
                isValid = false;
            }

        }


        return isValid;
    };

    const login = async (email, phoneNumber, passwordEmail, passwordPhone, type) => {
        setLoading(true);
        setEmailErrorText('');
        setPhoneNumberErrorText('');
        setPasswordEmailErrorText('');
        setPasswordPhoneErrorText('');

        // Отладочная информация

        const isValid = validateInputs(email, phoneNumber, passwordEmail, passwordPhone, type);
        if (!isValid) {
            setLoading(false);
            return false;
        }

        let body = {
            type: type
        };

        if (type === "email") {
            body.email = email;
            body.password = passwordEmail;
        } else if (type === "phone") {
            body.phone = phoneNumber;
            body.password = passwordPhone
        }

        try {
            const response = await fetch(`http://5-63-153-114.cloudvps.regruhosting.ru:3007/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            console.log(data, 'response______________-');

            if (!response.ok) {
                if (data.message === 'Не верная почта') {
                    setEmailErrorText('Не верная почта');
                } else if (data.message == 'Пользователь не подтвержден') {
                      setEmailErrorText('Пользователь не подтвержден')
                        if (type === 'email') {
                            router.push(`/auth/register/code/${email}`);
                        } else if (type === 'phone') {
                            router.push(`/auth/register/code/${phoneNumber}`);
                        }
                } else if (data.message === 'Не верный номер телефона') {
                    setPhoneNumberErrorText('Не верный номер телефона');
                } else if (data.message === 'Не верный пароль') {
                          if (type == 'email') {
                              setPasswordEmailErrorText('Не верный пароль');
                          } else if (type == 'phone') {
                              setPasswordPhoneErrorText('Не верный пароль');
                          }
                } else {
                    throw new Error(data.message || 'Login failed');
                }
                setLoading(false);
                return false;
            }

            setLoginData(data.token);
            console.log(data.token, 'data.token');
            localStorage.setItem('token', data.token); // Сохранение токена в localStorage
        } catch (err) {
            console.error(err.message);
            // Обработка неожиданных ошибок
            setEmailErrorText('Ошибка при входе');
            setPasswordPhoneErrorText('Ошибка при входе');
            setPasswordEmailErrorText('Ошибка при входе');
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, emailErrorText, phoneNumberErrorText, passwordPhoneErrorText, passwordEmailErrorText, loginData };
};
