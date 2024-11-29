import Image from "next/image";
import '../../../assets/css/patient-profile.css';
import { useEffect, useState } from "react";
import withOutAuth from '../../../components/withAuth';
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


const PsychologistsProfile = () => {

    const [plannedList, setPlannedList] = useState([
        {
            id: 1,
            img: '/images/patient_img1.png',
            name: 'Александра Абалак',
            price: '23000',
            date: '03/04/2024',
            hour: '13:00-14:00',
        },
        {
            id: 2,
            img: '/images/patient_img2.png',
            name: 'Алла Абалак',
            price: '23000',
            date: '03/04/2024',
            hour: '13:00-14:00',
        },
        {
            id: 3,
            img: '/images/patient_img3.png',
            name: 'Анна Абалак',
            price: '23000',
            date: '03/04/2024',
            hour: '13:00-14:00',
        },
        {
            id: 4,
            img: '/images/patient_img4.png',
            name: 'Альберт Абалак',
            price: '23000',
            date: '03/04/2024',
            hour: '13:00-14:00',
        },
        {
            id: 5,
            img: '/images/patient_img5.png',
            name: 'Алина Абалак',
            price: '23000',
            date: '03/04/2024',
            hour: '13:00-14:00',
        },
    ]);
    const [completedList, setCompletedList] = useState([
        {
            id: 1,
            img: '/images/patient_img6.png',
            name: 'Александра Абалак',
            price: '23000',
            date: '03/04/2024',
            hour: '13:00-14:00',
        },
        {
            id: 2,
            img: '/images/patient_img7.png',
            name: 'Алла Абалак',
            price: '23000',
            date: '03/04/2024',
            hour: '13:00-14:00',
        },
        {
            id: 3,
            img: '/images/patient_img8.png',
            name: 'Анна Абалак',
            price: '23000',
            date: '03/04/2024',
            hour: '13:00-14:00',
        },
        {
            id: 4,
            img: '/images/patient_img9.png',
            name: 'Альберт Абалак',
            price: '23000',
            date: '03/04/2024',
            hour: '13:00-14:00',
        },
        {
            id: 5,
            img: '/images/patient_img10.png',
            name: 'Алина Абалак',
            price: '23000',
            date: '03/04/2024',
            hour: '13:00-14:00',
        },
    ]);
    const [activeTab, setActiveTab] = useState("about");
    const router = useRouter();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {

    }, []);

    const redirectToEditProfile = () => {
        router.push(`/psychologists/edit-profile`);
    }

    return (
        <div className={'main_wrapper'} id={'psychologists-profile'}>
            <Header activePage={"psychologists_profile"} isLogged={true}/>
            <section className="patient_profile_section">
                <div className="patient_profile_wrapper">
                    <div className="patient_profile_item1">
                        <div className="patient_profile_item1_img_info_wrapper">
                            <div className="patient_profile_item1_img">
                                <Image
                                    src="/images/doctor_profile_img.png"
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
                                <p className='patient_profile_item1_title2'>Психолог</p>
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
                                    Александр Леонидович Мясников (род. 15 сентября 1953, Ленинград) — советский и российский врач-кардиолог, врач общей практики, теле-, радиоведущий и общественный деятель, автор книг о здоровье.  Родился в семье потомственных врачей, медицинская династия Мясниковых берёт начало в XIX веке. 34 В 1976 году окончил 2-й Московский медицинский институт имени Н. И. Пирогова, после чего до 1981 года проходил ординатуру и аспирантуру в Институте клинической кардиологии. В 1981 году в Институте кардиологии им. А. Л. Мясникова защитил диссертацию на соискание учёной степени кандидата медицинских наук.
                                </p>
                                <p className='patient_profile_about_item_info'>
                                    Работал врачом группы геологов в Африке, в Народной Республике Мозамбик. В 1983 году трудился в провинции Замбези врачом общей практики. С 1984 по 1989 год служил старшим группы советских врачей-консультантов правительственного госпиталя «Пренда» в Анголе.  Вернувшись в Москву, совмещал работу врача-кардиолога во Всесоюзном кардиологическом научном центре
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

            </section>

            <Footer activePage={"psychologists_profile"}/>

        </div>
    );
};

export default PsychologistsProfile;
