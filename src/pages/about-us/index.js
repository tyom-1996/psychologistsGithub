import Image from "next/image";
import '../../assets/css/about_us.css';
import { useEffect, useState } from "react";
import withOutAuth from '../../components/withAuth';
import { useRouter } from "next/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DropDownIcon from "@/assets/icons/dropdownIcon";


const AboutUs = () => {

    const [showPaySuccessPopup, setShowPaySuccessPopup] = useState(false);


    const router = useRouter();

    useEffect(() => {

    }, []);

    const handleNavigateToHome = () => {
        router.push('/');
    };



    return (
        <div className={'main_wrapper'} id={'about-us'}>
            <Header activePage={"about_us"} />
            <section className="about_us_single">
                <div className="about_us_single_wrapper">
                    <div
                        className="about_us_single_item1"
                        onClick={() => {
                            handleNavigateToHome()
                        }}
                    >
                        <Image
                            src="/svg/logo.svg"
                            alt="Company Logo"
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                        />
                    </div>
                    <div className="about_us_single_item2">
                        <h1 className='about_us_single_item2_title'>О Нас</h1>
                        <div
                            className="about_us_single_item1_mobile"
                            onClick={() => {
                                handleNavigateToHome()
                            }}
                        >
                            <Image
                                src="/svg/logo.svg"
                                alt="Company Logo"
                                layout="fill"
                                objectFit="cover"
                                quality={100}
                            />
                        </div>
                        <p className='about_us_single_item2_info'>
                            Lorem Ipsum is simply dummy text of the printing
                            and typesetting industry. Lorem Ipsum has Lorem Ipsum is simply dummy text of the printing
                            and typesetting industry. Lorem Ipsum has
                        </p>
                        <p className='about_us_single_item2_info'>
                            Lorem Ipsum is simply dummy text of the printing
                            and typesetting industry. Lorem Ipsum has Lorem Ipsum is simply dummy text of the printing
                            and typesetting industry. Lorem Ipsum has

                        </p>
                        <p className='about_us_single_item2_info'>
                            Lorem Ipsum is simply dummy text of the printing
                            and typesetting industry. Lorem Ipsum has Lorem Ipsum is simply dummy text of the printing
                            and typesetting industry. Lorem Ipsum has
                        </p>
                    </div>
                </div>
            </section>
            <Footer activePage={"about_us"}/>

        </div>
    );
};

export default AboutUs;
