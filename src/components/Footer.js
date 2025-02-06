// components/Footer.js

import styles from '../assets/css/footer.css';
import Image from "next/image";
import Link from "next/link";

const Footer = (props) => {
    return (
        <footer className={'footer'}>
            <div className="footer_wrapper">
                <div className="footer_wrapper_child">
                    <a href='/' className='mobile_footer_logo_img'>
                        <img
                            src="/svg/logo.svg"
                            alt="Company Logo"
                        />

                    </a>
                    <nav className="footer_nav">
                        <ul className="footer_ul_list">
                            <li className="footer_ul_li">
                                <a href="/" className={`footer_ul_link ${props.activePage === 'home_page' ? 'active_link' : ''}`}>
                                    Главная страница
                                </a>
                            </li>
                            <li className="footer_ul_li">
                                <a href="" className={`footer_ul_link ${props.activePage === 'specialists' ? 'active_link' : ''}`}>
                                    Специалисты
                                </a>

                            </li>
                            <li className='footer_ul_li footer_logo_img_parent'>
                                <a href='/' className='footer_logo_img'>
                                    <img
                                        src="/svg/logo.svg"
                                        alt="Company Logo"
                                    />

                                </a>
                            </li>
                            <li className="footer_ul_li">
                                <a href="/about-us" className={`footer_ul_link ${props.activePage === 'about_us' ? 'active_link' : ''}`}>
                                    О нас
                                </a>
                            </li>
                            <li className="footer_ul_li">
                                <a href="/contact" className={`footer_ul_link ${props.activePage === 'contact' ? 'active_link' : ''}`}>
                                    Контакт
                                </a>
                            </li>


                        </ul>
                    </nav>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
