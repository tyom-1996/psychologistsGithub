import Image from "next/image";
import '../../../assets/css/patient-profile.css';
import { useEffect, useState } from "react";
import withOutAuth from '../../../components/withAuth';
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


const PatientProfile = () => {

    const [showBuyCertificatePopup, setShowBuyCertificatePopup] = useState(false);
    const [plannedList, setPlannedList] = useState([
        {
            id: 1,
            img: '/images/planned_specialist_img1.png',
            name: 'Александра Абалак',
            position: 'Психологи',
            price: '23000',
            date: '03/04/2024',
            hour: '13:00-14:00',
        },
        {
            id: 2,
            img: '/images/planned_specialist_img2.png',
            name: 'Алла Абалак',
            position: 'Психологи',
            price: '23000',
            date: '03/04/2024',
            hour: '13:00-14:00',
        },
        {
            id: 3,
            img: '/images/planned_specialist_img3.png',
            name: 'Анна Абалак',
            position: 'Психологи',
            price: '23000',
            date: '03/04/2024',
            hour: '13:00-14:00',
        },
        {
            id: 4,
            img: '/images/planned_specialist_img4.png',
            name: 'Альберт Абалак',
            position: 'Психологи',
            price: '23000',
            date: '03/04/2024',
            hour: '13:00-14:00',
        },
        {
            id: 5,
            img: '/images/planned_specialist_img5.png',
            name: 'Алина Абалак',
            position: 'Психологи',
            price: '23000',
            date: '03/04/2024',
            hour: '13:00-14:00',
        },
    ]);
    const [completedList, setCompletedList] = useState([
        {
            id: 1,
            img: '/images/completed_specialist_img1.png',
            name: 'Александра Абалак',
            position: 'Психологи',
            price: '23000',
            date: '03/04/2024',
            hour: '13:00-14:00',
        },
        {
            id: 2,
            img: '/images/completed_specialist_img2.png',
            name: 'Алла Абалак',
            position: 'Психологи',
            price: '23000',
            date: '03/04/2024',
            hour: '13:00-14:00',
        },
        {
            id: 3,
            img: '/images/completed_specialist_img3.png',
            name: 'Анна Абалак',
            position: 'Психологи',
            price: '23000',
            date: '03/04/2024',
            hour: '13:00-14:00',
        },
        {
            id: 4,
            img: '/images/completed_specialist_img4.png',
            name: 'Альберт Абалак',
            position: 'Психологи',
            price: '23000',
            date: '03/04/2024',
            hour: '13:00-14:00',
        },
        {
            id: 5,
            img: '/images/completed_specialist_img5.png',
            name: 'Алина Абалак',
            position: 'Психологи',
            price: '23000',
            date: '03/04/2024',
            hour: '13:00-14:00',
        },
    ]);
    const [activeTab, setActiveTab] = useState("about");
    const [certificatesList, setCertificatesList] = useState([
        {
            id: 1,
            name: '1 сертификат',
            price: '1000',
        },
        {
            id: 2,
            name: '2 сертификат',
            price: '5000',
        },
        {
            id: 3,
            name: '3 сертификат',
            price: '10000',
        },



    ]);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    const redirectToEditProfile = () => {
        router.push(`/patient/edit-profile`);
    }
    const router = useRouter();

    useEffect(() => {

    }, []);

    const handleOption1Change = (value) => {
        setSelectedOption(value);
    };
    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };

    return (
        <div className={'main_wrapper'} id={'patient-profile'}>
            <Header activePage={"patient_profile"} isLogged={true}/>
            <section className="patient_profile_section">
                <div className="patient_profile_wrapper">
                    <div className="patient_profile_item1">
                        <div className="patient_profile_item1_img_info_wrapper">
                            <div className="patient_profile_item1_img">
                                <Image
                                    src="/images/patient_profile_img1.png"
                                    alt="Company Logo"
                                    layout="fill"
                                    objectFit="cover"
                                    quality={100}
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
                                <h1 className='patient_profile_item1_title'>Юрий Абалак</h1>
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
                                        +7 00 000 0000
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
                                       Абалак@gmail.com
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
                                        23000 <span>Руб.</span>
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
                                className={`patient_profile_tab ${activeTab === "planned" ? "patient_profile_tab_active" : ""}`}
                                onClick={() => handleTabClick("planned")}
                            >
                                Запланированные
                            </button>
                            <button
                                className={`patient_profile_tab ${activeTab === "completed" ? "patient_profile_tab_active" : ""}`}
                                onClick={() => handleTabClick("completed")}
                            >
                                Завершенные
                            </button>
                        </div>
                        {activeTab === "about" && (
                            <div className='patient_profile_about_item'>
                                <p className='patient_profile_about_item_info'>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                                    make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                                </p>
                                <p className='patient_profile_about_item_info'>
                                    remaining essentially unchanged. It was popularised inLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                                    make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                                </p>
                                <p className='patient_profile_about_item_info'>
                                    remaining essentially unchanged. It was popularised in
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                                    make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                                </p>
                                <p className='patient_profile_about_item_info'>
                                    remaining essentially unchanged. It was popularised inLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                                    make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                                </p>
                                <p className='patient_profile_about_item_info'>
                                    remaining essentially unchanged. It was popularised inLorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                                    make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                                </p>
                                <p className='patient_profile_about_item_info'>
                                    remaining essentially unchanged. It was popularised inLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                                    make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                                </p>

                                <p className='patient_profile_about_item_info'>
                                    remaining essentially unchanged. It was popularised in
                                    remaining essentially unchanged. It was popularised inLorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                                    make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                                </p>

                                <p className='patient_profile_about_item_info'>
                                    remaining essentially unchanged. It was popularised inLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                                    make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting
                                </p>


                                <p className='patient_profile_about_item_info'>
                                    remaining essentially unchanged. It was popularised inLorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                                    make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                                </p>

                                <p className='patient_profile_about_item_info'>
                                    remaining essentially unchanged. It was popularised inLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                                    make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting
                                </p>

                                <p className='patient_profile_about_item_info'>
                                    remaining essentially unchanged. It was popularised inLorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                                    make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,
                                </p>


                                <p className='patient_profile_about_item_info'>
                                    remaining essentially unchanged. It was popularised inLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                                    make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting
                                </p>
                                <p className='patient_profile_about_item_info'>
                                    remaining essentially unchanged. It was popularised inLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
                                    make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting

                                </p>

                            </div>
                        )}

                        {activeTab === "planned" && (
                            <div className="patient_profile_planned_item">
                                {plannedList.map((item ,index) => {
                                    return (
                                        <div key={index} className="patient_profile_planned_item_child patient_profile_planned_item_child1">
                                            <div className="patient_profile_planned_item_child_img">
                                                <Image
                                                    src={item.img}
                                                    alt="Company Logo"
                                                    layout="fill"
                                                    objectFit="cover"
                                                    quality={100}
                                                />

                                            </div>
                                            <div className="patient_profile_planned_item_child_info_wrapper">
                                                <p className='patient_profile_planned_item_child_name'>
                                                    {item.name}
                                                </p>
                                                <p className="patient_profile_planned_item_child_position">
                                                    {item.position}
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
                                                            {item.date}
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
                                                            {item.hour}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className='patient_profile_planned_item_child_price'>
                                                    {item.price}
                                                    <span>Руб.</span>
                                                </p>
                                            </div>

                                        </div>
                                    )
                                })}
                            </div>
                        )}

                        {activeTab === "completed" && (
                            <div className="patient_profile_planned_item">
                                {completedList.map((item ,index) => {
                                    return (
                                        <div key={index} className="patient_profile_planned_item_child patient_profile_planned_item_child2">
                                            <div className="patient_profile_planned_item_child_img">
                                                <Image
                                                    src={item.img}
                                                    alt="Company Logo"
                                                    layout="fill"
                                                    objectFit="cover"
                                                    quality={100}
                                                />

                                            </div>
                                            <div className="patient_profile_planned_item_child_info_wrapper">
                                                <p className='patient_profile_planned_item_child_name'>
                                                    {item.name}
                                                </p>
                                                <p className="patient_profile_planned_item_child_position">
                                                    {item.position}
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
                                                            {item.date}
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
                                                            {item.hour}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className='patient_profile_planned_item_child_price'>
                                                    {item.price}
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
                                {certificatesList.map((item, index) => {
                                    return (
                                        <label key={index} className='buy_certificate_popup_item'>
                                            <span className='buy_certificate_popup_item_title'>{item.name}</span>
                                            <div className='buy_certificate_popup_item_price_info_wrapper'>
                                                <p className='buy_certificate_popup_item_price_info1'>{item.price} <span>Руб</span> .</p>
                                                <span className='buy_certificate_popup_item_price_info2'>Цена сертификат</span>
                                            </div>
                                            <input
                                                type="radio"
                                                name="option1"
                                                value={item.name}
                                                checked={selectedOption === item.name}
                                                onChange={() => handleOption1Change(item.name)}
                                            />
                                            <span className="buy_certificate_popup_item_custom_radio"></span>


                                        </label>
                                    )
                                })}

                            </div>
                            <div className='buy_certificate_popup_btn_parent'>
                                <button className="buy_certificate_popup_btn">
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

export default PatientProfile;
