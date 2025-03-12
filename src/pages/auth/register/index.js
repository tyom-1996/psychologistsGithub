import Image from "next/image";
import '../../../assets/css/login.css';
import { useEffect, useState } from "react";
import Link from "next/link";
import withOutAuth from '../../../components/withOutAuth';
import { useRouter } from "next/router";
import { PasswordShowIcon } from '../../../assets/icons/PasswordShowIcon';
import DropDownIcon from '../../../assets/icons/dropdownIcon';
import DropDownMobileIcon from '../../../assets/icons/dropdownMobileIcon';
import { PasswordCloseIcon } from '../../../assets/icons/PasswordCloseIcon';
import { useRegister } from '../../../hooks/useRegister';

const Register = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('+7'); // Initialize with "+7"
    const [isChecked, setIsChecked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [checkError, setCheckError] = useState(false);
    const [options, setOptions] = useState([
        {
            id: 1,
            name: "Клиент",
        },

        {
            id: 2,
            name: "Психолог",
        },

    ]);
    const { fetchRegister, loading, nameErrorText, surnameErrorText, registerData,
            emailErrorText, phoneErrorText, typeErrorText, passwordErrorText, confirmPasswordErrorText} = useRegister();
    "User registered successfully. Please check your email to confirm registration."


    useEffect(() => {
        if (registerData) {
            if (registerData?.message == "User registered successfully. Please check your email to confirm registration.") {
                router.push(`/auth/register/code/${email}`);
            }
        }
    }, [registerData]);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        if (option == 'Клиент') {
            setSelectedType('user')
        } else if (option == 'Психолог') {
             setSelectedType('psycholog')
        }
        setIsOpen(false);
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };
    const router = useRouter();

    useEffect(() => {

    }, []);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        //
        // if (name != '' && surname != '' && email != '' && phone != '' &&  selectedType != ''  && password != '' && confirmPassword != '') {
        //     if(!isChecked) {
        //         setCheckError(true)
        //         return false
        //     }
        // }



        await fetchRegister(name, surname, email, phone, selectedType, password, confirmPassword);
    };


    return (
        <div className={'login-wrapper2'}>
            <header className='login-wrapper_header'>
                <Link href={'/'} className='login-wrapper_header_link'>
                    <img
                        src="/svg/logo.svg"
                        alt="Company Logo"
                    />
                </Link>
            </header>
            <div className='login_form'>
                <h1 className='login_form_title'>Регистрация</h1>
                <div className='login_form_input'>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        placeholder='Имя'
                        className='login_form_input_field'
                    />
                </div>
                {nameErrorText &&
                    <p className='error_text'>
                        {nameErrorText}
                    </p>
                }
                <div className='login_form_input'>
                    <input
                        type='text'
                        value={surname}
                        onChange={(e) => {
                            setSurname(e.target.value)
                        }}
                        placeholder='Фамилия'
                        className='login_form_input_field'
                    />
                </div>
                {surnameErrorText &&
                    <p className='error_text'>
                        {surnameErrorText}
                    </p>
                }
                <div className='login_form_input'>
                    <input
                        type='text'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        placeholder='Эл.почта'
                        className='login_form_input_field'
                    />
                </div>
                {emailErrorText &&
                    <p className='error_text'>
                        {emailErrorText}
                    </p>
                }
                <div className="login_form_input_wrapper">
                    <input
                        type="text"
                        className="login_form_input_field1"
                        value="+7"
                        readOnly // Country code is non-editable
                    />
                    <input
                        type="number"
                        className="login_form_input_field2"
                        value={phone.slice(2)} // Display only the phone number part
                        onChange={(e) => setPhone('+7' + e.target.value)} // Prepend "+7" on input change
                        placeholder="Номер Телефона"
                    />
                </div>
                {phoneErrorText &&
                    <p className='error_text'>
                        {phoneErrorText}
                    </p>
                }
                <div className="dropdown_form">
                    <div
                        className='dropdown_header'
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <p className="dropdown_header_title">
                            {selectedOption || "Выберите вариант"}
                        </p>
                        <div className='dropdown_header_icon'>
                            <DropDownIcon/>
                        </div>
                        <div className='dropdown_header_icon_mobile'>
                            <DropDownMobileIcon/>
                        </div>
                    </div>

                    {isOpen && (
                        <ul className="dropdown_menu">
                            {options.map((option, index) => (
                                <li
                                    key={index}
                                    className="dropdown_item"
                                    onClick={() => handleOptionClick(option?.name)}
                                >
                                    {option?.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {typeErrorText &&
                    <p className='error_text'>
                        {typeErrorText}
                    </p>
                }
                <div className='login_form_input' id='login_form_input_password1'>
                    <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder='Пароль'
                        className='login_form_input_field'
                    />
                    <button className='password_icon_btn' onClick={togglePasswordVisibility}>
                        {isPasswordVisible ? <PasswordShowIcon/> : <PasswordCloseIcon/>}
                    </button>
                </div>
                {passwordErrorText &&
                    <p className='error_text'>
                        {passwordErrorText}
                    </p>
                }
                <div className='login_form_input' id='login_form_input_password2'>
                    <input
                        type={isConfirmPasswordVisible ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        placeholder='Повторите пароль*'
                        className='login_form_input_field'
                    />
                    <button className='password_icon_btn' onClick={toggleConfirmPasswordVisibility}>
                        {isConfirmPasswordVisible ? <PasswordShowIcon/> : <PasswordCloseIcon/>}
                    </button>
                </div>
                {confirmPasswordErrorText &&
                    <p className='error_text'>
                        {confirmPasswordErrorText}
                    </p>
                }

                <div className='checkbox_input_title_wrapper'>
                    <label className='checkbox_input_label'>
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <span className={checkError ? 'custom_checkbox_error' : 'custom_checkbox'}></span>

                    </label>
                    <span className='checkbox_input_title'>
                        Согласие на предоставление и обработку персональных данных в
                        соответствии с <span className='checkbox_input_title2'>пользовательским соглашением</span>
                    </span>
                </div>
                <div className="login_form_btn_parent">
                    <button
                        className='login_form_btn'
                        onClick={(e) => {
                            handleRegister(e)
                        }}
                    >
                        Регистрация
                    </button>
                </div>

                <div className='login_form_register_info_link'>
                    <p className='login_form_register_info'>Уже есть аккаунт?</p>
                    <Link href={'/auth/login'} className='login_form_register_link'>
                        Войти
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default withOutAuth(Register) ;
