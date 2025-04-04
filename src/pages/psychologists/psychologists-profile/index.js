import Image from "next/image";
import '../../../assets/css/patient-profile.css';
import { useEffect, useState } from "react";
import withAuth from '../../../components/withAuth';
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfilePhoneIcon from "@/assets/icons/profilePhoneIcon";
import ProfilePhoneTabletIcon from "@/assets/icons/profilePhoneIconTablet";
import ProfileEmailIcon from "@/assets/icons/profileEmailIcon";
import ProfileEmailIconTablet from "@/assets/icons/profileEmailIconTablet";
import ProfileEditIcon from "@/assets/icons/profileEditIcon";
import ProfileEditIconTablet from "@/assets/icons/profileEditIconTablet";
import ProfileCalendarIcon from "@/assets/icons/profileCalendarIcon";
import ProfileClockIcon from "@/assets/icons/profileClockIcon";
import ModalCloseIcon from "@/assets/icons/modalCloseIcon";
import Link from "next/link";
import ProfileEditIconMobile from "@/assets/icons/profileEditIconMobile";
import ProfileEmailIconMobile from "@/assets/icons/profileEmailIconMobile";
import ProfilePhoneMobileIcon from "@/assets/icons/profilePhoneIconMobile";
import ProfileCalendarTabletIcon from "@/assets/icons/profileCalendarIconTablet";
import ProfileClockTabletIcon from "@/assets/icons/profileClockIconTablet";
import ProfileCalendarMobileIcon from "@/assets/icons/profileCalendarIconMobile";
import ProfileClockMobileIcon from "@/assets/icons/profileClockIconMobile";
import { useGetProfileInfo } from "@/hooks/useGetProfileInfo";
import { useGetAppointmentsSessions } from "@/hooks/useGetAppointmentsSessions";

const PsychologistsProfile = () => {
    const [activeTab, setActiveTab] = useState("about");
    const [imagePath, setImagePath] = useState('https://api.menspsychology.ru/uploads');
    const { getProfileInfo, loadingUserInfo, profileInfoData } = useGetProfileInfo();
    const { getAppointmentsSessions, appointmentsSessionsData } = useGetAppointmentsSessions();
    const router = useRouter();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const role = localStorage.getItem('role');
        let role2 = '';
        if (role === 'psycholog') {
            role2 = 'psychologist';
        } else if (role === 'user') {
            role2 = "user";
        }
        // For the upcoming and past tabs, fetch appointment sessions
        if (activeTab === "upcoming" || activeTab === "past") {
            getAppointmentsSessions(role2, activeTab);
        }
    }, [activeTab]);

    // Helper function to parse "dd.mm.yyyy" into a Date object with time set to 0
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

    const redirectTPsychologistsSinglePage = (id) => {
        router.push(`/specialists/${id}`);
    };

    const redirectToEditProfile = () => {
        router.push(`/psychologists/edit-profile`);
    };

    return (
        <div className={'main_wrapper'} id={'psychologists-profile'}>
            <Header activePage={"psychologists_profile"} />
            <section className="patient_profile_section">
                <div className="patient_profile_wrapper">
                    <div className="patient_profile_item1">
                        <div className="patient_profile_item1_img_info_wrapper">
                            <div className="patient_profile_item1_img">
                                <img
                                    src={profileInfoData?.image ? `${imagePath}/${profileInfoData?.image}` : '/images/patient_profile_img1.png'}
                                    alt="Profile"
                                />
                            </div>
                            <div className='patient_profile_item1_info_wrapper'>
                                <button
                                    className='mobile_patient_profile_item1_edit_btn'
                                    onClick={redirectToEditProfile}
                                >
                                    <span className='edit_icon1'><ProfileEditIcon/></span>
                                    <span className='edit_icon2'><ProfileEditIconTablet/></span>
                                    <span className='edit_icon3'><ProfileEditIconMobile/></span>
                                </button>
                                <h1 className='patient_profile_item1_title'>
                                    {profileInfoData?.first_name} {profileInfoData?.last_name}
                                </h1>
                                <p className='patient_profile_item1_title2'>Психолог</p>
                                <a href={`tel:${profileInfoData?.phone}`} className='patient_profile_item1_phone_link'>
                                    <span className='patient_profile_item1_phone_link_icon'><ProfilePhoneIcon/></span>
                                    <span className='patient_profile_item1_phone_link_icon2'><ProfilePhoneTabletIcon/></span>
                                    <span className='patient_profile_item1_phone_link_icon3'><ProfilePhoneMobileIcon/></span>
                                    <span className='patient_profile_item1_phone_link_info'>
                    {profileInfoData?.phone}
                  </span>
                                </a>
                                <a href={`mailto:${profileInfoData?.email}`} className='patient_profile_item1_phone_link'>
                                    <span className='patient_profile_item1_phone_link_icon'><ProfileEmailIcon/></span>
                                    <span className='patient_profile_item1_phone_link_icon2'><ProfileEmailIconTablet/></span>
                                    <span className='patient_profile_item1_phone_link_icon3'><ProfileEmailIconMobile/></span>
                                    <span className='patient_profile_item1_phone_link_info'>
                    {profileInfoData?.email}
                  </span>
                                </a>
                            </div>
                        </div>
                        <div className="patient_profile_item1_price_info_edit_btn_wrapper">
                            <button
                                className='patient_profile_item1_edit_btn'
                                onClick={redirectToEditProfile}
                            >
                                <span className='edit_icon1'><ProfileEditIcon/></span>
                                <span className='edit_icon2'><ProfileEditIconTablet/></span>
                                <span className='edit_icon3'><ProfileEditIconMobile/></span>
                            </button>
                            {/*<div className='patient_profile_item1_account_price_info_wrapper'>*/}
                            {/*    <p className='patient_profile_item1_account_price_info1'>*/}
                            {/*        {profileInfoData?.balance} <span>Руб.</span>*/}
                            {/*    </p>*/}
                            {/*    <p className='patient_profile_item1_account_price_info2'>Ваш счёт</p>*/}
                            {/*</div>*/}
                            {/*<button className='add_to_account_btn'>*/}
                            {/*    Пополнить счёт*/}
                            {/*</button>*/}
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
                                {upcomingAppointments.map((item, index) => (
                                    <div
                                        key={index}
                                        className="patient_profile_planned_item_child patient_profile_planned_item_child1"
                                    >
                                        <div className="patient_profile_planned_item_child_img">
                                            <img
                                                src={item?.user_image ? `${imagePath}/${item?.user_image}` : '/images/psychologist_img13.png'}
                                                alt="Psychologist"
                                            />
                                        </div>
                                        <div className="patient_profile_planned_item_child_info_wrapper">
                                            <p className='patient_profile_planned_item_child_name'>
                                                {item?.first_name} {item?.last_name}
                                            </p>
                                            <div className='patient_profile_planned_item_child_date_hour_info_item_wrapper'>
                                                <div className='patient_profile_planned_item_child_date_hour_info_item'>
                                                    <div className="patient_profile_planned_item_child_date_hour_info_item_icon">
                                                        <ProfileCalendarIcon/>
                                                    </div>
                                                    <div className="patient_profile_planned_item_child_date_hour_info_item_icon2">
                                                        <ProfileCalendarTabletIcon/>
                                                    </div>
                                                    <div className="patient_profile_planned_item_child_date_hour_info_item_icon3">
                                                        <ProfileCalendarMobileIcon/>
                                                    </div>
                                                    <p className="patient_profile_planned_item_child_date_hour_info_item_title">
                                                        {item?.appointment_date}
                                                    </p>
                                                </div>
                                                <div className='patient_profile_planned_item_child_date_hour_info_item'>
                                                    <div className="patient_profile_planned_item_child_date_hour_info_item_icon">
                                                        <ProfileClockIcon/>
                                                    </div>
                                                    <div className="patient_profile_planned_item_child_date_hour_info_item_icon2">
                                                        <ProfileClockTabletIcon/>
                                                    </div>
                                                    <div className="patient_profile_planned_item_child_date_hour_info_item_icon3">
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
                                ))}
                            </div>
                        )}
                        {activeTab === "past" && (
                            <div className="patient_profile_planned_item">
                                {pastAppointments.map((item, index) => (
                                    <div
                                        key={index}
                                        className="patient_profile_planned_item_child patient_profile_planned_item_child2"

                                    >
                                        <div className="patient_profile_planned_item_child_img">
                                            <img
                                                src={item?.user_image ? `${imagePath}/${item?.user_image}` : '/images/psychologist_img13.png'}
                                                alt="Psychologist"
                                            />
                                        </div>
                                        <div className="patient_profile_planned_item_child_info_wrapper">
                                            <p className='patient_profile_planned_item_child_name'>
                                                {item?.first_name} {item?.last_name}
                                            </p>
                                            <div className='patient_profile_planned_item_child_date_hour_info_item_wrapper'>
                                                <div className='patient_profile_planned_item_child_date_hour_info_item'>
                                                    <div className="patient_profile_planned_item_child_date_hour_info_item_icon">
                                                        <ProfileCalendarIcon/>
                                                    </div>
                                                    <div className="patient_profile_planned_item_child_date_hour_info_item_icon2">
                                                        <ProfileCalendarTabletIcon/>
                                                    </div>
                                                    <div className="patient_profile_planned_item_child_date_hour_info_item_icon3">
                                                        <ProfileCalendarMobileIcon/>
                                                    </div>
                                                    <p className="patient_profile_planned_item_child_date_hour_info_item_title">
                                                        {item?.appointment_date}
                                                    </p>
                                                </div>
                                                <div className='patient_profile_planned_item_child_date_hour_info_item'>
                                                    <div className="patient_profile_planned_item_child_date_hour_info_item_icon">
                                                        <ProfileClockIcon/>
                                                    </div>
                                                    <div className="patient_profile_planned_item_child_date_hour_info_item_icon2">
                                                        <ProfileClockTabletIcon/>
                                                    </div>
                                                    <div className="patient_profile_planned_item_child_date_hour_info_item_icon3">
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
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <Footer activePage={"psychologists_profile"} />
        </div>
    );
};

export default PsychologistsProfile;
