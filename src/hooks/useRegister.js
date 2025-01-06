// import { useState } from 'react';
//
// export const useRegister = () => {
//     const [loading, setLoading] = useState(false);
//     const [emailErrorText, setEmailErrorText] = useState('');
//     const [phoneNumberErrorText, setPhoneNumberErrorText] = useState('');
//     const [passwordPhoneErrorText, setPasswordPhoneErrorText] = useState('');
//     const [passwordEmailErrorText, setPasswordEmailErrorText] = useState('');
//     const [nameEmailErrorText, setNameEmailErrorText] = useState('');
//     const [surnameEmailErrorText, setSurnameEmailErrorText] = useState('');
//     const [namePhoneErrorText, setNamePhoneErrorText] = useState('');
//     const [surnamePhoneErrorText, setSurnamePhoneErrorText] = useState('');
//     const [confirmPasswordPhoneErrorText, setConfirmPasswordPhoneErrorText] = useState('');
//     const [confirmPasswordEmailErrorText, setConfirmPasswordEmailErrorText] = useState('');
//     const [code, setCode] = useState('');
//
//     const validateInputs = (email, phone, passwordEmail, passwordPhone, type, confirmPasswordEmail, confirmPasswordPhone, nameEmail, namePhone, surnameEmail, surnamePhone) => {
//         let isValid = true;
//
//         if (type === 'phone') {
//             if (!phone) {
//                 setPhoneNumberErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//             if (!namePhone) {
//                 setNamePhoneErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//             if (!surnamePhone) {
//                 setSurnamePhoneErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//             if (!passwordPhone) {
//                 setPasswordPhoneErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//
//             if (!confirmPasswordPhone) {
//                 setConfirmPasswordPhoneErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//
//             if (passwordPhone && confirmPasswordPhone && passwordPhone !== confirmPasswordPhone) {
//                 setConfirmPasswordPhoneErrorText('Пароли не совпадают');
//                 isValid = false;
//             }
//         } else if (type === 'email') {
//             if (!email) {
//                 setEmailErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//             if (!nameEmail) {
//                 setNameEmailErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//             if (!surnameEmail) {
//                 setSurnameEmailErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//             if (!passwordEmail) {
//                 setPasswordEmailErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//
//             if (!confirmPasswordEmail) {
//                 setConfirmPasswordEmailErrorText('Поле является обязательным.');
//                 isValid = false;
//             }
//
//             if (passwordEmail && confirmPasswordEmail && passwordEmail !== confirmPasswordEmail) {
//                 setConfirmPasswordEmailErrorText('Пароли не совпадают');
//                 isValid = false;
//             }
//         }
//
//         return isValid;
//     };
//
//     const register = async (email, phone, passwordEmail, passwordPhone, type, confirmPasswordEmail, confirmPasswordPhone, nameEmail, namePhone, surnameEmail, surnamePhone) => {
//         setLoading(true);
//         setEmailErrorText('');
//         setPhoneNumberErrorText('');
//         setPasswordPhoneErrorText('');
//         setPasswordEmailErrorText('');
//         setConfirmPasswordPhoneErrorText('');
//         setConfirmPasswordEmailErrorText('');
//         setNameEmailErrorText('');
//         setNamePhoneErrorText('');
//         setSurnameEmailErrorText('');
//         setSurnamePhoneErrorText('')
//
//         const isValid = validateInputs(email, phone, passwordEmail, passwordPhone, type, confirmPasswordEmail, confirmPasswordPhone, nameEmail, namePhone, surnameEmail, surnamePhone);
//         if (!isValid) {
//             setLoading(false);
//             return false;
//         }
//
//         let body = {};
//
//         if (type === "email") {
//             body.first_name = nameEmail;
//             body.last_name = surnameEmail;
//             body.email = email;
//             body.password = passwordEmail;
//             body.confirm_password = confirmPasswordEmail;
//         } else if (type === "phone") {
//             body.first_name = namePhone;
//             body.last_name = surnamePhone;
//             body.phone = phone;
//             body.password = passwordPhone;
//             body.confirm_password = confirmPasswordPhone;
//         }
//
//         console.log(body, 'bodyyyy_____')
//         try {
//             const response = await fetch('http://localhost:3007/api/auth/register/', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(body),
//             });
//
//             const data = await response.json();
//             console.log(data, 'register____')
//
//             if (!response.ok) {
//                 if (data.message === 'Пароли не совпадают') {
//                     setConfirmPasswordPhoneErrorText('Пароли не совпадают');
//                 } else if (data.message === 'Пользователь с таким email уже существует') {
//                     setEmailErrorText('Пользователь с таким email уже существует');
//                 } else if (data.message == "Пользователь с таким phone уже существует") {
//                     setPhoneNumberErrorText('Пользователь с таким phone уже существует')
//                 } else {
//                     throw new Error(data.message || 'Ошибка регистрации');
//                 }
//                 setLoading(false);
//                 return false;
//             }
//
//             if (data && data.code) {
//                 setCode(data.code);
//             }
//             console.log(data, 'hhddbsdbsdbdsbbdsbd')
//
//             // Handle successful registration here, like redirecting the user or displaying a success message.
//         } catch (err) {
//             console.error('ERROR:', err);
//             // Setting a general error message for all fields may be misleading. Consider handling it differently.
//             // setEmailErrorText('Ошибка при регистрации');
//             // setPhoneNumberErrorText('Ошибка при регистрации');
//             // setConfirmPasswordErrorText('Ошибка при регистрации');
//             // setPasswordErrorText('Ошибка при регистрации');
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return {
//         register,
//         loading,
//         emailErrorText,
//         phoneNumberErrorText,
//         passwordPhoneErrorText,
//         passwordEmailErrorText,
//         confirmPasswordPhoneErrorText,
//         confirmPasswordEmailErrorText,
//         nameEmailErrorText,
//         namePhoneErrorText,
//         surnameEmailErrorText,
//         surnamePhoneErrorText,
//         code,
//     };
// };



import { useState } from 'react';
import { registerUser } from '../utils/api/authApi'; // Импортируем функцию из файла API

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [nameErrorText, setNameErrorText] = useState('');
    const [surnameErrorText, setSurnameErrorText] = useState('');
    const [emailErrorText, setEmailErrorText] = useState('');
    const [phoneErrorText, setPhoneErrorText] = useState('');
    const [typeErrorText, setTypeErrorText] = useState('');
    const [passwordErrorText, setPasswordErrorText] = useState('');
    const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');
    const [registerData, setRegisterData] = useState(null);

    const validateInputs =  (name, surname, email, phone, selectedType, password, confirmPassword) => {
        let isValid = true;
        if (!name) {
            setNameErrorText('Поле является обязательным.');
            isValid = false;
        }
        if (!surname) {
            setSurnameErrorText('Поле является обязательным.');
            isValid = false;
        }
        if (!email) {
            setEmailErrorText('Поле является обязательным.');
            isValid = false;
        }

        if (phone.length <= 2) {
            setPhoneErrorText('Поле является обязательным.');
            isValid = false;
        }

        if (!selectedType) {
            setTypeErrorText('Поле является обязательным.');
            isValid = false;
        }

        if (!password) {
            setPasswordErrorText('Поле является обязательным.');
            isValid = false;
        }
        if (!confirmPassword) {
            setConfirmPasswordErrorText('Поле является обязательным.');
            isValid = false;
        }
        // if (password !== confirmPassword) {
        //     setConfirmPasswordErrorText('Пароли не совпадают');
        //     isValid = false;
        // }

        return isValid;
    };

    const fetchRegister = async (name, surname, email, phone, selectedType, password, confirmPassword) => {
        setLoading(true);
        setNameErrorText('');
        setSurnameErrorText('');
        setEmailErrorText('');
        setPhoneErrorText('');
        setTypeErrorText('');
        setPasswordErrorText('');
        setConfirmPasswordErrorText('')


        const isValid = validateInputs(name, surname, email, phone, selectedType, password, confirmPassword);
        if (!isValid) {
            setLoading(false);
            return false;
        }

        let body = {
                first_name: name,
                last_name: surname,
                email: email,
                password: password,
                confirm_password: confirmPassword,
                phone: phone,
                role: selectedType
            };
        console.log(body, 'body_______')

        try {
            const data = await registerUser(body); // Используем API функцию для регистрации
            setRegisterData(data)

            // if (data && data.code) {
            //     setCode(data.code);
            // }


            console.log(data, 'Registration successful');
            // Обработайте успешную регистрацию, например, перенаправление пользователя

        } catch (error) {
            if (error.message === 'Passwords do not match') {
                setConfirmPasswordErrorText('Пароли не совпадают');
            } else if (error.message === 'User already exists') {
                setEmailErrorText('Пользователь с таким email уже существует');
            } else {
                console.error('Ошибка регистрации:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        fetchRegister,
        loading,
        nameErrorText,
        surnameErrorText,
        emailErrorText,
        phoneErrorText,
        typeErrorText,
        passwordErrorText,
        confirmPasswordErrorText,
        registerData
    };
};
