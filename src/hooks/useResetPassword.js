// import { useState } from 'react';
//
// export const useResetPassword = () => {
//     const [loading, setLoading] = useState(false);
//     const [emailErrorText, setEmailErrorText] = useState('');
//     const [phoneErrorText, setPhoneErrorText] = useState('');
//     const [resetPasswordData, setResetPasswordData] = useState(null);
//
//     const validateInputs = (email, phone, type) => {
//         let isValid = true;
//
//         if (type === 'phone') {
//             if (!phone) {
//                 setPhoneErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//         } else if (type === 'email') {
//             if (!email) {
//                 setEmailErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//         }
//
//         return isValid;
//     };
//
//     const resetPassword = async (email, phone, type) => {
//         setLoading(true);
//         setEmailErrorText('');
//         setPhoneErrorText('')
//
//
//         const isValid = validateInputs(email, phone, type);
//         if (!isValid) {
//             setLoading(false);
//             return false;
//         }
//
//         try {
//             // Validate inputs
//
//              let body = {};
//
//             if (type === "email") {
//                 body.email = email;
//             } else if (type === "phone") {
//                 body.phone = phone;
//             }
//
//             const response = await fetch('http://localhost:3007/api/auth/reset-password', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(body),
//             });
//
//             const data = await response.json();
//             console.log(data, 'response______________-')
//             if (!response.ok) {
//                 if (data.message === 'Пользователь не найден') {
//                     if (type == 'email') {
//                         setEmailErrorText('Пользователь не найден');
//                     } else  if (type == 'phone') {
//                         setPhoneErrorText('Пользователь не найден');
//                     }
//                 } else {
//                     throw new Error(data.message || 'Login failed');
//                 }
//                 setLoading(false);
//                 return false;
//             }
//
//             setResetPasswordData(data.code);
//             // localStorage.setItem('token', data.token); // Сохранение токена в localStorage
//         } catch (err) {
//             console.error(err.message);
//             // Handle unexpected errors
//             setEmailErrorText('Ошибка при входе');
//             setPhoneErrorText('Ошибка при входе');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return { resetPassword, loading, emailErrorText, phoneErrorText, resetPasswordData };
// };

import { useState } from 'react';
import { setResetPassword } from '../utils/api/authApi'; // Import the API function

export const useResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [emailErrorText, setEmailErrorText] = useState('');
    const [resetPasswordData, setResetPasswordData] = useState(null);

    const validateInputs = (email) => {
        let isValid = true;

        if (!email) {
            setEmailErrorText('Поле является обязательным.');
            isValid = false;
        }
        return isValid;
    };

    const resetPassword = async (email) => {
        setLoading(true);
        setEmailErrorText('');

        const isValid = validateInputs(email);
        if (!isValid) {
            setLoading(false);
            return false;
        }

        try {
            const data = await setResetPassword(email); // Call the API function
            setResetPasswordData(data); // Handle the success response

        } catch (err) {
            // Handle error messages
            console.log(err, 'errr0_____')
            if (err === "User not found") {
                setEmailErrorText('Пользователь не найден');

            } else {
                setEmailErrorText('Ошибка при сбросе пароля');
            }
        } finally {
            setLoading(false);
        }
    };

    return { resetPassword, loading, emailErrorText, resetPasswordData };
};

