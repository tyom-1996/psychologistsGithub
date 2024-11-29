// import React, { useRef, useState } from 'react';
// // Import Swiper React components
//
//
// // import './styles.css';
//
// // import required modules
// import Link from "next/link";
// import Image from "next/image";
// import Card from "@/components/Card";
// import ReactStars from "react-rating-stars-component";
// import {useWriteReview} from "@/hooks/useWriteReview";
//
//
// export default function WriteReviewModal({onClose}) {
//     const {writeReview, reviewErrorText,loading } = useWriteReview();
//     const [review, setReview] = useState('');
//
//     const thirdExample = {
//         size: 40,
//         count: 5,
//         isHalf: false,
//         value: 1,
//         color: "#EBEBEB",
//         activeColor: "#FFDD55",
//         onChange: newValue => {
//             console.log(`Example 3: new value is ${newValue}`);
//         }
//     };
//     const handleWriteReview = async (e) => {
//         e.preventDefault();
//         writeReview(review);
//
//     };
//
//     return (
//         <div className={'modal-wrapper'}>
//             <div className={'modal-wrapper-container'}>
//
//                 <button className="close-modal" onClick={onClose}>
//                     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                             d="M16.0675 15.1832C16.1256 15.2412 16.1717 15.3102 16.2031 15.386C16.2345 15.4619 16.2507 15.5432 16.2507 15.6253C16.2507 15.7075 16.2345 15.7888 16.2031 15.8647C16.1717 15.9405 16.1256 16.0095 16.0675 16.0675C16.0095 16.1256 15.9405 16.1717 15.8647 16.2031C15.7888 16.2345 15.7075 16.2507 15.6253 16.2507C15.5432 16.2507 15.4619 16.2345 15.386 16.2031C15.3102 16.1717 15.2412 16.1256 15.1832 16.0675L10.0003 10.8839L4.81754 16.0675C4.70026 16.1848 4.5412 16.2507 4.37535 16.2507C4.2095 16.2507 4.05044 16.1848 3.93316 16.0675C3.81588 15.9503 3.75 15.7912 3.75 15.6253C3.75 15.4595 3.81588 15.3004 3.93316 15.1832L9.11675 10.0003L3.93316 4.81754C3.81588 4.70026 3.75 4.5412 3.75 4.37535C3.75 4.2095 3.81588 4.05044 3.93316 3.93316C4.05044 3.81588 4.2095 3.75 4.37535 3.75C4.5412 3.75 4.70026 3.81588 4.81754 3.93316L10.0003 9.11675L15.1832 3.93316C15.3004 3.81588 15.4595 3.75 15.6253 3.75C15.7912 3.75 15.9503 3.81588 16.0675 3.93316C16.1848 4.05044 16.2507 4.2095 16.2507 4.37535C16.2507 4.5412 16.1848 4.70026 16.0675 4.81754L10.8839 10.0003L16.0675 15.1832Z"
//                             fill="black"></path>
//                     </svg>
//                 </button>
//
//
//                 <h1 className={'close-modal-title'}>Написать отзыв</h1>
//                 <div className="close-modal-line"></div>
//
//                 <p className={'text-left'} style={{width: '100%'}}>Выберите вашу оценку</p>
//
//
//
//                 <ReactStars {...thirdExample} />
//                 <button
//                     className={'modal-send-message'}
//                     onClick={(e) => {
//                         handleWriteReview(e)
//                     }}
//                 >
//                     Отправить
//                 </button>
//             </div>
//         </div>
//     );
// }


import React, {useEffect, useState} from 'react';
import ReactStars from "react-rating-stars-component";
import {useWriteReview} from "@/hooks/useWriteReview";

export default function WriteReviewModal({ id, onClose }) {
    const {writeReview, reviewErrorText, loading, reviewData } = useWriteReview();
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(1); // State to store rating

    const thirdExample = {
        size: 40,
        count: 5,
        isHalf: false,
        value: rating, // Bind value to rating state
        color: "#EBEBEB",
        activeColor: "#FFDD55",
        onChange: newValue => {
            setRating(newValue); // Update rating state
            console.log(`New rating value: ${newValue}`);
        }
    };
    useEffect(() => {
        // Close the modal if the review was successfully added
        if (reviewData?.message === 'Отзыв успешно добавлен') {
            onClose(); // Close the modal
        }
    }, [reviewData, onClose]); // Add onClose to the dependency array

    const handleWriteReview = async () => {
        await writeReview({review, rating, id});

    };

    return (
        <div className={'modal-wrapper'}>
            <div className={'modal-wrapper-container'}>
                <button className="close-modal" onClick={onClose}>
                    {/* Close button SVG code */}
                </button>

                <h1 className={'close-modal-title'}>Написать отзыв</h1>
                <div className="close-modal-line"></div>

                <p className={'text-left'} style={{width: '100%'}}>Выберите вашу оценку</p>

                <textarea
                    name="" id="" cols="30" rows="10"
                    placeholder={'Пожалуйста, опишите ваши впечатления и результаты вашего взаимодействия\n' +
                        'с этим пользователем. Ваш отзыв не может содержать оскорбительную или ненормативную лексику.'}
                    value={review}
                    onChange={(event) => {
                        setReview(event.target.value)
                    }}
                ></textarea>

                {reviewErrorText &&
                    <p className='error_text2'>{reviewErrorText}</p>
                }

                <ReactStars {...thirdExample} />
                <button
                    className={'modal-send-message'}
                    style={{
                        marginTop: '15px'
                    }}
                    onClick={() => {
                        handleWriteReview()
                    }}
                >
                    Отправить
                </button>
            </div>
        </div>
    );
}
