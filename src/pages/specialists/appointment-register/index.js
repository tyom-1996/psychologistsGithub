import Image from "next/image";
import '../../../assets/css/specialist_single.css';
import { useEffect, useState } from "react";
import withOutAuth from '../../../components/withAuth';
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DropDownIcon from "@/assets/icons/dropdownIcon";
import CalendarCloseIcon from "@/assets/icons/calendarCloseIcon";
import CalendarCloseIconMobile from "@/assets/icons/calendarCloseIconMobile";
import DropDownMobileIcon from "@/assets/icons/dropdownMobileIcon";
import PayIcon from "@/assets/icons/payIcon";
import PayTabletIcon from "@/assets/icons/payTabletIcon";
import PayMobileIcon from "@/assets/icons/payMobileIcon";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AppointmentRegister = () => {
    const [psychologistsList, setPsychologistsList] = useState([
        {
            id: 1,
            img: '/images/psychologist_img4.png',
            name: 'Александра Абалак',
            position: 'Психологи',
        },
        {
            id: 2,
            img: '/images/psychologist_img5.png',
            name: 'Алла Абалак',
            position: 'Психологи',
        },
        {
            id: 3,
            img: '/images/psychologist_img6.png',
            name: 'Анна Абалак',
            position: 'Психологи',
        },
        {
            id: 4,
            img: '/images/psychologist_img7.png',
            name: 'Альберт Абалак',
            position: 'Психологи',
        },
        {
            id: 5,
            img: '/images/psychologist_img8.png',
            name: 'Алина Абалак',
            position: 'Психологи',
        },
        {
            id: 6,
            img: '/images/psychologist_img9.png',
            name: 'Альберт Абалак',
            position: 'Психологи',
        },
        {
            id: 7,
            img: '/images/psychologist_img10.png',
            name: 'Алиса Абалак',
            position: 'Психологи',
        },
        {
            id: 8,
            img: '/images/psychologist_img11.png',
            name: 'Александр  Абалак',
            position: 'Психологи',
        },
        {
            id: 9,
            img: '/images/psychologist_img12.png',
            name: 'Анатолий Абалак',
            position: 'Психологи',
        },
        {
            id: 10,
            img: '/images/psychologist_img13.png',
            name: 'Анатолий Абалак',
            position: 'Психологи',
        },
        {
            id: 11,
            img: '/images/psychologist_img14.png',
            name: 'Александра Абалак',
            position: 'Психологи',
        },
        {
            id: 12,
            img: '/images/psychologist_img15.png',
            name: 'Алла Абалак',
            position: 'Психологи',
        },
    ]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('+7'); // Initialize with "+7"
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([
        {
            id: 1,
            name: "Вариант 1",
        },

        {
            id: 2,
            name: "Вариант 2",
        },
        {
            id: 3,
            name: "Вариант 3",
        }
    ]);
    const [value, setValue] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState(null);
    const [showDateTime, setShowDateTime] = useState(null);
    const [showPaySuccessPopup, setShowPaySuccessPopup] = useState(false);
    const handleDateChange = (date) => {
        setValue(date); // Update the calendar's selected date
        setSelectedDate(date.toLocaleDateString()); // Format and set the selected date
        setShowCalendar(false); // Close the calendar after selection
        enableBodyScroll()
    };
    const handleTimeChange = (time) => {
        if (time === null) {
            setSelectedTime(null); // Сбрасываем состояние
        } else if (time instanceof Date && !isNaN(time)) {
            const hours = String(time.getHours()).padStart(2, '0');
            const minutes = String(time.getMinutes()).padStart(2, '0');
            const formattedTime = `${hours}:${minutes}`;
            setSelectedTime(formattedTime);
            setShowDateTime(false);
            enableBodyScroll()
        } else {
            console.error('Invalid time value:', time);
        }
    };


    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };
    const router = useRouter();

    useEffect(() => {

    }, []);

    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };


    return (
        <div className={'main_wrapper'} id={'appointmentRegister'}>
            <Header activePage={"appointment-register"} isLogged={true}/>
            <section className='appointment_register_section'>
                <div className='appointment_register_wrapper'>
                    <div className='appointment_register_title_line_wrapper'>
                        <h1 className='appointment_register_title'>Регистрация (Юрий Абалак)</h1>
                        <div className='appointment_register_line'>
                        </div>
                    </div>
                    <div className="appointment_register_form">
                        <div className='appointment_register_form_items_wrapper'>
                            <div className='appointment_register_form_item'>
                                <div className='appointment_register_form_input'>
                                    <input
                                        type='text'
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}
                                        placeholder='Имя Фамилия'
                                        className='appointment_register_form_input_field'
                                    />
                                </div>
                                <div className="appointment_register_form_input_wrapper">
                                    <input
                                        type="text"
                                        className="appointment_register_form_input_field1"
                                        value="+7"
                                        readOnly // Country code is non-editable
                                    />
                                    <input
                                        type="number"
                                        className="appointment_register_form_input_field2"
                                        value={phoneNumber.slice(2)} // Display only the phone number part
                                        onChange={(e) => setPhoneNumber('+7' + e.target.value)} // Prepend "+7" on input change
                                        placeholder="Номер Телефона"
                                    />
                                </div>
                                <div className="appointment_register_form_dropdown">
                                    <div
                                        className='appointment_register_form_dropdown_header'
                                        onClick={() => {
                                            setShowCalendar(true)
                                            disableBodyScroll()
                                        }}
                                    >
                                        <p className="appointment_register_form_dropdown_header_title">
                                            {selectedDate || "Выбрать дату"}
                                        </p>
                                        <div className='appointment_register_form_dropdown_header_icon'>
                                            <DropDownIcon/>
                                        </div>
                                        <div className='appointment_register_form_dropdown_header_icon_mobile'>
                                            <DropDownMobileIcon/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='appointment_register_form_item'>
                                <div className='appointment_register_form_input'>
                                    <input
                                        type='text'
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                        placeholder='Эл.почта'
                                        className='appointment_register_form_input_field'
                                    />
                                </div>
                                <div className="appointment_register_form_dropdown">
                                    <div
                                        className='appointment_register_form_dropdown_header'
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        <p className="appointment_register_form_dropdown_header_title">
                                            {selectedOption || "Выбрать вариант приёма"}
                                        </p>
                                        <div className='appointment_register_form_dropdown_header_icon'>
                                            <DropDownIcon/>
                                        </div>
                                        <div className='appointment_register_form_dropdown_header_icon_mobile'>
                                            <DropDownMobileIcon/>
                                        </div>
                                    </div>

                                    {isOpen && (
                                        <ul className="appointment_register_form_dropdown_menu">
                                            {options.map((option, index) => (
                                                <li
                                                    key={index}
                                                    className="appointment_register_form_dropdown_item"
                                                    onClick={() => handleOptionClick(option?.name)}
                                                >
                                                    {option?.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="appointment_register_form_dropdown">
                                    <div
                                        className='appointment_register_form_dropdown_header'
                                        onClick={() => {
                                            setShowDateTime(true)
                                            disableBodyScroll()
                                        }}
                                    >
                                        <p className="appointment_register_form_dropdown_header_title">
                                            {selectedTime || "Выбрать время"}
                                        </p>
                                        <div className='appointment_register_form_dropdown_header_icon'>
                                            <DropDownIcon/>
                                        </div>
                                        <div className='appointment_register_form_dropdown_header_icon_mobile'>
                                            <DropDownMobileIcon/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className='appointment_register_form_items_wrapper_mobile'>
                            <div className='appointment_register_form_input'>
                                <input
                                    type='text'
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                    placeholder='Имя Фамилия'
                                    className='appointment_register_form_input_field'
                                />
                            </div>
                            <div className='appointment_register_form_input'>
                                <input
                                    type='text'
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                    placeholder='Эл.почта'
                                    className='appointment_register_form_input_field'
                                />
                            </div>
                            <div className="appointment_register_form_input_wrapper">
                                <input
                                    type="text"
                                    className="appointment_register_form_input_field1"
                                    value="+7"
                                    readOnly // Country code is non-editable
                                />
                                <input
                                    type="number"
                                    className="appointment_register_form_input_field2"
                                    value={phoneNumber.slice(2)} // Display only the phone number part
                                    onChange={(e) => setPhoneNumber('+7' + e.target.value)} // Prepend "+7" on input change
                                    placeholder="Номер Телефона"
                                />
                            </div>
                            <div className="appointment_register_form_dropdown">
                                <div
                                    className='appointment_register_form_dropdown_header'
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <p className="appointment_register_form_dropdown_header_title">
                                        {selectedOption || "Выбрать вариант приёма"}
                                    </p>
                                    <div className='appointment_register_form_dropdown_header_icon'>
                                        <DropDownIcon/>
                                    </div>
                                    <div className='appointment_register_form_dropdown_header_icon_mobile'>
                                        <DropDownMobileIcon/>
                                    </div>
                                </div>

                                {isOpen && (
                                    <ul className="appointment_register_form_dropdown_menu">
                                        {options.map((option, index) => (
                                            <li
                                                key={index}
                                                className="appointment_register_form_dropdown_item"
                                                onClick={() => handleOptionClick(option?.name)}
                                            >
                                                {option?.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            <div className="appointment_register_form_dropdown">
                                <div
                                    className='appointment_register_form_dropdown_header'
                                    onClick={() => {
                                        setShowCalendar(true)
                                        disableBodyScroll()
                                    }}
                                >
                                    <p className="appointment_register_form_dropdown_header_title">
                                        {selectedDate || "Выбрать дату"}
                                    </p>
                                    <div className='appointment_register_form_dropdown_header_icon'>
                                        <DropDownIcon/>
                                    </div>
                                    <div className='appointment_register_form_dropdown_header_icon_mobile'>
                                        <DropDownMobileIcon/>
                                    </div>
                                </div>

                            </div>
                            <div className="appointment_register_form_dropdown">
                                <div
                                    className='appointment_register_form_dropdown_header'
                                    onClick={() => {
                                        setShowDateTime(true)
                                        disableBodyScroll()
                                    }}
                                >
                                    <p className="appointment_register_form_dropdown_header_title">
                                        {selectedTime || "Выбрать время"}
                                    </p>
                                    <div className='appointment_register_form_dropdown_header_icon'>
                                        <DropDownIcon/>
                                    </div>
                                    <div className='appointment_register_form_dropdown_header_icon_mobile'>
                                        <DropDownMobileIcon/>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='appointment_register_form_input'>
                             <textarea
                                 name="" id="" cols="10" rows="6" placeholder='Письмо'
                                 className='appointment_register_form_input_field'
                             ></textarea>
                        </div>
                        <div className='appointment_register_form_pay_btn_price_info_wrapper'>
                            <button
                                className='appointment_register_form_pay_btn'
                                onClick={() => {
                                    setShowPaySuccessPopup(true)
                                    disableBodyScroll()
                                }}
                            >
                                Оплатить
                            </button>
                            <div className="appointment_register_form_price_info_wrapper">
                                <p className='appointment_register_form_price_info'>3000 <span>Руб.</span></p>
                                <p className='appointment_register_form_price_info_title'>Цена</p>
                            </div>
                        </div>
                    </div>
                    {showCalendar  &&
                        <div className='calendar_popup'>
                            <div className='calendar_popup_wrapper'>
                                <div className="calendar_popup_title_icon_wrapper">
                                    <h2 className='calendar_popup_title'>
                                        Календарь
                                    </h2>
                                    <button
                                        className="calendar_popup_close_btn"
                                        onClick={() => {
                                            setShowCalendar(false)
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
                                </div>
                                <Calendar
                                    onChange={handleDateChange}
                                    value={value}
                                />
                            </div>
                        </div>
                    }

                    {showDateTime &&
                        <div className="calendar_popup">
                            <div className='calendar_popup_wrapper'>
                                <div className="calendar_popup_title_icon_wrapper">
                                    <h2 className='calendar_popup_title'>
                                        Выбрать время
                                    </h2>
                                    <button
                                        className="calendar_popup_close_btn"
                                        onClick={() => {
                                            setShowDateTime(false)
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
                                </div>
                                <DatePicker
                                    selected={selectedTime ? new Date(`1970-01-01T${selectedTime}:00`) : null}
                                    onChange={(time) => {
                                        handleTimeChange(time)
                                    }}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Время"
                                    dateFormat="HH:mm"
                                    placeholderText="Выберите время"
                                    isClearable={true}
                                />
                            </div>
                        </div>
                    }
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
                                <button className='pay_success_popup_btn'>
                                    Главная Страница
                                </button>
                            </div>
                        </div>
                    }


                </div>
            </section>

            <Footer activePage={"appointment-register"}/>

        </div>
    );
};

export default AppointmentRegister;
