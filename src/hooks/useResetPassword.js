import { useState } from 'react';

export const useResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState('');
    const [resetPasswordData, setResetPasswordData] = useState(null);

    const resetPassword = async (email) => {
        setLoading(true);
        setEmailErrorText('');


        try {
            // Validate inputs
                if (email.length == 0) {
                    setEmailErrorText('Поле является обязательным.');
                    setLoading(false);
                    return false;
                }


            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                }),
            });

            const data = await response.json();
            console.log(data, 'response______________-')
            if (!response.ok) {
                if (data.message === 'Пользователь не найден') {
                    setEmailErrorText('Пользователь не найден');
                } else {
                    throw new Error(data.message || 'Login failed');
                }
                setLoading(false);
                return false;
            }

            setResetPasswordData(data.code);
            // localStorage.setItem('token', data.token); // Сохранение токена в localStorage
        } catch (err) {
            console.error(err.message);
            // Handle unexpected errors
            setEmailErrorText('Ошибка при входе');
        } finally {
            setLoading(false);
        }
    };

    return { resetPassword, loading, emailErrorText, resetPasswordData };
};
