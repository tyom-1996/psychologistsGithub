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
import {useAppointmentBook} from "@/hooks/useAppointmentBook";
import {useGetProfileInfo} from "@/hooks/useGetProfileInfo";

const AppointmentRegister = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [message, setMessage] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('+7'); // Initialize with "+7"
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [value, setValue] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState(null);
    const [showDateTime, setShowDateTime] = useState(null);
    const [appointmentError, setAppointmentError] = useState('');
    const [showPaySuccessPopup, setShowPaySuccessPopup] = useState(false);
    const {makeAppointmentBook, makeAppointmentBookData, errorMakeAppointmentBookData, nameError, surnameError, emailError, phoneError, messageError, selectedTimeError, selectedDateError, balanceError} = useAppointmentBook();
    const {getProfileInfo, loadingUserInfo, profileInfoData } = useGetProfileInfo();


    useEffect(() => {
        if (makeAppointmentBookData) {
            if (makeAppointmentBookData?.message == "Appointment booked successfully") {
                 setShowPaySuccessPopup(true)
                 setName('');
                 setSurname('');
                 setEmail('');
                 setPromoCode('');
                 setMessage('');
                 setPhoneNumber('');
                 setSelectedDate('');
                 setSelectedTime('');
                 disableBodyScroll()
            }
        }
    }, [makeAppointmentBookData])
    useEffect(() => {
        if (errorMakeAppointmentBookData) {
            console.log(errorMakeAppointmentBookData, 'eememmeme')
            if (errorMakeAppointmentBookData == 'No sessions remaining on this promo code') {
                setAppointmentError('По этому промокоду не осталось сеансов')
            }
            if (errorMakeAppointmentBookData == 'Invalid promo code') {
                setAppointmentError('Недействительный промокод')
            }
        }
    }, [errorMakeAppointmentBookData])

    const handleDateChange = (date) => {
        setValue(date); // Update the calendar's selected date
        // Format the date as YYYY-MM-DD
        setSelectedDate(date.toISOString().split('T')[0]);
        setShowCalendar(false); // Close the calendar after selection
        enableBodyScroll();
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

    const {id} = router.query; // Get the ID from the query


    useEffect(() => {
        if (id) {
            console.log(id, 'id________')
        }
    }, [id]);




    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };

    const bookAppointment = async () => {
        let userId = localStorage.getItem('userId')
        await makeAppointmentBook(id, userId, name, surname, email, phoneNumber, message, selectedTime, selectedDate, promoCode )
    }

    return (
        <div className={'main_wrapper'} id={'appointmentRegister'}>
            <Header activePage={"appointment-register"} />
            <section className='appointment_register_section'>
                <div className='appointment_register_wrapper'>
                    {appointmentError &&
                        <p className='error_text3'>{appointmentError}</p>
                    }
                    <div className='appointment_register_title_line_wrapper'>
                        <h1 className='appointment_register_title'>
                            Запись на приём
                        </h1>
                        <div className='appointment_register_line'>
                        </div>
                    </div>
                    <div className="appointment_register_form">
                        {balanceError &&
                            <p className='error_text_big'>
                                {balanceError}
                            </p>
                        }
                        <div className='appointment_register_form_items_wrapper'>
                            <div className='appointment_register_form_item'>
                                <div className='appointment_register_form_input'>
                                    <input
                                        type='text'
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}
                                        placeholder='Имя'
                                        className='appointment_register_form_input_field'
                                    />
                                    {nameError &&
                                        <p className='error_text2'>
                                            {nameError}
                                        </p>
                                    }
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
                                    {emailError &&
                                        <p className='error_text2'>
                                            {emailError}
                                        </p>
                                    }
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
                                {phoneError &&
                                    <p className='error_text2' style={{marginBottom: 10}}>
                                        {phoneError}
                                    </p>
                                }

                            </div>
                            <div className='appointment_register_form_item'>

                                <div className='appointment_register_form_input'>
                                    <input
                                        type='text'
                                        value={surname}
                                        onChange={(e) => {
                                            setSurname(e.target.value)
                                        }}
                                        placeholder='Фамилия'
                                        className='appointment_register_form_input_field'
                                    />
                                    {surnameError &&
                                        <p className='error_text2'>
                                            {surnameError}
                                        </p>
                                    }
                                </div>


                                <div className='appointment_register_form_input'>
                                    <input
                                        type='text'
                                        value={promoCode}
                                        onChange={(e) => {
                                            setPromoCode(e.target.value)
                                        }}
                                        placeholder='Промо-код'
                                        className='appointment_register_form_input_field'
                                    />

                                </div>

                                {/*<div className="appointment_register_form_dropdown">*/}
                                {/*    <div*/}
                                {/*        className='appointment_register_form_dropdown_header'*/}
                                {/*        onClick={() => setIsOpen(!isOpen)}*/}
                                {/*    >*/}
                                {/*        <p className="appointment_register_form_dropdown_header_title">*/}
                                {/*            {selectedOption || "Выбрать вариант приёма"}*/}
                                {/*        </p>*/}
                                {/*        <div className='appointment_register_form_dropdown_header_icon'>*/}
                                {/*            <DropDownIcon/>*/}
                                {/*        </div>*/}
                                {/*        <div className='appointment_register_form_dropdown_header_icon_mobile'>*/}
                                {/*            <DropDownMobileIcon/>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}

                                {/*    {isOpen && (*/}
                                {/*        <ul className="appointment_register_form_dropdown_menu">*/}
                                {/*            {options.map((option, index) => (*/}
                                {/*                <li*/}
                                {/*                    key={index}*/}
                                {/*                    className="appointment_register_form_dropdown_item"*/}
                                {/*                    onClick={() => handleOptionClick(option?.name)}*/}
                                {/*                >*/}
                                {/*                    {option?.name}*/}
                                {/*                </li>*/}
                                {/*            ))}*/}
                                {/*        </ul>*/}
                                {/*    )}*/}
                                {/*</div>*/}
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

                                    {selectedDateError &&
                                        <p className='error_text2'>{selectedDateError}</p>
                                    }

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
                                    placeholder='Имя'
                                    className='appointment_register_form_input_field'
                                />
                                {nameError &&
                                    <p className='error_text2'>
                                        {nameError}
                                    </p>
                                }
                            </div>


                            <div className='appointment_register_form_input'>
                                <input
                                    type='text'
                                    value={surname}
                                    onChange={(e) => {
                                        setSurname(e.target.value)
                                    }}
                                    placeholder='Фамилия'
                                    className='appointment_register_form_input_field'
                                />
                                {surnameError &&
                                    <p className='error_text2'>
                                        {surnameError}
                                    </p>
                                }
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
                                {emailError &&
                                    <p className="error_text2">{emailError}</p>
                                }
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
                            {phoneError &&
                                <p className='error_text2' style={{marginBottom: 10}}>{phoneError}</p>
                            }

                            <div className='appointment_register_form_input'>
                                <input
                                    type='text'
                                    value={promoCode}
                                    onChange={(e) => {
                                        setPromoCode(e.target.value)
                                    }}
                                    placeholder='Промо-код'
                                    className='appointment_register_form_input_field'
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
                                {selectedDateError &&
                                    <p className='error_text2'>{selectedDateError}</p>
                                }

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
                                {selectedTimeError &&
                                    <p className='error_text2'>{selectedTimeError}</p>
                                }

                            </div>

                        </div>
                        <div className="appointment_register_form_dropdown"
                             id='appointment_register_form_dropdown_desktop'>
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
                            {selectedTimeError &&
                                <p className='error_text2'>
                                    {selectedTimeError}
                                </p>
                            }

                        </div>
                        <div className='appointment_register_form_input'>
                             <textarea
                                 name="" id="" cols="10" rows="6" placeholder='Письмо'
                                 className='appointment_register_form_input_field'
                                 value={message}
                                 onChange={(e) => {
                                     setMessage(e.target.value)
                                 }}
                             ></textarea>
                            {messageError &&
                                <p className='error_text2'>{messageError}</p>
                            }
                        </div>
                        <div className='appointment_register_form_pay_btn_price_info_wrapper'>
                            <button
                                className='appointment_register_form_pay_btn'
                                onClick={() => {
                                    // setShowPaySuccessPopup(true)
                                    // disableBodyScroll()
                                    bookAppointment()
                                }}
                            >
                                Записаться на приём
                            </button>
                            <div className="appointment_register_form_price_info_wrapper">
                                <p className='appointment_register_form_price_info'>{profileInfoData?.balance} <span>Руб.</span></p>
                                <p className='appointment_register_form_price_info_title'>Цена</p>
                            </div>
                        </div>
                    </div>
                    {showCalendar &&
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
                                    onChange={(time) => handleTimeChange(time)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Время"
                                    dateFormat="HH:mm"
                                    timeFormat="HH:mm" // added prop for 24-hour format
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
                                <a href='/' className='pay_success_popup_btn'>
                                    Главная Страница
                                </a>
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
