// import { useState } from 'react';
//
// export const useSetNewPassword = () => {
//     const [loading, setLoading] = useState(false);
//     const [codeErrorText, setCodeErrorText] = useState('');
//     const [passwordErrorText, setPasswordErrorText] = useState('');
//     const [emailErrorText, setEmailErrorText] = useState('');
//     const [phoneErrorText, setPhoneErrorText] = useState('');
//     const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');
//     const [newPasswordData, setNewPasswordData] = useState(null);
//
//     const validateInputs = (email,phone,code, newPassword, confirmPassword) => {
//         let isValid = true;
//
//         if (email) {
//             if (email.length == 0) {
//                 setEmailErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//             if (code.length == 0) {
//                 setCodeErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//             if (newPassword.length == 0) {
//                 setPasswordErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//             if (confirmPassword.length == 0) {
//                 setConfirmPasswordErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//
//         } else if (phone) {
//             if (phone.length == 0) {
//                 setPhoneErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//             if (code.length == 0) {
//                 setCodeErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//             if (newPassword.length == 0) {
//                 setPasswordErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//             if (confirmPassword.length == 0) {
//                 setConfirmPasswordErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//         }
//
//         return isValid;
//     };
//     const newPasswordSet = async (email,phone,code, newPassword, confirmPassword) => {
//         setLoading(true);
//         setCodeErrorText('');
//         setEmailErrorText('');
//         setPhoneErrorText('');
//         setPasswordErrorText('');
//         setConfirmPasswordErrorText('');
//
//         const isValid = validateInputs(email,phone,code, newPassword, confirmPassword);
//         if (!isValid) {
//             setLoading(false);
//             return false;
//         }
//
//
//         try {
//             let body = {};
//
//             if (email) {
//                 body.email = email;
//                 body.code = code;
//                 body.password = newPassword;
//                 body.confirm_password = confirmPassword;
//             } else if (phone) {
//                 body.phone = phone;
//                 body.code = code;
//                 body.password = newPassword;
//                 body.confirm_password = confirmPassword;
//             }
//
//
//             const response = await fetch('http://localhost:3007/api/auth/verify-reset-code', {
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
//                 if (data.message === 'Пароли не совпадают') {
//                     setConfirmPasswordErrorText('Пароли не совпадают');
//                 } if (data.message === 'Неверный код подтверждения') {
//                     setCodeErrorText('Неверный код подтверждения');
//                 } else {
//                     throw new Error(data.message || 'Login failed');
//                 }
//                 setLoading(false);
//                 return false;
//             }
//
//             setNewPasswordData(data.message);
//             // localStorage.setItem('token', data.token); // Сохранение токена в localStorage
//         } catch (err) {
//             console.error(err.message);
//             // Handle unexpected errors
//             // setPasswordErrorText('Ошибка при входе');
//             // setConfirmPasswordErrorText('Ошибка при входе');
//             // setCodeErrorText('Ошибка при входе');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return {newPasswordSet, loading, codeErrorText, passwordErrorText, confirmPasswordErrorText, newPasswordData };
// };


import { useState } from 'react';
import { getPsychologists2 } from '../utils/api/authApi'; // Import the API function

export const useGetPsychologists= (filters = {}) => {
    const [loading, setLoading] = useState(false);
    const [psychologistsData, setPsychologistsData] = useState(null);


    const getPsychologists = async () => {
        setLoading(true);

        try {
            const data = await getPsychologists2(filters); // Call the API function
            setPsychologistsData(data);
        } catch (error) {
            // if (error == 'Old password is incorrect') {
            // }
        } finally {
            setLoading(false);
        }
    };

    return {
        getPsychologists,
        psychologistsData,
        loading,
    };
};
