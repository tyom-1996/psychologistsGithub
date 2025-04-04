import Image from "next/image";
import '../../../assets/css/edit-profile.css';
import { useEffect, useState } from "react";
import withAuth from '../../../components/withAuth';
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileEditIcon1 from "@/assets/icons/profileEditIcon1";
import ProfileEditIcon1Mobile from "@/assets/icons/profileEditIcon1Mobile";
import ProfileEditIcon2Mobile from "@/assets/icons/profileEditIcon2Mobile";
import ProfileEditIcon2 from "@/assets/icons/profileEditIcon2";
import {useEditProfile} from "@/hooks/useEditProfile";
import {useGetProfileInfo} from "@/hooks/useGetProfileInfo";
import {useChangePassword} from "@/hooks/useChangePassword";
import CloseIcon2 from "@/assets/icons/closeIcon2";
import Link from "next/link";
import { PasswordCloseIcon } from '../../../assets/icons/PasswordCloseIcon';
import { PasswordCloseIcon2 } from '../../../assets/icons/PasswordCloseIcon2';
import { PasswordShowIcon } from '../../../assets/icons/PasswordShowIcon';
import { PasswordShowIcon2 } from '../../../assets/icons/PasswordShowIcon2';
import EditFilterModal from "@/components/modals/EditFilterModal";
import {useGetServices} from "@/hooks/useGetServices";
import {useServicesAssign} from "@/hooks/useServicesAssign";
import SettingsImageUploader from '@/components/SettingsImageUploader';

const PatientEditProfile = () => {

    const [activeTab, setActiveTab] = useState("about");
    const [name, setName] = useState('');
    const [surname, setSurName] = useState('');
    const [email, setEmail] = useState('');
    const [about, setAbout] = useState('test');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('+7');
    const {editProfile, editProfileData } = useEditProfile();
    const {changePassword, passwordError, newPasswordError, changePasswordData } = useChangePassword();
    const {getProfileInfo, loadingUserInfo, profileInfoData } = useGetProfileInfo();
    const [showEditPasswordPopup, setShowEditPasswordPopup] = useState(false);
    const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showFilterModal, setShowFilterModal] = useState(false);
    const {getServices, servicesData } = useGetServices();
    const [profileImage, setProfileImage] = useState(null); // Manage image for both desktop and mobile
    const [newImage, setNewImage] = useState(null); // State for new image to save
    const [imagePath, setImagePath] = useState('https://api.menspsychology.ru/uploads');




    useEffect(() => {
        getServices()
    }, []);

    const router = useRouter();

    const saveProfile = async (e) => {
        e.preventDefault();
        await editProfile(name, surname, email, phoneNumber, about, profileImage)
        const updatedUserInfo = await getProfileInfo(); // Fetch updated data

        setName(updatedUserInfo?.first_name)
        setSurName(updatedUserInfo?.last_name)
        setEmail(updatedUserInfo?.email)
        setPhoneNumber(updatedUserInfo?.phone)
        setAbout(updatedUserInfo?.about)
        const updatedImage = updatedUserInfo?.image
            ? `${imagePath}/${updatedUserInfo?.image}`
            : '/images/psychologist_img15.png';
        setProfileImage(updatedImage); // Update the displayed image
        setNewImage(null); // Reset new image state after saving

    }
    const handleChangePassword = async (e) => {
        e.preventDefault();
        await changePassword(oldPassword, newPassword)

    }

    useEffect(() => {
        if (changePasswordData) {
            if (changePasswordData?.message == "Password changed successfully") {
                setShowEditPasswordPopup(false)
            }
        }
    }, [changePasswordData])

    useEffect(() => {
        if (profileInfoData) {
            console.log(profileInfoData?.about, 'profileInfoData?.about____________');
            setName(profileInfoData?.first_name);
            setSurName(profileInfoData?.last_name);
            setEmail(profileInfoData?.email);
            setAbout(profileInfoData?.about);
            setPhoneNumber(profileInfoData?.phone);

            // Correct way to create the image URL
            let image = profileInfoData?.image
                ? `${imagePath}/${profileInfoData?.image}`
                : '/images/psychologist_img15.png';

            setProfileImage(image);
        }
    }, [profileInfoData]);

    const togglePasswordVisibility1 = () => {
        setIsOldPasswordVisible(!isOldPasswordVisible);
    };
    const togglePasswordVisibility2 = () => {
        setIsNewPasswordVisible(!isNewPasswordVisible);
    };

    const disableBodyScroll = () => {
        document.body.style.overflow = "hidden";
    };

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };

    return (
        <div className={'main_wrapper'} id={'patient-edit-profile'}>
            <Header activePage={"patient_profile"}/>
            <section className="edit_profile">
                <div className="edit_profile_wrapper">
                    <div className='edit_profile_title_line_wrapper'>
                        <h1 className='edit_profile_title'>Редактировать Профиль</h1>
                        <div className="edit_profile_line"></div>
                    </div>
                    <div className='edit_profile_items_wrapper'>
                        {/*<div className="edit_profile_item1">*/}
                        {/*    <div className="edit_profile_item1_img">*/}
                        {/*        <Image*/}
                        {/*            src={profileImage ? profileImage : '/images/edit_profile_img1.png'}*/}
                        {/*            alt="Company Logo"*/}
                        {/*            layout="fill"*/}
                        {/*            objectFit="cover"*/}
                        {/*            quality={100}*/}
                        {/*        />*/}
                        {/*    </div>*/}

                        {/*    <div className="edit_profile_item1_img_mobile">*/}
                        {/*        <Image*/}
                        {/*            src="/images/edit_profile_img_mobile.png"*/}
                        {/*            alt="Company Logo"*/}
                        {/*            layout="fill"*/}
                        {/*            objectFit="cover"*/}
                        {/*            quality={100}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*    <button className='edit_profile_img_icon'>*/}
                        {/*        <ProfileEditIcon2/>*/}
                        {/*    </button>*/}

                        {/*    <button className='edit_profile_img_icon2'>*/}
                        {/*        <ProfileEditIcon2Mobile/>*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                        <SettingsImageUploader
                            userImage={profileImage} // Display the current profile image
                            changeImage={(newImage) => {
                                console.log(newImage, 'New image file received from uploader'); // Log the file
                                setProfileImage(newImage); // Update state with the new file
                            }}
                        />

                        <div className="edit_profile_item2">
                            <div className='edit_profile_item2_input'>
                                <input
                                    type='text'
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                    placeholder='Юрий'
                                    className='edit_profile_item2_input_field'
                                />
                            </div>
                            <div className='edit_profile_item2_input'>
                                <input
                                    type='text'
                                    value={surname}
                                    onChange={(e) => {
                                        setSurName(e.target.value)
                                    }}
                                    placeholder='Абалак'
                                    className='edit_profile_item2_input_field'
                                />
                            </div>
                            <div className='edit_profile_item2_input'>
                                <input
                                    type='text'
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                    placeholder='Абалак@gmail.com'
                                    className='edit_profile_item2_input_field'
                                />
                            </div>
                            <div className="edit_profile_item2_inputs_wrapper">
                                <input
                                    type="text"

                                    className="edit_profile_item2_input_field1"
                                    value=''
                                    readOnly // Country code is non-editable
                                    placeholder="+7"
                                />
                                <input
                                    type="number"
                                    className="edit_profile_item2_input_field2"
                                    value={phoneNumber ? phoneNumber.slice(2) : ''} // Safely slice the number
                                    onChange={(e) => setPhoneNumber('+7' + e.target.value)} // Prepend "+7" on input change
                                    placeholder="000 0000 000"
                                />
                            </div>
                            <div
                                className='edit_profile_item2_input'
                                onClick={() =>
                                      {
                                          setShowEditPasswordPopup(true)
                                          disableBodyScroll()

                                      }}
                                >
                                <input
                                    type='password'
                                    // value={password}
                                    // onChange={(e) => {
                                    //     setPassword(e.target.value)
                                    // }}
                                    placeholder='****************'
                                    className='edit_profile_item2_input_field'
                                    readOnly={true}
                                />
                                <div
                                    className='edit_password_icon'

                                >
                                    <ProfileEditIcon1/>
                                </div>

                                <div
                                    className='edit_password_icon2'
                                >
                                    <ProfileEditIcon1Mobile/>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/*<div className='edit_profile_form_input'>*/}
                    {/*         <textarea*/}
                    {/*             name="" id="" cols="10" rows="6" placeholder='О себе'*/}
                    {/*             className='edit_profile_form_input_field'*/}
                    {/*             value={about}*/}
                    {/*             onChange={(e) => {*/}
                    {/*                 setAbout(e.target.value)*/}
                    {/*             }}*/}
                    {/*         ></textarea>*/}
                    {/*</div>*/}
                    <button
                        className='edit_profile_btn'
                        onClick={(e) => {
                            saveProfile(e)
                        }}
                    >
                        Сохранить

                    </button>
                </div>
            </section>
            <Footer activePage={"patient_profile"}/>

            {showEditPasswordPopup &&
                <div className={'edit_password_modal'}>
                    <div className="edit_password_modal_wrapper">
                        <button
                            className='edit_password_modal_close_btn'
                            onClick={() => {
                                setShowEditPasswordPopup(false);
                                enableBodyScroll()
                            }}
                        >
                            <CloseIcon2/>
                        </button>
                        <header className='login-wrapper_header2'>
                            <Link href={'/'} className='login-wrapper_header_link'>
                                <img
                                    src="/svg/logo.svg"
                                    alt="Company Logo"
                                />
                            </Link>
                        </header>
                        <div className='login_form'>
                            <div className='login_form_input'   id='old_password'>
                                <input
                                    type={isOldPasswordVisible ? 'text' : 'password'}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    placeholder='Старый пароль'
                                    className='login_form_input_field'
                                />
                                <button
                                    className='password_icon_btn'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        togglePasswordVisibility1();
                                    }}
                                >
                                    {isOldPasswordVisible ? <PasswordShowIcon2 /> : <PasswordCloseIcon2 />}
                                </button>
                            </div>
                            {passwordError &&
                                <p className="error_text">{passwordError}</p>
                            }
                            <div className='login_form_input'   id='new_password'>
                                <input
                                    type={isNewPasswordVisible ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder='Новый пароль'
                                    className='login_form_input_field'

                                />
                                <button
                                    className='password_icon_btn'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        togglePasswordVisibility2();
                                    }}
                                >
                                    {isNewPasswordVisible ? <PasswordShowIcon2 /> : <PasswordCloseIcon2 />}
                                </button>
                            </div>
                            {newPasswordError &&
                                <p className="error_text">{newPasswordError}</p>
                            }
                            <div className="login_form_btn_parent">
                                <button
                                    className='login_form_btn'
                                    onClick={(e) => handleChangePassword(e)}
                                >
                                    Изменить пароль
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {showFilterModal && (
                <EditFilterModal
                    isOpen={showFilterModal}
                    services={servicesData}
                    onClose={() => setShowFilterModal(false)}
                />
            )}

        </div>
    );
};

export default withAuth(PatientEditProfile);
