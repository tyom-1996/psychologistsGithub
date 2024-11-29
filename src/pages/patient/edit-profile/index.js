import Image from "next/image";
import '../../../assets/css/edit-profile.css';
import { useEffect, useState } from "react";
import withOutAuth from '../../../components/withAuth';
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfileEditIcon1 from "@/assets/icons/profileEditIcon1";
import ProfileEditIcon1Mobile from "@/assets/icons/profileEditIcon1Mobile";
import ProfileEditIcon2Mobile from "@/assets/icons/profileEditIcon2Mobile";
import ProfileEditIcon2 from "@/assets/icons/profileEditIcon2";


const PatientEditProfile = () => {

    const [activeTab, setActiveTab] = useState("about");
    const [name, setName] = useState('');
    const [surname, setSurName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('+7');

    const router = useRouter();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {

    }, []);

    return (
        <div className={'main_wrapper'} id={'patient-edit-profile'}>
            <Header activePage={"patient_profile"} isLogged={true}/>
            <section className="edit_profile">
                <div className="edit_profile_wrapper">
                    <div className='edit_profile_title_line_wrapper'>
                        <h1 className='edit_profile_title'>Редактировать Профиль</h1>
                        <div className="edit_profile_line"></div>
                    </div>
                    <div className='edit_profile_items_wrapper'>
                        <div className="edit_profile_item1">
                            <div className="edit_profile_item1_img">
                                <Image
                                    src="/images/edit_profile_img1.png"
                                    alt="Company Logo"
                                    layout="fill"
                                    objectFit="cover"
                                    quality={100}
                                />
                            </div>

                            <div className="edit_profile_item1_img_mobile">
                                <Image
                                    src="/images/edit_profile_img_mobile.png"
                                    alt="Company Logo"
                                    layout="fill"
                                    objectFit="cover"
                                    quality={100}
                                />
                            </div>
                            <button className='edit_profile_img_icon'>
                                <ProfileEditIcon2/>
                            </button>

                            <button className='edit_profile_img_icon2'>
                                <ProfileEditIcon2Mobile/>
                            </button>
                        </div>
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
                                    value={phoneNumber.slice(2)} // Display only the phone number part
                                    onChange={(e) => setPhoneNumber('+7' + e.target.value)} // Prepend "+7" on input change
                                    placeholder="000 0000 000"
                                />
                            </div>
                            <div className='edit_profile_item2_input'>
                                <input
                                    type='password'
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                    placeholder='****************'
                                    className='edit_profile_item2_input_field'
                                />
                                <button className='edit_password_icon'>
                                    <ProfileEditIcon1/>
                                </button>
                                <button className='edit_password_icon2'>
                                    <ProfileEditIcon1Mobile/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='edit_profile_form_input'>
                             <textarea
                                 name="" id="" cols="10" rows="6" placeholder='Письмо'
                                 className='edit_profile_form_input_field'
                             ></textarea>
                    </div>
                    <button className='edit_profile_btn'>
                        Сохранить
                    </button>
                </div>
            </section>

            <Footer activePage={"patient_profile"}/>

        </div>
    );
};

export default PatientEditProfile;
