import { useState } from "react";
import styles from "../../assets/css/filter.css";
import FilterCloseIcon from "../../assets/icons/filterCloseIcon";
import FilterCloseMobileIcon from "../../assets/icons/filterCloseMobileIcon";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const FilterModal = ({ isOpen, onClose, services, handleApplyFilters, selectedOptions, setSelectedOptions, }) => {
    const [price, setPrice] = useState([0, 5000]);
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOptions2, setSelectedOptions2] = useState([]);
    const [range, setRange] = useState([0, 5000]);

    const handleRangeChange = (newRange) => {
        setRange(newRange);
    };

    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };

    const handleOption1Change = (value) => {
        setSelectedOption1(value);
    };

    const handleOption2Change = (value) => {
        const numericValue = Number(value);
        if (!isNaN(numericValue)) {
            setSelectedOptions((prev) =>
                prev.includes(numericValue)
                    ? prev.filter((v) => v !== numericValue) // Remove if already selected
                    : [...prev, numericValue] // Add if not selected
            );
        } else {
            console.error("Invalid ID: not a number", value);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={'filter_modal'}>
            <div className={"filter_modal_wrapper"}>
                <div className="filter_modal_header">
                    <h2 className={'filter_modal_title'}>Фильтр</h2>
                    <button className={'filter_modal_close_btn'}
                            onClick={() => {
                                onClose()
                                enableBodyScroll()
                            }}
                    >
                        <span className='filter_modal_close_btn_icon1'>
                             <FilterCloseIcon/>
                        </span>
                        <span className='filter_modal_close_btn_icon2'>
                            <FilterCloseMobileIcon/>
                        </span>
                    </button>
                </div>
                <div className='filter_modal_body_part'>
                    {/*<div className={"filter_modal_section"}>*/}
                    {/*    <h3 className='filter_modal_section_title'>Цена</h3>*/}
                    {/*    <div className='filter_modal_section_range_wrapper'>*/}
                    {/*        <div className='filter_modal_section_range_input'>*/}
                    {/*            <input*/}
                    {/*                type="number"*/}
                    {/*                value={range[0]}*/}
                    {/*                onChange={(e) =>*/}
                    {/*                    setRange([+e.target.value, range[1]])*/}
                    {/*                }*/}
                    {/*                className='filter_modal_section_range_input_field'*/}
                    {/*            />*/}
                    {/*            <span className='filter_modal_section_range_input_title'>Руб.</span>*/}
                    {/*        </div>*/}
                    {/*        <Slider*/}
                    {/*            range*/}
                    {/*            min={0}*/}
                    {/*            max={5000}*/}
                    {/*            step={50}*/}
                    {/*            value={range}*/}
                    {/*            onChange={handleRangeChange}*/}
                    {/*        />*/}
                    {/*        <div  className={'filter_modal_section_range_input'}>*/}
                    {/*            <input*/}
                    {/*                type="number"*/}
                    {/*                value={range[1]}*/}
                    {/*                onChange={(e) =>*/}
                    {/*                    setRange([range[0], +e.target.value])*/}
                    {/*                }*/}
                    {/*                className="filter_modal_section_range_input_field"*/}
                    {/*            />*/}
                    {/*            <span className={'filter_modal_section_range_input_title'}>Руб.</span>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/* Options 1 */}
                    {/*<div className={"filter_modal_section"}>*/}
                    {/*    /!*<h3 className={'filter_modal_section_title'}>Заголовок 1</h3>*!/*/}
                    {/*    <div className='filter_modal_section_child'>*/}
                    {/*        {services && services.map((service, idx) => (*/}
                    {/*            <label key={idx} className={'filter_modal_section_checkbox_input_label'}>*/}
                    {/*                <span className='filter_modal_section_radio_input_label_title'>{service?.name}</span>*/}
                    {/*                <input*/}
                    {/*                    type="checkbox"*/}
                    {/*                    value={service?.name}*/}
                    {/*                    checked={selectedOption1 === service?.name}*/}
                    {/*                    onChange={() => handleOption1Change(service?.name)}*/}
                    {/*                />*/}

                    {/*                <span className="custom_checkbox"></span>*/}

                    {/*            </label>*/}
                    {/*        ))}*/}
                    {/*    </div>*/}

                    {/*</div>*/}

                    <div className={"filter_modal_section"}>
                        <div className="filter_modal_section_child">
                            {services &&
                                services.map((service, idx) => (
                                    <label key={idx} className="filter_modal_section_checkbox_input_label">
                                    <span className="filter_modal_section_radio_input_label_title">
                                        {service?.name}
                                    </span>
                                        <input
                                            type="checkbox"
                                            value={service?.id} // Use numeric ID as the value
                                            checked={selectedOptions.includes(service?.id)} // Check if selected
                                            onChange={() => handleOption2Change(service?.id)} // Pass ID to handler
                                        />
                                        <span className="custom_checkbox"></span>
                                    </label>
                                ))}
                        </div>
                    </div>
                </div>

                <div className="filter_modal_footer">
                    <button className='filter_modal_footer_btn1'
                            onClick={() => {
                                handleApplyFilters(selectedOptions);
                                onClose();
                                document.body.style.overflow = "auto";
                            }}
                    >
                        выполнять
                    </button>

                    <button
                        className='filter_modal_footer_btn2'
                        onClick={() => {
                            setSelectedOptions([]);
                        }}
                    >
                        удалить
                    </button>
                </div>


            </div>
        </div>
    );
};

export default FilterModal;
