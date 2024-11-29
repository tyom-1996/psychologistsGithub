import React, {useEffect, useState} from 'react';
import styles from '../../assets/css/image_uploader.css';
import Image from "next/image";

export default function ImageUploader({ onUpload }) {
    const [userImages, setUserImages] = useState([]);


    useEffect(()=>{
        console.log(userImages, 'userImages')
    }, [userImages])
    const selectImages = (event) => {
        const files = Array.from(event.target.files);
        const validImages = files.filter(file => {
            const fileType = file.type.split('/')[1];
            return fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png';
        });
        console.log(validImages, 'validImages_______666666')

        if (validImages.length > 0) {
            const updatedImages = [...userImages, ...validImages];
            console.log(updatedImages,'updatedImages4444' )
            setUserImages(updatedImages); // Set the files in state
            uploadImagesToApi(updatedImages); // Trigger upload immediately for testing
        } else {
            alert('Please use correct image format (jpg, jpeg, png)');
        }
    };

    const uploadImagesToApi = (images) => {
        // const selectedImages = new FormData();
        // images.forEach((image, index) => {
        //     console.log(image, 'image1234566')
        //     selectedImages.append(`image_${index}`, image);
        // });
        //
        // console.log(selectedImages, 'formdata______-')

        // Call onUpload to pass formData to the parent component
        onUpload(images);
    };


    const deleteUserImg = (index) => {
        const updatedImages = userImages.filter((_, i) => i !== index);
        setUserImages(updatedImages);
        uploadImagesToApi(updatedImages); // Update the API after deletion
    };

    return (
        <div className="containerImageUpload">
            <div className="imageGallery">
                {userImages.map((image, index) => (
                    <div key={index} className="imageContainer">
                        <img
                            src={URL.createObjectURL(image)} // Display image preview using URL.createObjectURL
                            alt={`User ${index}`}
                            className="userImage"
                        />
                        <button
                            onClick={() => deleteUserImg(index)}
                            className="deleteButton"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                fill="none"
                            >
                                <rect width={24} height={24} fill="#fff" rx={7} />
                                <path
                                    fill="red"
                                    d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.997.997 0 0 0 5.7 7.11L10.59 12 5.7 16.89a.998.998 0 0 0 1.41 1.41L12 13.41l4.89 4.89a.997.997 0 0 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4Z"
                                />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
            <div className='upload_btn'>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: 'none' }}
                    id="image-input"
                    onChange={selectImages} // Trigger file selection
                />
                <label htmlFor="image-input" className="uploadButton">
                   <span className='uploadButton_image'>
                        <Image
                            src="/upload_img.png"
                            alt="Example Image"
                            layout="fill" // Fill the parent element
                            objectFit="cover" // Cover the area of the parent element
                            quality={100} // Image quality
                        />
                   </span>
                    <span className='image_upload_title'>Добавить</span>
                </label>
            </div>
        </div>
    );
}
