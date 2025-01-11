import React, { useEffect, useState } from 'react';
import ProfileEditIcon2Mobile from "@/assets/icons/profileEditIcon2Mobile";
import ProfileEditIcon2 from "@/assets/icons/profileEditIcon2";

export default function SettingsImageUploader({ userImage, changeImage }) {
    const [previewImage, setPreviewImage] = useState(userImage); // For preview

    useEffect(() => {
        setPreviewImage(userImage); // Update preview if userImage changes
    }, [userImage]);

    const selectImage = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const validImage = files[0]; // Select the first file
            const fileType = validImage.type.split('/')[1];

            if (['jpg', 'jpeg', 'png'].includes(fileType)) {
                console.log(validImage, 'Selected image file'); // Log the selected file
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewImage(reader.result); // Update preview
                };
                reader.readAsDataURL(validImage);

                changeImage(validImage); // Pass the file to parent
            } else {
                alert('Please upload a valid image (jpg, jpeg, png).');
            }
        } else {
            console.error('No file selected or invalid file input.');
        }
    };


    return (
        <div className="edit-user-item">
            <div className="edit-user-item-right">
                <div className="edit-user-item-image-wrapper">
                    <div className="edit-photo-icon-wrap">
                        <label htmlFor="image-input">
                            <div className="edit_profile_img_icon">
                                <ProfileEditIcon2 />
                            </div>
                            <div className="edit_profile_img_icon2">
                                <ProfileEditIcon2Mobile />
                            </div>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="image-input"
                            onChange={selectImage}
                        />
                    </div>
                    <div className="user-image-container">
                        <img
                            src={previewImage || '/images/psychologist_img15.png'}
                            alt="User"
                            className="userImage"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
