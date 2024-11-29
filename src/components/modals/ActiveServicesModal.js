import React, {useEffect, useState} from 'react';
import Image from "next/image";
import { useGetActiveServicesList } from '@/hooks/useGetActiveServicesList';


export default function ActiveServicesModal({ onClose, activeServicesData, adId, successPopup }) {

    const formatIsoDate = (isoString) => {
        let date = new Date(isoString);

        // Get the individual components
        let day = date.getDate().toString().padStart(2, '0');
        let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        let year = date.getFullYear() + 1; // Increment year by 1

        // Format the date as DD.MM.YYYY
        return `${day}.${month}.${year}`;
    }

    return (
        <div className="modal-wrapper">
            <div className="modal-wrapper-container">
                <button className="close-modal" onClick={onClose}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.0675 15.1832C16.1256 15.2412 16.1717 15.3102 16.2031 15.386C16.2345 15.4619 16.2507 15.5432 16.2507 15.6253C16.2507 15.7075 16.2345 15.7888 16.2031 15.8647C16.1717 15.9405 16.1256 16.0095 16.0675 16.0675C16.0095 16.1256 15.9405 16.1717 15.8647 16.2031C15.7888 16.2345 15.7075 16.2507 15.6253 16.2507C15.5432 16.2507 15.4619 16.2345 15.386 16.2031C15.3102 16.1717 15.2412 16.1256 15.1832 16.0675L10.0003 10.8839L4.81754 16.0675C4.70026 16.1848 4.5412 16.2507 4.37535 16.2507C4.2095 16.2507 4.05044 16.1848 3.93316 16.0675C3.81588 15.9503 3.75 15.7912 3.75 15.6253C3.75 15.4595 3.81588 15.3004 3.93316 15.1832L9.11675 10.0003L3.93316 4.81754C3.81588 4.70026 3.75 4.5412 3.75 4.37535C3.75 4.2095 3.81588 4.05044 3.93316 3.93316C4.05044 3.81588 4.2095 3.75 4.37535 3.75C4.5412 3.75 4.70026 3.81588 4.81754 3.93316L10.0003 9.11675L15.1832 3.93316C15.3004 3.81588 15.4595 3.75 15.6253 3.75C15.7912 3.75 15.9503 3.81588 16.0675 3.93316C16.1848 4.05044 16.2507 4.2095 16.2507 4.37535C16.2507 4.5412 16.1848 4.70026 16.0675 4.81754L10.8839 10.0003L16.0675 15.1832Z"
                            fill="black"
                        />
                    </svg>
                </button>
                <h1 className="close-modal-title">Продайте свой товар быстрее</h1>
                <p className="close-modal-subtitle">Вы можете продвигать свое объявление данными способами</p>
                <div className="close-modal-line"></div>

                <div className="paid-services-wrapper">
                    {activeServicesData?.data.map((item, index) => (
                        <React.Fragment key={index}>
                            <div
                                className="paid-services-item"
                            >
                                <div className="paid-services-item-icon">
                                    <img src={'/images/icons/paidIcon/vip.png'} alt={item.name} />
                                </div>
                                <div className="paid-services-item-center">
                                    <div className="paid-services-item-center-title">{item?.name}</div>
                                    <div className="paid-services-item-center-desc">{item?.description}</div>
                                </div>

                            </div>

                                <div className="paid-services-item-more-info">
                                    <div className="paid-services-item-more-info-item">
                                        <div className="paid-services-item-more-info-item-title">Срок действия</div>
                                        <div className="paid-services-item-more-info-item-value">
                                            {formatIsoDate(item?.end_date)}
                                        </div>
                                    </div>

                                </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
