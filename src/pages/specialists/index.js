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

    const [showFilterModal, setShowFilterModal] = useState(false);
    const [imagePath, setImagePath] = useState('https://api.menspsychology.ru/uploads');
    const {getPsychologists, psychologistsData } = useGetPsychologists();
    const {getServices, servicesData } = useGetServices();
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        // On initial load or whenever page changes, fetch psychologists with no filters
        getPsychologists({}, currentPage);
    }, [currentPage]);

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
        // Convert all IDs to numbers
        const numericIds = selectedServiceIds.map((id) => Number(id));

        // Build the filter object for your POST body
        const filterParams = {
            service_ids: numericIds,
        };
        console.log(filterParams, 'filter_params______');

        // Pass the filter object and the current page to the hook
        getPsychologists(filterParams, currentPage);
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
                    <div className='psychologists_info_wrapper'>
                        <p className='psychologists_info'>
                            Наши специалисты:
                            Какие они?

                            Молодые и развивающиеся
                            К нам попадают только те, кто горит своей профессией, захочет помочь людям и сделать мир чуточку лучше. Наши специалисты искренне любят свое дело и регулярно повышают свою квалификацию

                            Эмпатичные
                            Вы можете быть уверены, что найдете качественную поддержку в любом вопросе и получите результат за к нам

                            А как определить, хорошие ли они специалисты?

                            Образование
                            Каждый из наших психологов является дипломированным специалистом с высшим образованием. За квантовой психологией и астрологией  точно не к нам. 2х недельные курсы не подойдут.

                            Научный подход
                            В своем подходе психологи опираются на доказательную базу и последние научные исследования



                        </p>
                    </div>
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
                                        <img
                                            src={item?.image ? `${imagePath}/${item?.image}` : '/images/psychologist_img4.png'}
                                            alt="Company Logo"
                                        />
                                    </div>
                                    <div className='psychologists_item_info_box'>
                                        <p className='psychologists_item_name'>{item?.first_name} {item?.last_name}</p>
                                        {/*<p className='psychologists_item_position'>Психологи</p>*/}
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
                    selectedOptions={selectedOptions}       // pass current selections
                    setSelectedOptions={setSelectedOptions} // pass setter so modal can update them
                />
            )}
        </div>
    );
};

export default Specialists;
