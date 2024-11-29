import { useState } from 'react';

export const useSetNewPassword = () => {
    const [loading, setLoading] = useState(false);
    const [codeErrorText, setCodeErrorText] = useState('');
    const [passwordErrorText, setPasswordErrorText] = useState('');
    const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');
    const [newPasswordData, setNewPasswordData] = useState(null);

    const setNewPassword = async (email,code, password, confirmPassword) => {
        setLoading(true);
        setCodeErrorText('');
        setPasswordErrorText('');
        setConfirmPasswordErrorText('');


        try {
            // Validate inputs
                if (code.length == 0 || password.length == 0 || confirmPassword.length == 0) {
                     if (code.length == 0) {
                         setCodeErrorText('Поле является обязательным.')
                     }
                     if (password.length == 0) {
                         setPasswordErrorText('Поле является обязательным.')
                     }
                    if (confirmPassword.length == 0) {
                        setConfirmPasswordErrorText('Поле является обязательным.')
                    }
                    setLoading(false);
                    return false;
                }


            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-reset-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    code : code,
                    password: password,
                    confirm_password: confirmPassword
                }),
            });

            const data = await response.json();
            console.log(data, 'response______________-')
            if (!response.ok) {
                if (data.message === 'Пароли не совпадают') {
                    setConfirmPasswordErrorText('Пароли не совпадают');
                } if (data.message === 'Неверный код подтверждения') {
                    setCodeErrorText('Неверный код подтверждения');
                } else {
                    throw new Error(data.message || 'Login failed');
                }
                setLoading(false);
                return false;
            }

            setNewPasswordData(data.message);
            // localStorage.setItem('token', data.token); // Сохранение токена в localStorage
        } catch (err) {
            console.error(err.message);
            // Handle unexpected errors
            // setPasswordErrorText('Ошибка при входе');
            // setConfirmPasswordErrorText('Ошибка при входе');
            // setCodeErrorText('Ошибка при входе');
        } finally {
            setLoading(false);
        }
    };

    return {setNewPassword, loading, codeErrorText, passwordErrorText, confirmPasswordErrorText, newPasswordData };
};
