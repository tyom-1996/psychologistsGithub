import { useState } from 'react';
import { loginUser } from '../utils/api/authApi'; // Импортируем функцию из файла API

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState('');
    const [passwordErrorText, setPasswordErrorText] = useState('');
    const [loginData, setLoginData] = useState(null);

    const validateInputs = (email,  password) => {
        let isValid = true;
            if (!email) {
                setEmailErrorText('Поле является обязательным.');
                isValid = false;
            }
            if (!password) {
                setPasswordErrorText('Поле является обязательным.');
                isValid = false;
            }

        return isValid;
    };

    const login = async (email,  password) => {
        setLoading(true);
        setEmailErrorText('');
        setPasswordErrorText('');

        const isValid = validateInputs(email,  password);
        if (!isValid) {
            setLoading(false);
            return false;
        }

        try {
            const data = await loginUser(email,  password); // Используем API
            setLoginData(data);

            console.log(data, 'login_data____')
            localStorage.setItem('token', data?.token);
            localStorage.setItem('refreshToken', data?.refreshToken);
            localStorage.setItem('role', data?.user?.role); // Сохраняем токен в localStorage
            localStorage.setItem('userId', data?.user?.id); // Сохраняем токен в localStorage

        } catch (error) {
            console.log(error, 'errorrR______')
            if (error.message === 'Неверные учетные данные') {
                setEmailErrorText('Неверные учетные данные');
                // setPasswordErrorText('Неверные учетные данные');
            } else if (error.message === 'Почта не подтверждена. Проверьте вашу почту.') {
                setEmailErrorText('Почта не подтверждена. Проверьте вашу почту.');
            } else {
                // setEmailErrorText('Ошибка при входе');
            }
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, emailErrorText, passwordErrorText, loginData };
};
