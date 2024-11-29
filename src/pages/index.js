import Image from "next/image";
import '../assets/css/home.css';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArrowIcon from "../assets/icons/arrowIcon";
import ArrowMobile from "../assets/icons/arrowMobileIcon";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import ReactPaginate from "react-paginate";



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
    }, []);



    const router = useRouter();

    const handleNavigateToHome = () => {
        router.push('/');
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
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has
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
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            </p>

                            <p className="about_us_info_box_text">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            </p>
                            <p className="about_us_info_box_text">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting
                            </p>
                            <a href="" className='more_link'>
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
                            {psychologistsList.map((item, index) => {
                                return (
                                    <div className='psychologists_item' key={index}>
                                        <div className='psychologists_item_img'>
                                            <Image
                                                src={item.img}
                                                alt="Company Logo"
                                                layout="fill"
                                                objectFit="cover"
                                                quality={100}
                                            />
                                        </div>
                                        <div className='psychologists_item_info_box'>
                                            <p className='psychologists_item_name'>{item.name}</p>
                                            <p className='psychologists_item_position'>{item.position}</p>
                                            <a href="" className='read_more_link'>
                                            <span className='read_more_link_text'>
                                                Читать далее
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
                                )
                            })}
                        </div>
                        <a href="" className='psychologists_more_link'>
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
                            <div className='reverse_connection_form_input'>
                                <textarea
                                    name="" id="" cols="10" rows="6" placeholder='Письмо'
                                    className='reverse_connection_form_input_field'
                                ></textarea>
                            </div>
                            <button className='reverse_connection_form_send_btn'>
                                Отправить
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer activPage={"home_page"}/>
        </div>
    );
}