import Image from "next/image";
import '../../assets/css/home.css';
import { useEffect, useState } from "react";
import Link from "next/link";
import withOutAuth from '../../components/withAuth';

import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArrowIcon from "@/assets/icons/arrowIcon";
import ArrowMobile from "@/assets/icons/arrowMobileIcon";
import FilterArrowIcon from "@/assets/icons/filterArrowIcon";
import FilterArrowIconMobile from "@/assets/icons/filterArrowIconMobile";
import FilterIcon from "@/assets/icons/filterIcon";
import FilterIconMobile from "@/assets/icons/filterIconMobile";
import FilterModal from "../../components/modals/FilterModal";
import ReactPaginate from "react-paginate";

const Specialists = () => {
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
    const [showFilterModal, setShowFilterModal] = useState(false);

    const router = useRouter();

    useEffect(() => {

    }, []);

    // const handlePageClick = (event) => {
    //     setCurrentPage2(event.selected + 1); // Update the current page
    // };
    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };

    const redirectTPsychologistsSinglePage = (id) => {
        router.push(`/specialists/${id}`);
    }
    return (
        <div className={'main_wrapper'} id={'specialists'}>
            <Header activePage={"specialists"} isLogged={true}/>
            <section className="psychologists">
                <div className="psychologists_wrapper">
                    <div className="psychologists_title_line_wrapper2">
                        <h1 className='psychologists_title'>Психологи</h1>
                        <div className="psychologists_line2"></div>
                        <div
                            className='filter_icons_title_wrapper'
                            onClick={() => {
                                setShowFilterModal(true)
                                disableBodyScroll()
                            }}
                        >
                            <div className='filter_icon1'>
                                <FilterIcon/>
                            </div>
                            <div className='filter_icon2'>
                                <FilterIconMobile/>
                            </div>
                            <div className='filter_icon_title_child'>
                                <p className='filter_title'>Фильтр</p>
                                <span className='filter_arrow_icon1'>
                                    <FilterArrowIcon/>
                                </span>

                                <span className='filter_arrow_icon2'>
                                    <FilterArrowIconMobile/>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='psychologists_items_wrapper'>
                        {psychologistsList.map((item, index) => {
                            return (
                                <div
                                    className='psychologists_item psychologists_item2' key={index}
                                    onClick={() => {
                                        redirectTPsychologistsSinglePage(item?.id)
                                    }}
                                >
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
                            )
                        })}
                    </div>
                    <div className={'react-pagination-wrapper'}>
                        <ReactPaginate
                            className={'react-pagination'}
                            breakLabel={null} // Hides the ellipsis
                            nextLabel=">"
                            pageRangeDisplayed={'5'} // Display all page numbers
                            pageCount={"5"} // Total pages
                            previousLabel="<"
                            renderOnZeroPageCount={null}
                            activeClassName={'react-pagination-active'}
                        />

                    </div>
                </div>
            </section>
            <Footer activePage={"specialists"}/>

            {showFilterModal && (
                <FilterModal
                    isOpen={showFilterModal}
                    onClose={() => setShowFilterModal(false)}
                />
            )}
        </div>
    );
};

export default Specialists;
