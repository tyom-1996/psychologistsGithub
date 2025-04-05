import Image from "next/image";
import '../assets/css/home.css';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArrowIcon from "../assets/icons/arrowIcon";
import ArrowMobile from "../assets/icons/arrowMobileIcon";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import ReactPaginate from "react-paginate";
import {useMakeFeedback} from "@/hooks/useMakeFeedback";
import CalendarCloseIcon from "@/assets/icons/calendarCloseIcon";
import CalendarCloseIconMobile from "@/assets/icons/calendarCloseIconMobile";
import PayIcon from "@/assets/icons/payIcon";
import PayTabletIcon from "@/assets/icons/payTabletIcon";
import PayMobileIcon from "@/assets/icons/payMobileIcon";
import {useGetPsychologists} from "@/hooks/useGetPsychologists";
import {useGetServices} from "@/hooks/useGetServices";



export default function Home() {

    const [psychologistsList, setPsychologistsList] = useState([
        {
            id: 1,
            img: '/images/psychologist_img1.png',
            name: 'Юрий Абалак',
            position: 'Психологи',
        },
        {
            id: 2,
            img: '/images/psychologist_img2.png',
            name: 'Алиса Абалак',
            position: 'Психологи',
        },
        {
            id: 3,
            img: '/images/psychologist_img3.png',
            name: 'Александра Абалак',
            position: 'Психологи',
        },
    ]);
    const [name, setName] = useState('');
    const [surname, setSurName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('+7'); // Initialize with "+7"
    const [message, setMessage] = useState('');
    const [showFeedbackSuccessPopup, setShowFeedbackSuccessPopup] = useState(false);
    const { makeFeedback, makeFeedbackData, nameError, surnameError, phoneError, messageError } = useMakeFeedback();
    const {getPsychologists, psychologistsData } = useGetPsychologists();

    const [imagePath, setImagePath] = useState('https://api.menspsychology.ru/uploads');

    useEffect(() => {
        getPsychologists()
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;

        // Ensure the input always starts with "+7"
        if (!value.startsWith('+7')) {
            setPhoneNumber('+7');
        } else {
            setPhoneNumber(value); // Allow editing after "+7"
        }
    };

    useEffect(() => {
        if (makeFeedbackData) {
            if (makeFeedbackData?.message == "Feedback submitted successfully") {
                    setShowFeedbackSuccessPopup(true)
                    setName('')
                    setSurName('')
                    setPhoneNumber('')
                    setMessage('')
            }
        }
    }, [makeFeedbackData]);



    const router = useRouter();

    const handleNavigateToHome = () => {
        router.push('/');
    };

    const writeFeedback = async () => {
        await  makeFeedback(name, surname, phoneNumber, message)
    }

    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };
    return (
        <div className={'main_wrapper'}>
            <Header activePage={"home_page"}/>
            <main className='main_body_part'>
                <section className="top">
                    <div className="top_wrapper">
                        <div className="top_info_item">
                            <h1 className='top_title'>
                                Лучшие Психологи
                                Здесь
                            </h1>
                            <p className='top_info'>
                                Men’s Psychology – сознательное развитие для современного мужчины.
                            </p>
                        </div>
                        <div className="top_img_item">
                            <Image
                                src="/images/top_img.png"
                                alt=""
                                layout="fill"
                                objectFit="cover"
                                quality={100}
                            />
                        </div>
                        <div className="tablet_top_img_item">
                            <Image
                                src="/images/tablet_top_img.png"
                                alt=""
                                layout="fill"
                                objectFit="cover"
                                quality={100}
                            />
                        </div>
                        <div className="mobile_top_img_item">
                            <Image
                                src="/images/mobile_top_img.png"
                                alt=""
                                layout="fill"
                                objectFit="cover"
                                quality={100}
                            />
                        </div>
                    </div>
                </section>
                <section className="about_us">
                    <div className="about_us_wrapper">
                        <div className='about_us_title_line_wrapper'>
                            <h1 className='mobile_about_us_info_box_title'>
                                О нас
                            </h1>
                            <div className='about_us_title_line'></div>
                        </div>
                        <button
                            className='about_us_logo_img'
                            onClick={() => {
                                handleNavigateToHome()
                            }}
                        >
                            <Image
                                src="/svg/logo.svg"
                                alt="Company Logo"
                                layout="fill"
                                objectFit="cover"
                                quality={100}
                            />

                        </button>
                        <div className="about_us_info_box">
                            <h1 className='about_us_info_box_title'>
                                О нас
                            </h1>
                            <p className="about_us_info_box_text">
                                В современном мире многие представители сильного пола не уделяют достаточного внимания своему психологическому состоянию. Существовали, и существуют до сих пор стереотипы, согласно которым работа с психологом – это проявление слабости. Мы, совместно с нашими специалистами, призваны развенчать подобные мифы. Мы убеждены, что только человек, обладающий внутренней силой, способен обратиться за помощью.
                            </p>

                            <p className="about_us_info_box_text">
                                Когда же мужчине может понадобиться помощь психолога?
                                Совершенно в любой жизненной ситуации. У Вас возникло недопонимание с вашей второй половиной? Вы сталкиваетесь с трудностями в рабочем процессе? Вы не можете найти общий язык с начальством или коллегами? У Вас возникают разногласия с родителями, детьми или друзьями? Или же Вы просто хотите с кем-то поговорить? С этими и другими проблемами Вам помогут разобраться наши специалисты.

                            </p>
                            {/*<p className="about_us_info_box_text">*/}
                            {/*    Почему именно мы?*/}
                            {/*    Men’s Psychology - твой путь к самосовершенствованию!*/}
                            {/*    Сервис предложит платформу, объединяющую онлайн-консультации с психологами, тренинги, профессиональные курсы саморазвития и поддержку сообщества мужчин, стремящихся к гармонии и уверенности в себе.*/}
                            {/*    Мы безгранично ценим женщин. Но никто не поймёт мужчину, как другой мужчина. Мы помогаем раскрыть потенциал и достигать успеха в любой сфере жизни, сохраняя внутреннее равновесие и эмоциональное благополучие. У нас работают преимущественно молодые специалисты, с которыми Вам будет очень легко найти общий язык.*/}
                            {/*    Ну и самое главное. Разобраться в себе и понять окружающих хочет каждый человек, но также очень важно решить ту задачу, с которой пришёл клиент. Наша позиция заключается в том, что консультации должны приносить не только психологический комфорт, но и быть направлены на практическое применение в жизни. Наш основной принцип – на любую задачу найдётся своё решение.*/}
                            {/*    Men’s Psychology – люди, которые поймут.»*/}
                            {/*</p>*/}
                            <a href="/about-us" className='more_link'>
                                <span className='more_link_text'>
                                    Ещё
                                </span>
                                <span className='more_link_arrow'>
                                    <ArrowIcon/>
                                </span>
                                <span className='mobile_more_link_arrow'>
                                    <ArrowMobile/>
                                </span>
                            </a>
                        </div>
                    </div>
                </section>
                <section className="psychologists">
                    <div className="psychologists_wrapper">
                        <div className="psychologists_title_line_wrapper">
                            <h1 className='psychologists_title'>Психологи</h1>
                            <div className="psychologists_line"></div>
                        </div>

                        <div className='psychologists_items_wrapper'>
                            {psychologistsData?.data &&
                                psychologistsData.data.slice(0, 12).map((item, index) => {
                                    console.log(`${imagePath}/${item?.image}`, 'hhsagaggsbbsbsbsb')
                                    return (
                                        <div
                                            className='psychologists_item psychologists_item2' key={index}
                                        >
                                            <div className='psychologists_item_img'>
                                                <img src={item?.image ? `${imagePath}/${item?.image}` : '/images/psychologist_img4.png'}
                                                     alt="Company Logo"/>
                                            </div>
                                            <div className='psychologists_item_info_box'>
                                                <p className='psychologists_item_name'>{item?.first_name} {item?.last_name}</p>
                                                {/*<p className='psychologists_item_position'>Психологи</p>*/}
                                                <a href={`/specialists/${item?.id}`} className='read_more_link'>
                                                    <span className='read_more_link_text'>
                                                        Информация
                                                    </span>
                                                    <span className='read_more_link_arrow'>
                                                        <ArrowIcon/>
                                                    </span>
                                                    <span className='mobile_read_more_link_arrow'>
                                                         <ArrowMobile/>
                                                     </span>
                                                </a>
                                            </div>
                                        </div>
                                    );
                                    })
                            }
                        </div>

                        <a href="/specialists" className='psychologists_more_link'>
                            <span className='psychologists_more_link_text'>
                                Ещё
                            </span>
                            <span className='psychologists_more_link_arrow'>
                                    <ArrowIcon/>
                            </span>
                            <span className='mobile_psychologists_more_link_arrow'>
                                    <ArrowMobile/>
                            </span>
                        </a>
                    </div>
                </section>
                <section className='reverse_connection'>
                    <div className='reverse_connection_wrapper'>
                        <div className='reverse_connection_title_line_wrapper'>
                            <h1 className='mobile_reverse_connection_title'>
                                Обратная Связь
                            </h1>
                            <div className='reverse_connection_line'></div>
                        </div>
                        <h1 className='reverse_connection_title'>
                            Обратная Связь
                        </h1>
                        <div className='reverse_connection_form'>
                            <div className='reverse_connection_form_input'>
                                <input
                                    type='text'
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                    placeholder='Имя'
                                    className='reverse_connection_form_input_field'
                                />
                                {nameError &&
                                    <p className='error_text2'>{nameError}</p>
                                }
                            </div>
                            <div className='reverse_connection_form_input'>
                                <input
                                    type='text'
                                    value={surname}
                                    onChange={(e) => {
                                        setSurName(e.target.value)
                                    }}
                                    placeholder='Фамилия'
                                    className='reverse_connection_form_input_field'
                                />
                                {surnameError &&
                                    <p className='error_text2'>{surnameError}</p>
                                }
                            </div>

                            <div className="reverse_connection_form_input_wraaper">
                            <input
                                        type="text"
                                        className="reverse_connection_form_input_field1"
                                        value="+7"
                                        readOnly // Country code is non-editable
                                    />
                                    <input
                                        type="number"
                                        className="reverse_connection_form_input_field2"
                                        value={phoneNumber.slice(2)} // Display only the phone number part
                                        onChange={(e) => setPhoneNumber('+7' + e.target.value)} // Prepend "+7" on input change
                                        placeholder="Номер Телефона"
                                    />
                            </div>
                            {phoneError &&
                                <p className='error_text2' style={{marginBottom: 10}}>{phoneError}</p>
                            }
                            <div className='reverse_connection_form_input'>
                                <textarea
                                    name="" id="" cols="10" rows="6" placeholder='Письмо'
                                    className='reverse_connection_form_input_field'
                                    value={message}
                                    onChange={(e) => {
                                        setMessage(e.target.value)
                                    }}
                                ></textarea>
                                {messageError &&
                                    <p className='error_text2'>{messageError}</p>
                                }
                            </div>
                            <button
                                className='reverse_connection_form_send_btn'
                                onClick={() => {
                                    writeFeedback()
                                }}
                            >
                                Отправить
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {showFeedbackSuccessPopup &&
                <div className="pay_success_popup">
                    <div className='pay_success_popup_wrapper'>
                        <button
                            className="pay_success_popup_close_btn"
                            onClick={() => {
                                setShowFeedbackSuccessPopup(false)
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
                            Отзыв успешно отправлен
                        </h1>

                    </div>
                </div>
            }

            <Footer activPage={"home_page"}/>
        </div>
    );
}
