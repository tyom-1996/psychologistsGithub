// components/Header.js

import Link from 'next/link';
import '../assets/css/header.css';
import Image from "next/image";
import {useEffect, useState, useRef} from "react";
import CloseIcon from "../assets/icons/closeIcon";
import HamburgerIcon from "../assets/icons/hamburgerIcon";
import {useRouter} from "next/router";
import ProfileDropdownIcon from "@/assets/icons/profileDropdownIcon";
import ProfileDropdownIconMobile from "@/assets/icons/profileDropdownIconMobile";
import ProfileIconMenu from "@/assets/icons/profileIconMenu";
import ProfileIconMenuTablet from "@/assets/icons/profileIconMenuTablet";
import ProfileIconMenuMobile from "@/assets/icons/profileIconMenuMobile";
import SettingsIcon from "@/assets/icons/settingsIcon";
import SettingsIconTablet from "@/assets/icons/settingsIconTablet";
import SettingsIconMobile from "@/assets/icons/settingsIconMobile";
import LogoutIcon from "@/assets/icons/logoutIcon";
import LogoutIconTablet from "@/assets/icons/logoutIconTablet";
import LogoutIconMobile from "@/assets/icons/logoutIconMobile";
import {useGetProfileInfo} from "@/hooks/useGetProfileInfo";



const Header = (props) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [role, setRole] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const {getProfileInfo, loadingUserInfo, profileInfoData } = useGetProfileInfo();
    const [imagePath, setImagePath] = useState('https://api.menspsychology.ru/uploads');


    const handleOptionClick = (option) => {
        // setSelectedOption(option);
        setIsOpen(false);
        if (option == 'Профиль') {
            router.push('/patient/patient-profile');
        } else if (option == 'Настройки') {
            router.push('/patient/edit-profile');
        } else if (option == "Выйти") {
            router.push('/auth/login');
        }
    };


    useEffect(() => {
            const role = localStorage.getItem('role');
            setRole(role)
            let token = localStorage.getItem('token');
            if (token) {
                setIsLogged(true)
            }
    }, [])

    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };

    const router = useRouter();

    const logOut = async () => {
       await localStorage.clear()
        router.push('/');
    };
    const handleNavigateToHome =  () => {
        router.push('/');
    };





    return (
        <header className={'header'}>
            <div className="header_wrapper">
                <div className='header_logo_nav_wrapper'>
                    <button
                        className='header_hamburger_icon'
                        onClick={() => {
                            setShowMobileMenu(true)
                            disableBodyScroll()
                        }}
                    >
                        <HamburgerIcon/>
                    </button>
                    <button
                        className='header_logo_img'
                        onClick={() => {
                            handleNavigateToHome()
                        }}
                    >
                        <img
                            src="/svg/logo.svg"
                            alt="Company Logo"
                        />

                    </button>
                    <nav className="header_nav">
                        <ul className="header_ul_list">
                            <li className="header_ul_li">
                                <a href="/" className={`header_ul_link ${props.activePage === 'home_page' ? 'active_link' : ''}`}>
                                    Главная страница
                                </a>
                            </li>
                            <li className="header_ul_li">
                                <a href="/specialists" className={`header_ul_link ${props.activePage === 'specialists' ? 'active_link' : ''}`}>
                                    Специалисты
                                </a>

                            </li>
                            <li className="header_ul_li">
                                <a href="/about-us" className={`header_ul_link ${props.activePage === 'about_us' ? 'active_link' : ''}`}>
                                    О нас
                                </a>
                            </li>
                            <li className="header_ul_li">
                                <a href="/contact" className={`header_ul_link ${props.activePage === 'contact' ? 'active_link' : ''}`}>
                                    Контакт
                                </a>
                            </li>


                        </ul>
                    </nav>
                </div>
                {isLogged === true ?
                    (
                        <div className='header_user_info_wrapper'>
                            {role == 'user' &&
                                <div className='header_user_balance_info_wrapper'>
                                    <p className='header_user_balance_price_info'>
                                        {profileInfoData?.balance} <span>Руб.</span>
                                    </p>
                                    <p className='header_user_balance_info2'>Ваш счёт</p>
                                </div>
                            }

                            <div className="header_user_img_info_wrapper">
                                <div className="header_user_img">
                                    <img
                                        src={profileInfoData?.image   ? `${imagePath}/${profileInfoData?.image}` : '/images/profile_img2.png'}
                                        alt="Company Logo"
                                    />
                                </div>
                                <div className="header_dropdown_form">
                                    <div
                                        className='header_dropdown_header'
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        <p className="header_dropdown_header_title">
                                            {/*{selectedOption || "Юрий Абалак"}*/}
                                            {profileInfoData?.first_name} {profileInfoData?.last_name}
                                        </p>
                                        <div className='header_dropdown_header_icon'>
                                            <ProfileDropdownIcon/>
                                        </div>
                                        <div className='header_dropdown_header_icon_mobile'>
                                            <ProfileDropdownIconMobile/>
                                        </div>
                                    </div>

                                    {isOpen && (
                                        <div className="header_dropdown_menu">
                                            <div className='header_dropdown_menu_header'>
                                                <div className="header_user_img">
                                                    <img
                                                        src={profileInfoData?.image  ? `${imagePath}/${profileInfoData?.image}` : '/images/profile_img2.png'}
                                                        alt="Company Logo"
                                                    />
                                                </div>
                                                <div
                                                    className='header_dropdown_header'
                                                    onClick={() => setIsOpen(!isOpen)}
                                                >
                                                    <p className="header_dropdown_header_title">
                                                        {/*{selectedOption || "Юрий Абалак"}*/}
                                                        {profileInfoData?.first_name} {profileInfoData?.last_name}
                                                    </p>
                                                    <div className='header_dropdown_header_icon'>
                                                        <ProfileDropdownIcon/>
                                                    </div>
                                                    <div className='header_dropdown_header_icon_mobile'>
                                                        <ProfileDropdownIconMobile/>
                                                    </div>

                                                </div>
                                            </div>

                                            <ul className='header_dropdown_menu_list'>
                                                <li
                                                    className='header_dropdown_item'
                                                    onClick={() => {
                                                        let role = localStorage.getItem('role');
                                                        if (role == 'user') {
                                                            router.push('/patient/patient-profile');
                                                        } else {
                                                            router.push('/psychologists/psychologists-profile');
                                                        }
                                                        setIsOpen(false)
                                                    }}
                                                >
                                                    <span className='header_dropdown_item_icon1'>
                                                        <ProfileIconMenu/>
                                                    </span>
                                                    <span className='header_dropdown_item_icon2'>
                                                        <ProfileIconMenuTablet/>
                                                    </span>
                                                    <span className='header_dropdown_item_icon3'>
                                                        <ProfileIconMenuMobile/>
                                                    </span>
                                                    Профиль
                                                </li>

                                                <li
                                                    className='header_dropdown_item'
                                                    onClick={() => {
                                                        let role = localStorage.getItem('role');
                                                        if (role == 'user') {
                                                            router.push('/patient/edit-profile');
                                                        } else {
                                                            router.push('/psychologists/edit-profile');
                                                        }
                                                        setIsOpen(false)
                                                    }}
                                                >
                                                    <span className='header_dropdown_item_icon1'>
                                                        <SettingsIcon/>
                                                    </span>
                                                    <span className='header_dropdown_item_icon2'>
                                                        <SettingsIconTablet/>
                                                    </span>
                                                    <span className='header_dropdown_item_icon3'>
                                                        <SettingsIconMobile/>
                                                    </span>
                                                    Настройки
                                                </li>

                                                <li
                                                    className='header_dropdown_item'
                                                    onClick={() => {
                                                        logOut()
                                                        setIsOpen(false)
                                                    }}
                                                >
                                                    <span className='header_dropdown_item_icon1'>
                                                        <LogoutIcon/>
                                                    </span>
                                                    <span className='header_dropdown_item_icon2'>
                                                        <LogoutIconTablet/>
                                                    </span>
                                                    <span className='header_dropdown_item_icon3'>
                                                        <LogoutIconMobile/>
                                                    </span>
                                                    Выйти
                                                </li>



                                            </ul>


                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                    :
                    (
                        <div className='header_login_register_buttons_wrapper'>
                            <Link href={'/auth/login'} className='login_btn'>
                                Войти
                            </Link>
                            <Link href={'/auth/register'} className='register_btn'>
                                Регистрация
                            </Link>
                        </div>
                    )
                }

            </div>
            {showMobileMenu &&
                <div className='mobile_menu_modal'>
                    <div className='mobile_menu_modal_wrapper'>
                        <div className="mobile_menu_modal_header">
                            <div className='mobile_menu_modal_header_item1'>
                                <button
                                    className='mobile_menu_modal_close_btn'
                                    onClick={() => {
                                        setShowMobileMenu(false)
                                        enableBodyScroll()
                                    }}
                                >
                                    <CloseIcon/>
                                </button>
                                <Link
                                    href={'/'}
                                    className='mobile_header_logo_img'
                                >
                                    <img
                                        src="/svg/logo.svg"
                                        alt="Company Logo"
                                    />

                                </Link>
                            </div>


                            {role == 'user' &&
                                <div>
                                    {props.isLogged === true  &&
                                        <div className='mobile_header_user_balance_info_wrapper'>
                                            <p className='header_user_balance_price_info'>
                                                23000 <span>Руб.</span>
                                            </p>
                                            <p className='header_user_balance_info2'>Ваш счёт</p>
                                        </div>
                                    }
                                </div>
                            }

                        </div>
                        <nav className="mobile_header_nav">
                            <ul className="header_ul_list">
                                <li className="header_ul_li">
                                    <a href="/" className={`header_ul_link ${props.activePage === 'home_page' ? 'active_link' : ''}`}>
                                        Главная страница
                                    </a>
                                </li>
                                <li className="header_ul_li">
                                    <a href="/specialists" className={`header_ul_link ${props.activePage === 'specialists' ? 'active_link' : ''}`}>
                                        Специалисты
                                    </a>

                                </li>
                                <li className="header_ul_li">
                                    <a href="/about-us" className={`header_ul_link ${props.activePage === 'about_us' ? 'active_link' : ''}`}>
                                        О нас
                                    </a>
                                </li>
                                <li className="header_ul_li">
                                    <a href="/contact" className={`header_ul_link ${props.activePage === 'contact' ? 'active_link' : ''}`}>
                                        Контакт
                                    </a>
                                </li>


                            </ul>
                        </nav>
                    </div>
                </div>

            }

        </header>

    );
}

export default Header;
