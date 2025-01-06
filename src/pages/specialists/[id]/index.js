import Image from "next/image";
import '../../../assets/css/specialist_single.css';
import { useEffect, useState } from "react";
import Link from "next/link";
import withAuth  from '../../../components/withAuth';
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReactPaginate from "react-paginate";
import DropDownIcon from "@/assets/icons/dropdownIcon";
import DropDownMobileIcon from "@/assets/icons/dropdownMobileIcon";
import {useGetPsychologistSingle} from "@/hooks/useGetPsychologistSingle";

export async function getServerSideProps({ params }) {
    const id = params.id;

    console.log(params, 'params')

    return {
        props: {
            id,
        }
    };
}

export default function Specialist ({id})  {
    const [showFilterModal, setShowFilterModal] = useState(false);
    const {getPsychologistSingle, psychologistSingleData } = useGetPsychologistSingle();


    const router = useRouter();

    useEffect(() => {
        if (id) {
            getPsychologistSingle(id)
        }

    }, [id]);

    useEffect(() => {
        if (psychologistSingleData) {
            console.log(psychologistSingleData, 'psychologistSingleData')
        }

    }, [psychologistSingleData]);

    const redirectToAppointmentRegister = () => {
        router.push(`/specialists/appointment-register?id=${id}`);
    }


    return (
        <div className={'main_wrapper'} id={'specialists_single_page'}>
            <Header activePage={"specialists"} isLogged={true}/>
            <section className="specialists_single_page_section">
                <div className="specialists_single_page_section_wrapper">
                    <div className="specialists_single_page_section_item1_mobile">
                        <div className='specialists_single_page_section_item1_mobile_child1'>
                            <div className="specialists_single_page_section_item1_img">
                                <Image
                                    src="/images/specialist_single_img1.png"
                                    alt="Company Logo"
                                    layout="fill"
                                    objectFit="cover"
                                    quality={100}
                                />
                            </div>
                            <div className='specialists_single_page_section_item1_mobile_child_info_box'>
                                <h2 className='specialists_single_page_section_item1_title'>
                                    {psychologistSingleData?.first_name} {psychologistSingleData?.last_name}
                                </h2>
                                <p className='specialists_single_page_section_item1_info'>Психолог</p>
                            </div>
                        </div>

                        <div className="specialists_single_page_section_item1_info_wrapper">
                            {/*<div className="specialists_dropdown_form">*/}
                            {/*        <div*/}
                            {/*            className='specialists_dropdown_header'*/}
                            {/*            onClick={() => setIsOpen(!isOpen)}*/}
                            {/*        >*/}
                            {/*            <p className="specialists_dropdown_header_title">*/}
                            {/*                {selectedOption || "Выбрать вариант приёма"}*/}
                            {/*            </p>*/}
                            {/*            <div className='specialists_dropdown_header_icon'>*/}
                            {/*                <DropDownIcon/>*/}
                            {/*            </div>*/}
                            {/*            <div className='specialists_dropdown_header_icon_mobile'>*/}
                            {/*                <DropDownMobileIcon/>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}

                            {/*        {isOpen && (*/}
                            {/*            <ul className="specialists_dropdown_menu">*/}
                            {/*                {options.map((option, index) => (*/}
                            {/*                    <li*/}
                            {/*                        key={index}*/}
                            {/*                        className="specialists_dropdown_item"*/}
                            {/*                        onClick={() => handleOptionClick(option?.name)}*/}
                            {/*                    >*/}
                            {/*                        {option?.name}*/}
                            {/*                    </li>*/}
                            {/*                ))}*/}
                            {/*            </ul>*/}
                            {/*        )}*/}
                            {/*    </div>*/}
                            <div className='specialists_single_page_section_item1_mobile_btn_price_info_box'>
                                <button
                                    className='make_an_appointment_with_specialists_btn'
                                    onClick={() => {
                                        redirectToAppointmentRegister()
                                    }}
                                >
                                    Записаться на приём
                                </button>
                                <div className='specialists_single_page_section_item1_price_info_box'>
                                    <h3 className='specialists_single_page_section_item1_price_info1'>3000 <span>Руб.</span> </h3>
                                    <p className='specialists_single_page_section_item1_price_info2'>Оплата за приём</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="specialists_single_page_section_item1">
                        <div className="specialists_single_page_section_item1_img">
                            <Image
                                src="/images/specialist_single_img1.png"
                                alt="Company Logo"
                                layout="fill"
                                objectFit="cover"
                                quality={100}
                            />
                        </div>
                        <div className="specialists_single_page_section_item1_info_wrapper">
                            <h2 className='specialists_single_page_section_item1_title'>
                                {psychologistSingleData?.first_name} {psychologistSingleData?.last_name}
                            </h2>
                            <p className='specialists_single_page_section_item1_info'>Психолог</p>
                            <div className='specialists_single_page_section_item1_price_dropdown_wrapper'>
                                {/*<div className="specialists_dropdown_form">*/}
                                {/*    <div*/}
                                {/*        className='specialists_dropdown_header'*/}
                                {/*        onClick={() => setIsOpen(!isOpen)}*/}
                                {/*    >*/}
                                {/*        <p className="specialists_dropdown_header_title">*/}
                                {/*            {selectedOption || "Выбрать вариант приёма"}*/}
                                {/*        </p>*/}
                                {/*        <div className='specialists_dropdown_header_icon'>*/}
                                {/*            <DropDownIcon/>*/}
                                {/*        </div>*/}
                                {/*        <div className='specialists_dropdown_header_icon_mobile'>*/}
                                {/*            <DropDownMobileIcon/>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}

                                {/*    {isOpen && (*/}
                                {/*        <ul className="specialists_dropdown_menu">*/}
                                {/*            {options.map((option, index) => (*/}
                                {/*                <li*/}
                                {/*                    key={index}*/}
                                {/*                    className="specialists_dropdown_item"*/}
                                {/*                    onClick={() => handleOptionClick(option?.name)}*/}
                                {/*                >*/}
                                {/*                    {option?.name}*/}
                                {/*                </li>*/}
                                {/*            ))}*/}
                                {/*        </ul>*/}
                                {/*    )}*/}
                                {/*</div>*/}
                                <button
                                    className='make_an_appointment_with_specialists_btn'
                                    onClick={() => {
                                        redirectToAppointmentRegister()
                                    }}
                                >
                                    Записаться на приём
                                </button>
                                <div className='specialists_single_page_section_item1_price_info_box'>
                                    <h3 className='specialists_single_page_section_item1_price_info1'>3000 <span>Руб.</span>
                                    </h3>
                                    <p className='specialists_single_page_section_item1_price_info2'>Оплата за приём</p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="specialists_single_page_section_item2">
                        <div className='specialists_single_page_section_item2_title_line_wrapper'>
                        <h1 className='specialists_single_page_section_item2_title'>Информация о специалисте</h1>
                            <div className='specialists_single_page_section_item2_line'></div>
                        </div>
                        <div className='specialists_single_page_section_item2_info_part'>
                            <p className='specialists_single_page_section_item2_info'>
                                Александр Леонидович Мясников (род. 15 сентября 1953, Ленинград) — советский и российский врач-кардиолог, врач общей практики, теле-, радиоведущий и общественный деятель, автор книг о здоровье.  Родился в семье потомственных врачей, медицинская династия Мясниковых берёт начало в XIX веке. 34 В 1976 году окончил 2-й Московский медицинский институт имени Н. И. Пирогова, после чего до 1981 года проходил ординатуру и аспирантуру в Институте клинической кардиологии. В 1981 году в Институте кардиологии им. А. Л. Мясникова защитил диссертацию на соискание учёной степени кандидата медицинских наук. 
                            </p>
                            <p className='specialists_single_page_section_item2_info'>
                                Работал врачом группы геологов в Африке, в Народной Республике Мозамбик.
                                В 1983 году трудился в провинции Замбези врачом общей практики. С 1984 по 1989 год служил старшим группы советских врачей-консультантов правительственного госпиталя «Пренда» в Анголе.  Вернувшись в Москву, совмещал работу врача-кардиолога во Всесоюзном кардиологическом научном центре.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer activePage={"specialists"}/>


        </div>
    );
};


