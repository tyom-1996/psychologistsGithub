import { useState } from 'react';

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState('');
    const [phoneNumberErrorText, setPhoneNumberErrorText] = useState('');
    const [passwordErrorText, setPasswordErrorText] = useState('');
    const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');
    const [code, setCode] = useState('');

    const validateInputs = (email, phoneNumber, password, confirmPassword, type) => {
        let isValid = true;

        if (type === 'phone') {
            if (!phoneNumber) {
                setPhoneNumberErrorText('Поле является обязательным.');
                isValid = false;
            }
        } else if (type === 'email') {
            if (!email) {
                setEmailErrorText('Поле является обязательным.');
                isValid = false;
            }
        }

        if (!password) {
            setPasswordErrorText('Поле является обязательным.');
            isValid = false;
        }

        if (!confirmPassword) {
            setConfirmPasswordErrorText('Поле является обязательным.');
            isValid = false;
        }

        if (password && confirmPassword && password !== confirmPassword) {
            setConfirmPasswordErrorText('Пароли не совпадают');
            isValid = false;
        }

        return isValid;
    };

    const register = async (email, phoneNumber, password, type, confirmPassword) => {
        setLoading(true);
        setEmailErrorText('');
        setPhoneNumberErrorText('');
        setPasswordErrorText('');
        setConfirmPasswordErrorText('');

        const isValid = validateInputs(email, phoneNumber, password, confirmPassword, type);
        if (!isValid) {
            setLoading(false);
            return false;
        }

        let body = {
            password:   password,
            confirm_password: confirmPassword,
            type: type
        };

        if (type === "email") {
            body.email = email;
        } else if (type === "phone") {
            body.phone = phoneNumber;
        }

        console.log(body, 'bodyyyy_____')
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.message === 'Пароли не совпадают') {
                    setConfirmPasswordErrorText('Пароли не совпадают');
                } else if (data.message === 'Пользователь с таким email уже существует') {
                    setEmailErrorText('Пользователь с таким email уже существует');
                } else {
                    throw new Error(data.message || 'Ошибка регистрации');
                }
                setLoading(false);
                return false;
            }

            if (data && data.code) {
                setCode(data.code);
            }
            console.log(data, 'hhddbsdbsdbdsbbdsbd')

            // Handle successful registration here, like redirecting the user or displaying a success message.
        } catch (err) {
            console.error('ERROR:', err);
            // Setting a general error message for all fields may be misleading. Consider handling it differently.
            setEmailErrorText('Ошибка при регистрации');
            setPhoneNumberErrorText('Ошибка при регистрации');
            setConfirmPasswordErrorText('Ошибка при регистрации');
            setPasswordErrorText('Ошибка при регистрации');
        } finally {
            setLoading(false);
        }
    };

    return {
        register,
        loading,
        emailErrorText,
        phoneNumberErrorText,
        passwordErrorText,
        confirmPasswordErrorText,
        code,
    };
};
