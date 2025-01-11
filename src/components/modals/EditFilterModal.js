import {useEffect, useState } from "react";
import styles from "../../assets/css/filter.css";
import FilterCloseIcon from "../../assets/icons/filterCloseIcon";
import FilterCloseMobileIcon from "../../assets/icons/filterCloseMobileIcon";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {useServicesAssign} from "@/hooks/useServicesAssign";
const EditFilterModal = ({ isOpen, onClose, services, selectedServices, onSave }) => {
    const [price, setPrice] = useState([0, 5000]);
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOptions2, setSelectedOptions2] = useState([]);
    const [range, setRange] = useState([0, 5000]);
    const {servicesAssign, servicesAssignData } = useServicesAssign();
    const [localSelectedServices, setLocalSelectedServices] = useState(selectedServices || []);

    const handleRangeChange = (newRange) => {
        setRange(newRange);
    };

    useEffect(() => {
        setLocalSelectedServices(selectedServices || []); // Sync with parent state when opened
    }, [selectedServices]);

    const handleOptionChange = (serviceId) => {
        setLocalSelectedServices((prev) =>
            prev.includes(serviceId)
                ? prev.filter((id) => id !== serviceId) // Remove if already selected
                : [...prev, serviceId] // Add if not selected
        );
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
        const numericValue = Number(value); // Convert value to a number
        if (!isNaN(numericValue)) { // Check if it's a valid number
            setSelectedOptions2((prev) =>
                prev.includes(numericValue)
                    ? prev.filter((v) => v !== numericValue) // Remove if already selected
                    : [...prev, numericValue] // Add if not selected
            );
        } else {
            console.error("Invalid ID: not a number", value);
        }
    };


    const handleServicesAssign = (selectedServiceIds) => {
        const numericIds = selectedServiceIds.map((id) => Number(id)); // Ensure all IDs are numbers
        const filterParams = {
            service_ids: numericIds, // Wrap numeric IDs in "service_ids"
        };
        console.log(filterParams, 'filter_params______');
        servicesAssign(filterParams); // Send the numeric IDs to the API
    };

    if (!isOpen) return null;


    return (
        <div className={'filter_modal2'}>
            <div className={"filter_modal_wrapper2"}>
                <div className="filter_modal_header2">
                    <h2 className={'filter_modal_title2'}>Специализация</h2>
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
                <div className='filter_modal_body_part2'>
                    <div className="filter_modal_section_child">
                        {services &&
                            services.map((service) => (
                                <label key={service.id} className="filter_modal_section_checkbox_input_label2">
                                    <span className="filter_modal_section_radio_input_label_title2">
                                        {service.name}
                                    </span>
                                    <input
                                        type="checkbox"
                                        value={service.id}
                                        checked={localSelectedServices.includes(service.id)} // Precheck selected items
                                        onChange={() => handleOptionChange(service.id)} // Handle selection
                                    />
                                    <span className="custom_checkbox"></span>
                                </label>
                            ))}

                    </div>

                </div>

                <div className="filter_modal_footer2">
                    <button
                        className="filter_modal_footer_btn1"
                        onClick={() => {
                            onSave(localSelectedServices); // Pass updated services back to parent
                            handleServicesAssign(localSelectedServices); // Call the API for service assignments

                            onClose(); // Close modal
                            document.body.style.overflow = "auto"; // Re-enable scroll
                        }}
                    >
                        Сохранять
                    </button>


                </div>


            </div>
        </div>
    );
};

export default EditFilterModal;
