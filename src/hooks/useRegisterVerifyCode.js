import { useState } from 'react';

export const useRegisterVerifyCode= () => {
    const [loading, setLoading] = useState(false);
    const [codeErrorText, setCodeErrorText] = useState('');
    const [loginData, setLoginData] = useState(null);

    const registerVerifyCode = async (email,phone, code) => {
        console.log(email, 'body_________nsnnsns')

        setCodeErrorText('')
        setLoading(true);

        try {
            if (code.length == 0) {
                setCodeErrorText('Поле является обязательным.');
                setLoading(false);
                return false;
            } else {
                setCodeErrorText('')
            }

            let body = {
                code: code,
            };

            if (email) {
                body.email = email;
            } else if (phone) {
                body.phone = phone;
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            console.log(data, 'response______________-')
            if (!response.ok) {
                if (data.message == 'Неверный код подтверждения') {
                    setCodeErrorText('Неверный код подтверждения');
                } else {
                    setCodeErrorText('')
                    throw new Error(data.message || 'Login failed');
                }
                setLoading(false);
                return false;
            }

            setLoginData(data);
            // console.log(data.token, 'data.token')
            // localStorage.setItem('token', data.token); // Сохранение токена в localStorage
        } catch (err) {
            console.error(err.message);
            // Handle unexpected errors
            setCodeErrorText('Ошибка при входе');
        } finally {
            setLoading(false);
        }
    };

    return { registerVerifyCode, loading, codeErrorText, loginData };
};
