import Image from "next/image";
import '../../../assets/css/patient-profile.css';
import { useEffect, useState } from "react";
import withAuth from '../../../components/withAuth';
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfilePhoneIcon from "@/assets/icons/profilePhoneIcon";
import ProfilePhoneMobileIcon from "@/assets/icons/profilePhoneIconMobile";
import ProfileEmailIcon from "@/assets/icons/profileEmailIcon";
import ProfileEmailIconTablet from "@/assets/icons/profileEmailIconTablet";
import ProfileEmailIconMobile from "@/assets/icons/profileEmailIconMobile";
import ProfileEditIcon from "@/assets/icons/profileEditIcon";
import ProfileCalendarIcon from "@/assets/icons/profileCalendarIcon";
import ProfileCalendarTabletIcon from "@/assets/icons/profileCalendarIconTablet";
import ProfileCalendarMobileIcon from "@/assets/icons/profileCalendarIconMobile";
import ProfileClockIcon from "@/assets/icons/profileClockIcon";
import ProfileClockMobileIcon from "@/assets/icons/profileClockIconMobile";
import ModalCloseIcon from "@/assets/icons/modalCloseIcon";
import ModalCloseMobileIcon from "@/assets/icons/modalCloseIconMobile";
import ModalCloseMobileIcon2 from "@/assets/icons/modalCloseIconMobile2";
import Link from "next/link";
import ProfilePhoneTabletIcon from "@/assets/icons/profilePhoneIconTablet";
import ProfileEditIconTablet from "@/assets/icons/profileEditIconTablet";
import ProfileEditIconMobile from "@/assets/icons/profileEditIconMobile";
import ProfileClockTabletIcon from "@/assets/icons/profileClockIconTablet";
import { useGetProfileInfo } from '@/hooks/useGetProfileInfo';
import { useGetAppointmentsSessions } from '@/hooks/useGetAppointmentsSessions';
import { useGetCertificates } from '@/hooks/useGetCertificates';
import { usePurchaseCertificates } from '@/hooks/usePurchaseCertificates';


const PatientProfile = () => {

    const [showBuyCertificatePopup, setShowBuyCertificatePopup] = useState(false);
    const [activeTab, setActiveTab] = useState("about");
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [selectedCertificateId, setSelectedCertificateId] = useState(null);
    const [imagePath, setImagePath] = useState('https://api.menspsychology.ru/uploads');
    const { getProfileInfo, loadingUserInfo, profileInfoData } = useGetProfileInfo();
    const { getAppointmentsSessions, appointmentsSessionsData } = useGetAppointmentsSessions();
    const { getCertificates, certificatesData } = useGetCertificates();
    const { purchaseCertificates, purchaseCertificatesData } = usePurchaseCertificates();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };



    useEffect(() => {
        if (purchaseCertificatesData) {
            if (purchaseCertificatesData?.message == "Certificate purchased successfully") {
                  setShowBuyCertificatePopup(false)
                    enableBodyScroll()
            }
        }

    }, [purchaseCertificatesData])
    const redirectToEditProfile = () => {
        router.push(`/patient/edit-profile`);
    }
    const router = useRouter();

    useEffect(() => {
        const role = localStorage.getItem('role');
        let role2 = ''
        let activeTab2 = ''
        console.log(role, 'role________')
        if (role == 'psycholog') {
            role2 = 'psychologist'
        } else {
             if (role == 'user') {
                 role2 = "user"
             }
        }

        if (activeTab === "upcoming" || activeTab === "past") {
            getAppointmentsSessions(role2, activeTab); // Send request only for "upcoming" or "past"
        }
    }, [activeTab]);

    useEffect(() => {
        getCertificates()
    }, [])

    useEffect(() => {
        if (purchaseCertificatesData) {
             if (purchaseCertificatesData?.message == "Certificate purchased successfully") {
                  setShowBuyCertificatePopup(false)
             }
             if (purchaseCertificatesData?.promo_code) {
                  localStorage.setItem('promo_code', purchaseCertificatesData?.promo_code)
             }
        }
    }, [purchaseCertificatesData])

    const handleOption1Change = (item) => {
        setSelectedCertificate(item?.name);
        setSelectedCertificateId(item?.id);
    };
    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };

    const buyCertificates = async () => {
        let userId = localStorage.getItem('userId')
        console.log(userId, selectedCertificateId, 'idiss____')
        await purchaseCertificates(userId, selectedCertificateId )
    }
    return (
        <div className={'main_wrapper'} id={'patient-profile'}>
            <Header activePage={"patient_profile"} />
            <section className="patient_profile_section">
                <div className="patient_profile_wrapper">
                    <div className="patient_profile_item1">
                        <div className="patient_profile_item1_img_info_wrapper">
                            <div className="patient_profile_item1_img">
                                <img
                                    src={profileInfoData?.image ? `${imagePath}/${profileInfoData?.image}` : '/images/patient_profile_img1.png'}
                                    alt="Company Logo"
                                />
                            </div>
                            <div className='patient_profile_item1_info_wrapper'>
                                <button
                                    className='mobile_patient_profile_item1_edit_btn'
                                    onClick={() => {
                                        redirectToEditProfile()
                                    }}
                                >
                                   <span className='edit_icon1'>
                                        <ProfileEditIcon/>
                                   </span>
                                    <span className='edit_icon2'>
                                        <ProfileEditIconTablet/>
                                   </span>
                                    <span className='edit_icon3'>
                                        <ProfileEditIconMobile/>
                                   </span>
                                </button>
                                <h1 className='patient_profile_item1_title'>
                                    {profileInfoData?.first_name} {profileInfoData?.last_name}
                                </h1>
                                <a href="tel:+7000000000" className='patient_profile_item1_phone_link'>
                                  <span className='patient_profile_item1_phone_link_icon'>
                                        <ProfilePhoneIcon/>
                                    </span>
                                    <span className='patient_profile_item1_phone_link_icon2'>
                                        <ProfilePhoneTabletIcon/>
                                    </span>
                                    <span className='patient_profile_item1_phone_link_icon3'>
                                        <ProfilePhoneMobileIcon/>
                                    </span>
                                    <span className='patient_profile_item1_phone_link_info'>
                                       {profileInfoData?.phone}
                                    </span>
                                </a>
                                <a href="mailto:Абалак@gmail.com" className='patient_profile_item1_phone_link'>
                                    <span className='patient_profile_item1_phone_link_icon'>
                                        <ProfileEmailIcon/>
                                    </span>
                                    <span className='patient_profile_item1_phone_link_icon2'>
                                        <ProfileEmailIconTablet/>
                                    </span>
                                    <span className='patient_profile_item1_phone_link_icon3'>
                                        <ProfileEmailIconMobile/>
                                    </span>
                                    <span className='patient_profile_item1_phone_link_info'>
                                       {profileInfoData?.email}
                                    </span>
                                </a>
                                <button
                                    className='buy_certificate_btn'
                                    onClick={() => {
                                        setShowBuyCertificatePopup(true)
                                        disableBodyScroll()
                                    }}
                                >
                                    Купить сертификат
                                </button>
                            </div>
                        </div>
                        <div className="patient_profile_item1_price_info_edit_btn_wrapper">
                                <button
                                    className='patient_profile_item1_edit_btn'
                                    onClick={() => {
                                        redirectToEditProfile()
                                    }}
                                >
                                  <span className='edit_icon1'>
                                        <ProfileEditIcon/>
                                   </span>
                                    <span className='edit_icon2'>
                                        <ProfileEditIconTablet/>
                                   </span>
                                    <span className='edit_icon3'>
                                        <ProfileEditIconMobile/>
                                   </span>
                                </button>
                                <div className='patient_profile_item1_account_price_info_wrapper'>
                                    <p className='patient_profile_item1_account_price_info1'>
                                        {profileInfoData?.balance} <span>Руб.</span>
                                    </p>
                                    <p className='patient_profile_item1_account_price_info2'>
                                        Ваш Счету
                                    </p>
                                </div>
                                <button className='add_to_account_btn'>
                                    Добавлять Счету
                                </button>
                        </div>

                    </div>
                    <div className="patient_profile_item2">
                        <div className="patient_profile_tabs_wrapper">
                            <button
                                className={`patient_profile_tab ${activeTab === "about" ? "patient_profile_tab_active" : ""}`}
                                onClick={() => handleTabClick("about")}
                            >
                                О себе
                            </button>
                            <button
                                className={`patient_profile_tab ${activeTab === "upcoming" ? "patient_profile_tab_active" : ""}`}
                                onClick={() => handleTabClick("upcoming")}
                            >
                                Запланированные
                            </button>
                            <button
                                className={`patient_profile_tab ${activeTab === "past" ? "patient_profile_tab_active" : ""}`}
                                onClick={() => handleTabClick("past")}
                            >
                                Завершенные
                            </button>
                        </div>
                        {activeTab === "about" && (
                            <div className='patient_profile_about_item'>
                                <p className='patient_profile_about_item_info'>
                                    {profileInfoData?.about}
                                </p>


                            </div>
                        )}

                        {activeTab === "upcoming" && (
                            <div className="patient_profile_planned_item">
                                {appointmentsSessionsData && appointmentsSessionsData.map((item ,index) => {
                                    return (
                                        <div key={index}
                                             className="patient_profile_planned_item_child patient_profile_planned_item_child1">
                                            <div className="patient_profile_planned_item_child_img">
                                                <img
                                                    src={item?.psychologist_image ? `${imagePath}/${item?.psychologist_image}` : '/images/psychologist_img13.png'}
                                                    alt="Company Logo"
                                                />
                                            </div>

                                            <div className="patient_profile_planned_item_child_info_wrapper">
                                                <p className='patient_profile_planned_item_child_name'>
                                                    {item?.first_name} {item?.last_name}
                                                </p>
                                                <p className="patient_profile_planned_item_child_position">
                                                    Психологи
                                                </p>
                                                <div
                                                    className='patient_profile_planned_item_child_date_hour_info_item_wrapper'>
                                                    <div
                                                        className='patient_profile_planned_item_child_date_hour_info_item'>
                                                        <div
                                                            className="patient_profile_planned_item_child_date_hour_info_item_icon">
                                                            <ProfileCalendarIcon/>
                                                        </div>
                                                        <div
                                                            className="patient_profile_planned_item_child_date_hour_info_item_icon2">
                                                            <ProfileCalendarTabletIcon/>
                                                        </div>
                                                        <div
                                                            className="patient_profile_planned_item_child_date_hour_info_item_icon3">
                                                            <ProfileCalendarMobileIcon/>
                                                        </div>
                                                        <p className="patient_profile_planned_item_child_date_hour_info_item_title">
                                                            {item?.appointment_date}
                                                        </p>
                                                    </div>
                                                    <div
                                                        className='patient_profile_planned_item_child_date_hour_info_item'>
                                                        <div
                                                            className="patient_profile_planned_item_child_date_hour_info_item_icon">
                                                            <ProfileClockIcon/>
                                                        </div>
                                                        <div
                                                            className="patient_profile_planned_item_child_date_hour_info_item_icon2">
                                                            <ProfileClockTabletIcon/>
                                                        </div>
                                                        <div
                                                            className="patient_profile_planned_item_child_date_hour_info_item_icon3">
                                                            <ProfileClockMobileIcon/>
                                                        </div>
                                                        <p className="patient_profile_planned_item_child_date_hour_info_item_title">
                                                            {item?.appointment_time}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className='patient_profile_planned_item_child_price'>
                                                    {item?.price}
                                                    <span>Руб.</span>
                                                </p>
                                            </div>

                                        </div>
                                    )
                                })}
                            </div>
                        )}

                        {activeTab === "past" && (
                            <div className="patient_profile_planned_item">
                                {appointmentsSessionsData && appointmentsSessionsData.map((item, index) => {
                                    return (
                                        <div key={index}
                                             className="patient_profile_planned_item_child patient_profile_planned_item_child2">
                                            <div className="patient_profile_planned_item_child_img">
                                                <img
                                                    src={item?.psychologist_image ? `${imagePath}/${item?.psychologist_image}` : '/images/psychologist_img13.png'}
                                                    alt="Company Logo"
                                                />
                                            </div>


                                            <div className="patient_profile_planned_item_child_info_wrapper">
                                                <p className='patient_profile_planned_item_child_name'>
                                                    {item?.first_name} {item?.last_name}
                                                </p>
                                                <p className="patient_profile_planned_item_child_position">
                                                    Психологи
                                                </p>
                                                <div
                                                    className='patient_profile_planned_item_child_date_hour_info_item_wrapper'>
                                                    <div
                                                        className='patient_profile_planned_item_child_date_hour_info_item'>
                                                        <div
                                                            className="patient_profile_planned_item_child_date_hour_info_item_icon">
                                                            <ProfileCalendarIcon/>
                                                        </div>
                                                        <div
                                                            className="patient_profile_planned_item_child_date_hour_info_item_icon2">
                                                            <ProfileCalendarTabletIcon/>
                                                        </div>
                                                        <div
                                                            className="patient_profile_planned_item_child_date_hour_info_item_icon3">
                                                            <ProfileCalendarMobileIcon/>
                                                        </div>
                                                        <p className="patient_profile_planned_item_child_date_hour_info_item_title">
                                                            {item?.appointment_date}
                                                        </p>
                                                    </div>
                                                    <div
                                                        className='patient_profile_planned_item_child_date_hour_info_item'>
                                                        <div
                                                            className="patient_profile_planned_item_child_date_hour_info_item_icon">
                                                            <ProfileClockIcon/>
                                                        </div>
                                                        <div
                                                            className="patient_profile_planned_item_child_date_hour_info_item_icon2">
                                                            <ProfileClockTabletIcon/>
                                                        </div>
                                                        <div
                                                            className="patient_profile_planned_item_child_date_hour_info_item_icon3">
                                                            <ProfileClockMobileIcon/>
                                                        </div>
                                                        <p className="patient_profile_planned_item_child_date_hour_info_item_title">
                                                            {item?.appointment_time}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className='patient_profile_planned_item_child_price'>
                                                    {item?.price}
                                                    <span>Руб.</span>
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}


                    </div>
                </div>
                {showBuyCertificatePopup && (
                    <div className='buy_certificate_popup'>
                        <div className="buy_certificate_popup_wrapper">
                            <div className="buy_certificate_popup_title_icon_wrapper">
                                <h1 className='buy_certificate_popup_title'>Купить сертификат</h1>
                                <button
                                    className='buy_certificate_popup_close_btn'
                                    onClick={() => {
                                        setShowBuyCertificatePopup(false)
                                        enableBodyScroll()
                                    }}
                                >

                                    <span className='modal_icon1'>
                                           <ModalCloseIcon/>
                                    </span>
                                    <span className='modal_icon2'>
                                           <ModalCloseMobileIcon/>
                                    </span>
                                    <span className='modal_icon3'>
                                           <ModalCloseMobileIcon2/>
                                    </span>
                                </button>
                            </div>
                            <div className='buy_certificate_popup_items_wrapper'>
                                {certificatesData && certificatesData.map((item, index) => {
                                    return (
                                        <label key={index} className='buy_certificate_popup_item'>
                                            <span className='buy_certificate_popup_item_title'>{item?.name}</span>
                                            <div className='buy_certificate_popup_item_price_info_wrapper'>
                                                <p className='buy_certificate_popup_item_price_info1'>{item?.total_price} <span>Руб</span> .</p>
                                                <span className='buy_certificate_popup_item_price_info2'>Цена сертификат</span>
                                            </div>
                                            <input
                                                type="radio"
                                                name="option1"
                                                value={item?.name}
                                                checked={selectedCertificate === item?.name}
                                                onChange={() => handleOption1Change(item)}
                                            />
                                            <span className="buy_certificate_popup_item_custom_radio"></span>


                                        </label>
                                    )
                                })}

                            </div>
                            <div className='buy_certificate_popup_btn_parent'>
                                <button
                                    className="buy_certificate_popup_btn"
                                    onClick={() => {
                                        buyCertificates()
                                    }}
                                >
                                    Купить
                                </button>
                            </div>

                        </div>
                    </div>
                )}
            </section>
            <Footer activePage={"patient_profile"}/>

        </div>
    );
};

export default withAuth(PatientProfile);
