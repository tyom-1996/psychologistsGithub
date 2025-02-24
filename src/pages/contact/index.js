import Image from "next/image";
import '../../assets/css/contact.css';
import { useEffect, useState } from "react";
import withOutAuth from '../../components/withAuth';
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhoneIcon from "@/assets/icons/phoneIcon";
import TelegramIcon from "@/assets/icons/telegramIcon";
import TelegramIconTablet from "@/assets/icons/telegramIconTablet";
import TelegramIconMobile from "@/assets/icons/telegramIconMobile";
import PhoneIconTablet from "@/assets/icons/phoneIconTablet";
import PhoneIconMobile from "@/assets/icons/phoneIconMobile";
import EmailIcon from "@/assets/icons/emailIcon";
import EmailIconTablet from "@/assets/icons/emailIconTablet";
import EmailIconMobile from "@/assets/icons/emailIconMobile";
import GmailIcon from "@/assets/icons/gmailIcon";
import GmailIconTablet from "@/assets/icons/gmailIconTablet";
import GmailIconMobile from "@/assets/icons/gmailIconMobile";
import Link from "next/link";


const Contact = () => {

    const [showPaySuccessPopup, setShowPaySuccessPopup] = useState(false);


    const router = useRouter();

    useEffect(() => {

    }, []);




    return (
        <div className={'main_wrapper'} id={'contact'}>
            <Header activePage={"contact"} />
            <section className="contact">
                <div className="contact_wrapper">
                    <div className="contact_title_line_wrapper">
                        <h1 className="contact_title">
                            Контакт
                        </h1>
                        <div className="contact_line"></div>
                    </div>
                    <div className="contact_social_links_wrapper">
                        <Link href={'/'} className='contact_social_link'>
                            <span className='contact_social_link_icon'>
                                <TelegramIcon/>
                            </span>
                            <span className='contact_social_link_icon2'>
                                <TelegramIconTablet/>
                            </span>
                            <span className='contact_social_link_icon3'>
                                <TelegramIconMobile/>
                            </span>
                            <span className='contact_social_link_title'>
                                https://web.telegram.org/a/
                            </span>

                        </Link>
                        <Link href={'/'} className='contact_social_link'>
                          <span className='contact_social_link_icon'>
                                <EmailIcon/>
                            </span>
                            <span className='contact_social_link_icon2'>
                                <EmailIconTablet/>
                            </span>
                            <span className='contact_social_link_icon3'>
                                <EmailIconMobile/>
                            </span>
                            <span className='contact_social_link_title'>
                               аааа@mail.ru
                            </span>
                        </Link>
                        <Link href={'/'} className='contact_social_link'>
                            <span className='contact_social_link_icon'>
                                <GmailIcon/>
                            </span>
                            <span className='contact_social_link_icon2'>
                                <GmailIconTablet/>
                            </span>
                            <span className='contact_social_link_icon3'>
                                <GmailIconMobile/>
                            </span>
                            <span className='contact_social_link_title'>
                              Support@mail.ru
                            </span>
                        </Link>
                    </div>
                </div>
            </section>
            <Footer activePage={"contact"}/>

        </div>
    );
};

export default Contact;
