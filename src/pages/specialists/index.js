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
import {useGetPsychologists} from "@/hooks/useGetPsychologists";
import {useGetServices} from "@/hooks/useGetServices";

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
    const [imagePath, setImagePath] = useState('https://api.menspsychology.ru/uploads');
    const {getPsychologists, psychologistsData } = useGetPsychologists();
    const {getServices, servicesData } = useGetServices();
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
      getPsychologists()
    }, []);


    useEffect(() => {
        if (psychologistsData) {
            console.log(psychologistsData, 'psychologistsData_________________')
        }
    }, [psychologistsData]);

    useEffect(() => {
        getServices(currentPage)
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
    const handleApplyFilters = (selectedServiceIds) => {
        const numericIds = selectedServiceIds.map((id) => Number(id)); // Ensure all IDs are numbers
        const filterParams = {
            service_ids: numericIds, // Wrap numeric IDs in "service_ids"
        };
        console.log(filterParams, 'filter_params______');
        getPsychologists(filterParams); // Pass the formatted object
    };
    const handlePageClick = (event) => {
        const selectedPage = event.selected + 1; // react-paginate uses 0-based index
        setCurrentPage(selectedPage);
    };
    return (
        <div className={'main_wrapper'} id={'specialists'}>
            <Header activePage={"specialists"} />
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
                        {psychologistsData?.data && psychologistsData?.data.map((item, index) => {
                            return (
                                <div
                                    className='psychologists_item psychologists_item2' key={index}
                                    onClick={() => {
                                        redirectTPsychologistsSinglePage(item?.id)
                                    }}
                                >
                                    <div className='psychologists_item_img'>
                                        <Image
                                            src={item?.image ? `${imagePath}/${item?.image}` : '/images/psychologist_img4.png'}
                                            alt="Company Logo"
                                            layout="fill"
                                            objectFit="cover"
                                            quality={100}
                                        />
                                    </div>
                                    <div className='psychologists_item_info_box'>
                                        <p className='psychologists_item_name'>{item?.first_name} {item?.last_name}</p>
                                        <p className='psychologists_item_position'>Психологи</p>
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
                    {psychologistsData?.pagination.totalPages > 1 && (
                        <div className={'react-pagination-wrapper'}>
                            <ReactPaginate
                                className={'react-pagination'}
                                breakLabel={null}
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={psychologistsData?.totalPages}
                                marginPagesDisplayed={psychologistsData?.totalPages}
                                pageCount={psychologistsData?.totalPages} // Use dynamic totalPages
                                previousLabel="<"
                                renderOnZeroPageCount={null}
                                activeClassName={'react-pagination-active'}
                            />

                        </div>
                    )}


                </div>
            </section>
            <Footer activePage={"specialists"}/>

            {showFilterModal && (
                <FilterModal
                    isOpen={showFilterModal}
                    services={servicesData}
                    onClose={() => setShowFilterModal(false)}
                    handleApplyFilters={handleApplyFilters}
                />
            )}
        </div>
    );
};

export default Specialists;
