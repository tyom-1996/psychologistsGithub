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
import CalendarCloseIcon from "@/assets/icons/calendarCloseIcon";
import CalendarCloseIconMobile from "@/assets/icons/calendarCloseIconMobile";
import PayIcon from "@/assets/icons/payIcon";
import PayTabletIcon from "@/assets/icons/payTabletIcon";
import PayMobileIcon from "@/assets/icons/payMobileIcon";
import {usePayment} from "@/hooks/usePayment";

const PatientProfile = () => {
    const [showBuyCertificatePopup, setShowBuyCertificatePopup] = useState(false);
    const [activeTab, setActiveTab] = useState("upcoming");
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [selectedCertificateId, setSelectedCertificateId] = useState(null);
    const [showBalanceError, setShowBalanceError] = useState('');
    const [imagePath, setImagePath] = useState('https://api.menspsychology.ru/uploads');
    const { getProfileInfo, loadingUserInfo, profileInfoData } = useGetProfileInfo();
    const { getAppointmentsSessions, appointmentsSessionsData } = useGetAppointmentsSessions();
    const { getCertificates, certificatesData } = useGetCertificates();
    const { paymentData, payment, errorPaymentData,balanceErrorText } = usePayment();
    const { purchaseCertificates, purchaseCertificatesData,errorPurchaseCertificatesData } = usePurchaseCertificates();
    const [showPaySuccessPopup, setShowPaySuccessPopup] = useState(false);
    const [showBalancePopup, setShowBalancePopup] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [balance, setBalance] = useState('');
    const router = useRouter();
    const [copied, setCopied] = useState(false);

    const handleCopy = (e) => {
        // Prevent parent click events if necessary
        e.stopPropagation();
        navigator.clipboard.writeText(promoCode)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Clear message after 2 seconds
            })
            .catch((err) => {
                console.error("Ошибка копирования:", err);
            });
    };
    useEffect(() => {
        if (paymentData) {
             if (paymentData?.paymentUrl) {
                 window.location.href = paymentData.paymentUrl;
             }
        }
    }, [paymentData])

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    useEffect(() => {
        if (purchaseCertificatesData) {
            if (purchaseCertificatesData?.message == 'Certificate purchased successfully') {
                 setShowPaySuccessPopup(true)
                 setPromoCode(purchaseCertificatesData?.promo_code)
            }
        }
    }, [purchaseCertificatesData])

    useEffect(() => {
        if (errorPurchaseCertificatesData) {
            if (errorPurchaseCertificatesData == "Insufficient balance to purchase this certificate") {
                setShowBalanceError('Недостаточно средств для покупки этого сертификата')
            }
        }

    }, [errorPurchaseCertificatesData])


    // When activeTab is "upcoming" or "past", fetch appointments for the given role.
    useEffect(() => {
        const role = localStorage.getItem('role');
        let role2 = '';
        if (role === 'psycholog') {
            role2 = 'psychologist';
        } else if (role === 'user') {
            role2 = 'user';
        }
        if (activeTab === "upcoming" || activeTab === "past") {
            getAppointmentsSessions(role2, activeTab);
        }
    }, [activeTab]);

    useEffect(() => {
        getCertificates();
    }, []);

    useEffect(() => {
        if (purchaseCertificatesData) {
            if (purchaseCertificatesData?.message === "Certificate purchased successfully") {
                setShowBuyCertificatePopup(false);

                enableBodyScroll();
            }
            if (purchaseCertificatesData?.promo_code) {
                localStorage.setItem('promo_code', purchaseCertificatesData?.promo_code);
            }
        }
    }, [purchaseCertificatesData]);

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
        let userId = localStorage.getItem('userId');
        console.log(userId, selectedCertificateId, 'idiss____');
        await purchaseCertificates(userId, selectedCertificateId);
    };

    const redirectToEditProfile = () => {
        router.push(`/patient/edit-profile`);
    };

    // ------------- Filtering Appointments by Date -------------
    // Helper function to parse a date string "dd.mm.yyyy" into a Date object (time set to midnight)
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('.');
        const date = new Date(year, month - 1, day);
        date.setHours(0, 0, 0, 0);
        return date;
    };

// Get today's date with the time set to midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

// Filter appointments based on the appointment_date from the API response
    const upcomingAppointments = appointmentsSessionsData
        ? appointmentsSessionsData.filter(
            (item) => new Date(item.appointment_date) > today
        )
        : [];

    const pastAppointments = appointmentsSessionsData
        ? appointmentsSessionsData.filter(
            (item) => new Date(item.appointment_date) <= today
        )
        : [];


    const addBalance = async () => {
        await  payment(balance)
    }
    const redirectTPsychologistsSinglePage = (id) => {
        router.push(`/specialists/${id}`);
    };

    return (
        <div className={'main_wrapper'} id={'patient-profile'}>
            <Header activePage={"patient_profile"} />
            <section className="patient_profile_section">
                <div className="patient_profile_wrapper">
                    <div className="patient_profile_item1">
                        <div className="patient_profile_item1_img_info_wrapper">
                            <div className="patient_profile_item1_img">
                                <img
                                    src={
                                        profileInfoData?.image
                                            ? `${imagePath}/${profileInfoData?.image}`
                                            : '/images/patient_profile_img1.png'
                                    }
                                    alt="Profile"
                                />
                            </div>
                            <div className="patient_profile_item1_info_wrapper">
                                <button
                                    className="mobile_patient_profile_item1_edit_btn"
                                    onClick={redirectToEditProfile}
                                >
                  <span className="edit_icon1">
                    <ProfileEditIcon />
                  </span>
                                    <span className="edit_icon2">
                    <ProfileEditIconTablet />
                  </span>
                                    <span className="edit_icon3">
                    <ProfileEditIconMobile />
                  </span>
                                </button>
                                <h1 className="patient_profile_item1_title">
                                    {profileInfoData?.first_name} {profileInfoData?.last_name}
                                </h1>
                                <a href="tel:+7000000000" className="patient_profile_item1_phone_link">
                  <span className="patient_profile_item1_phone_link_icon">
                    <ProfilePhoneIcon />
                  </span>
                                    <span className="patient_profile_item1_phone_link_icon2">
                    <ProfilePhoneTabletIcon />
                  </span>
                                    <span className="patient_profile_item1_phone_link_icon3">
                    <ProfilePhoneMobileIcon />
                  </span>
                                    <span className="patient_profile_item1_phone_link_info">
                    {profileInfoData?.phone}
                  </span>
                                </a>
                                <a
                                    href="mailto:Абалак@gmail.com"
                                    className="patient_profile_item1_phone_link"
                                >
                  <span className="patient_profile_item1_phone_link_icon">
                    <ProfileEmailIcon />
                  </span>
                                    <span className="patient_profile_item1_phone_link_icon2">
                    <ProfileEmailIconTablet />
                  </span>
                                    <span className="patient_profile_item1_phone_link_icon3">
                    <ProfileEmailIconMobile />
                  </span>
                                    <span className="patient_profile_item1_phone_link_info">
                    {profileInfoData?.email}
                  </span>
                                </a>
                                <button
                                    className="buy_certificate_btn"
                                    onClick={() => {
                                        setShowBuyCertificatePopup(true);
                                        disableBodyScroll();
                                    }}
                                >
                                    Купить сертификат
                                </button>
                            </div>
                        </div>
                        <div className="patient_profile_item1_price_info_edit_btn_wrapper">
                            <button
                                className="patient_profile_item1_edit_btn"
                                onClick={redirectToEditProfile}
                            >
                <span className="edit_icon1">
                  <ProfileEditIcon />
                </span>
                                <span className="edit_icon2">
                  <ProfileEditIconTablet />
                </span>
                                <span className="edit_icon3">
                  <ProfileEditIconMobile />
                </span>
                            </button>
                            <div className="patient_profile_item1_account_price_info_wrapper">
                                <p className="patient_profile_item1_account_price_info1">
                                    {profileInfoData?.balance} <span>Руб.</span>
                                </p>
                                <p className="patient_profile_item1_account_price_info2">
                                    Ваш счёт
                                </p>
                            </div>
                            <button
                                className="add_to_account_btn"
                                onClick={() => {
                                    setShowBalancePopup(true)
                                }}
                            >Пополнить счёт</button>
                        </div>
                    </div>
                    <div className="patient_profile_item2">
                        <div className="patient_profile_tabs_wrapper2">
                            {/*<button*/}
                            {/*    className={`patient_profile_tab ${*/}
                            {/*        activeTab === "about" ? "patient_profile_tab_active" : ""*/}
                            {/*    }`}*/}
                            {/*    onClick={() => handleTabClick("about")}*/}
                            {/*>*/}
                            {/*    О себе*/}
                            {/*</button>*/}
                            <button
                                className={`patient_profile_tab ${
                                    activeTab === "upcoming" ? "patient_profile_tab_active" : ""
                                }`}
                                onClick={() => handleTabClick("upcoming")}
                            >
                                Запланированные
                            </button>
                            <button
                                className={`patient_profile_tab ${
                                    activeTab === "past" ? "patient_profile_tab_active" : ""
                                }`}
                                onClick={() => handleTabClick("past")}
                            >
                                Завершенные
                            </button>
                        </div>

                        {/*{activeTab === "about" && (*/}
                        {/*    <div className="patient_profile_about_item">*/}
                        {/*        <p className="patient_profile_about_item_info">*/}
                        {/*            {profileInfoData?.about}*/}
                        {/*        </p>*/}
                        {/*    </div>*/}
                        {/*)}*/}

                        {activeTab === "upcoming" && (
                            <div className="patient_profile_planned_item">
                                {upcomingAppointments.length > 0 ? (
                                    upcomingAppointments.map((item, index) => (
                                        <div
                                            key={index}
                                            className="patient_profile_planned_item_child patient_profile_planned_item_child1"
                                            onClick={() => redirectTPsychologistsSinglePage(item?.psychologist_id)}
                                        >
                                            <div className="patient_profile_planned_item_child_img">
                                                <img
                                                    src={
                                                        item?.psychologist_image
                                                            ? `${imagePath}/${item?.psychologist_image}`
                                                            : "/images/psychologist_img13.png"
                                                    }
                                                    alt="Psychologist"
                                                />
                                            </div>
                                            <div className="patient_profile_planned_item_child_info_wrapper">
                                                <p className="patient_profile_planned_item_child_name">
                                                    {item?.first_name} {item?.last_name}
                                                </p>
                                                <p className="patient_profile_planned_item_child_position">
                                                    Психологи
                                                </p>
                                                <div className="patient_profile_planned_item_child_date_hour_info_item_wrapper">
                                                    <div className="patient_profile_planned_item_child_date_hour_info_item">
                                                        <div className="patient_profile_planned_item_child_date_hour_info_item_icon">
                                                            <ProfileCalendarIcon />
                                                        </div>
                                                        <div className="patient_profile_planned_item_child_date_hour_info_item_icon2">
                                                            <ProfileCalendarTabletIcon />
                                                        </div>
                                                        <div className="patient_profile_planned_item_child_date_hour_info_item_icon3">
                                                            <ProfileCalendarMobileIcon />
                                                        </div>
                                                        <p className="patient_profile_planned_item_child_date_hour_info_item_title">
                                                            {item?.appointment_date}
                                                        </p>
                                                    </div>
                                                    <div className="patient_profile_planned_item_child_date_hour_info_item">
                                                        <div className="patient_profile_planned_item_child_date_hour_info_item_icon">
                                                            <ProfileClockIcon />
                                                        </div>
                                                        <div className="patient_profile_planned_item_child_date_hour_info_item_icon2">
                                                            <ProfileClockTabletIcon />
                                                        </div>
                                                        <div className="patient_profile_planned_item_child_date_hour_info_item_icon3">
                                                            <ProfileClockMobileIcon />
                                                        </div>
                                                        <p className="patient_profile_planned_item_child_date_hour_info_item_title">
                                                            {item?.appointment_time}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="patient_profile_planned_item_child_price">
                                                    {item?.price}
                                                    <span> Руб.</span>
                                                </p>
                                                {item?.appointment_link &&
                                                    <a href={item?.appointment_link} target='_blank'
                                                       className='open_video_chat_link'
                                                       onClick={(e) => e.stopPropagation()}
                                                    >
                                                        Открыть видеочат
                                                    </a>
                                                }
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Нет запланированных встреч.</p>
                                )}
                            </div>
                        )}

                        {activeTab === "past" && (
                            <div className="patient_profile_planned_item">
                                {pastAppointments.length > 0 ? (
                                    pastAppointments.map((item, index) => (
                                        <div
                                            key={index}
                                            className="patient_profile_planned_item_child patient_profile_planned_item_child2"
                                            onClick={() => redirectTPsychologistsSinglePage(item?.psychologist_id)}
                                        >
                                            <div className="patient_profile_planned_item_child_img">
                                                <img
                                                    src={
                                                        item?.psychologist_image
                                                            ? `${imagePath}/${item?.psychologist_image}`
                                                            : "/images/psychologist_img13.png"
                                                    }
                                                    alt="Psychologist"
                                                />
                                            </div>
                                            <div className="patient_profile_planned_item_child_info_wrapper">
                                                <p className="patient_profile_planned_item_child_name">
                                                    {item?.first_name} {item?.last_name}
                                                </p>
                                                <p className="patient_profile_planned_item_child_position">
                                                    Психологи
                                                </p>
                                                <div className="patient_profile_planned_item_child_date_hour_info_item_wrapper">
                                                    <div className="patient_profile_planned_item_child_date_hour_info_item">
                                                        <div className="patient_profile_planned_item_child_date_hour_info_item_icon">
                                                            <ProfileCalendarIcon />
                                                        </div>
                                                        <div className="patient_profile_planned_item_child_date_hour_info_item_icon2">
                                                            <ProfileCalendarTabletIcon />
                                                        </div>
                                                        <div className="patient_profile_planned_item_child_date_hour_info_item_icon3">
                                                            <ProfileCalendarMobileIcon />
                                                        </div>
                                                        <p className="patient_profile_planned_item_child_date_hour_info_item_title">
                                                            {item?.appointment_date}
                                                        </p>
                                                    </div>
                                                    <div className="patient_profile_planned_item_child_date_hour_info_item">
                                                        <div className="patient_profile_planned_item_child_date_hour_info_item_icon">
                                                            <ProfileClockIcon />
                                                        </div>
                                                        <div className="patient_profile_planned_item_child_date_hour_info_item_icon2">
                                                            <ProfileClockTabletIcon />
                                                        </div>
                                                        <div className="patient_profile_planned_item_child_date_hour_info_item_icon3">
                                                            <ProfileClockMobileIcon />
                                                        </div>
                                                        <p className="patient_profile_planned_item_child_date_hour_info_item_title">
                                                            {item?.appointment_time}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="patient_profile_planned_item_child_price">
                                                    {item?.price}
                                                    <span> Руб.</span>
                                                </p>
                                                {item?.appointment_link  &&
                                                    <a href={item?.appointment_link} target='_blank'
                                                       className='open_video_chat_link'
                                                       onClick={(e) => e.stopPropagation()}
                                                    >
                                                        Открыть видеочат
                                                    </a>
                                                }
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>Нет завершённых встреч.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {showBuyCertificatePopup && (
                    <div className="buy_certificate_popup">
                        <div className="buy_certificate_popup_wrapper">
                            {showBalanceError.length > 0  &&
                                <p className='buy_certificate_popup_title2'>
                                    {showBalanceError}
                                </p>
                            }
                            <div className="buy_certificate_popup_title_icon_wrapper">
                                <h1 className="buy_certificate_popup_title">Купить сертификат</h1>
                                <button
                                    className="buy_certificate_popup_close_btn"
                                    onClick={() => {
                                        setShowBuyCertificatePopup(false);
                                        enableBodyScroll();
                                    }}
                                >
                                          <span className="modal_icon1">
                                            <ModalCloseIcon />
                                          </span>
                                        <span className="modal_icon2">
                                                <ModalCloseMobileIcon />
                                        </span>
                                        <span className="modal_icon3">
                                                <ModalCloseMobileIcon2 />
                                        </span>
                                </button>
                            </div>

                            <div className="buy_certificate_popup_items_wrapper">
                                {certificatesData &&
                                    certificatesData.map((item, index) => (
                                        <label key={index} className="buy_certificate_popup_item">
                      <span className="buy_certificate_popup_item_title">
                        {item?.name}
                      </span>
                        <div className="buy_certificate_popup_item_price_info_wrapper">
                            <p className="buy_certificate_popup_item_price_info1">
                                {item?.total_price} <span>Руб</span>.
                            </p>
                            <span className="buy_certificate_popup_item_price_info2">
                                    Цена сертификата
                            </span>
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
                                    ))}
                            </div>
                            <div className="buy_certificate_popup_btn_parent">
                                <button
                                    className="buy_certificate_popup_btn"
                                    onClick={buyCertificates}
                                >
                                    Купить
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {showPaySuccessPopup &&
                    <div className="pay_success_popup">
                        <div className='pay_success_popup_wrapper'>
                            <button
                                className="pay_success_popup_close_btn"
                                onClick={() => {
                                    setShowPaySuccessPopup(false)
                                    enableBodyScroll()
                                }}
                            >
                                     <span className='calendar_popup_close_btn_icon1'>
                                           <CalendarCloseIcon/>
                                    </span>

                                <span className='calendar_popup_close_btn_icon2'>
                                        <CalendarCloseIconMobile/>
                                    </span>
                            </button>
                            <div className='pay_success_popup_icon_wrapper'>
                                    <span className='pay_success_popup_icon1'>
                                        <PayIcon/>
                                    </span>
                                <span className='pay_success_popup_icon2'>
                                        <PayTabletIcon/>
                                    </span>
                                <span className='pay_success_popup_icon3'>
                                        <PayMobileIcon/>
                                    </span>
                            </div>
                            <h1 className='pay_success_popup_title'>
                                Оплата Подтверждена
                            </h1>
                            <div
                                className="promo-code-container"
                                onClick={handleCopy}

                            >
                                <span className="promo-code-text">Ваш промокод: {promoCode}</span>
                                {copied && (
                                    <span style={{ marginLeft: '10px', color: 'green' }}>Скопировано!</span>
                                )}
                            </div>

                            <a href='/' className='pay_success_popup_btn'>
                                Главная Страница
                            </a>
                        </div>
                    </div>
                }

                {showBalancePopup &&
                    <div className="pay_success_popup">
                        <div className='pay_success_popup_wrapper2'>
                            <button
                                className="pay_success_popup_close_btn"
                                onClick={() => {
                                    setShowBalancePopup(false)
                                    enableBodyScroll()
                                }}
                            >
                                     <span className='calendar_popup_close_btn_icon1'>
                                           <CalendarCloseIcon/>
                                    </span>

                                <span className='calendar_popup_close_btn_icon2'>
                                        <CalendarCloseIconMobile/>
                                    </span>
                            </button>
                            <div className='pay_success_popup_icon_wrapper'>
                                    <span className='pay_success_popup_icon1'>
                                        <PayIcon/>
                                    </span>
                                <span className='pay_success_popup_icon2'>
                                        <PayTabletIcon/>
                                    </span>
                                <span className='pay_success_popup_icon3'>
                                        <PayMobileIcon/>
                                    </span>
                            </div>
                            <h1 className='pay_success_popup_title'>
                                Пополните ваш счёт
                            </h1>
                            <input
                                className='login_form_input_field_balance'
                                type="number"
                                name="balance"
                                value={balance}
                                onChange={(e) => setBalance(e.target.value)}
                            />
                            {balanceErrorText &&
                                <p className='error_text2'>{balanceErrorText}</p>
                            }
                            <div className="buy_certificate_popup_btn_parent">
                                <button
                                    className="buy_certificate_popup_btn"
                                    onClick={() => {
                                        addBalance()
                                    }}
                                    style={{
                                        marginTop: 25
                                    }
                                    }
                                >
                                    Пополнить
                                </button>
                            </div>
                        </div>
                    </div>
                }

            </section>
            <Footer activePage={"patient_profile"} />
        </div>
    );
};

export default withAuth(PatientProfile);
