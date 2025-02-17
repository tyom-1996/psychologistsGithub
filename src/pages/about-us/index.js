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
                        <img
                            src="/svg/logo.svg"
                            alt="Company Logo"
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
                            <img
                                src="/svg/logo.svg"
                                alt="Company Logo"
                            />
                        </div>

                        <p className='about_us_single_item2_info'>
                            В современном мире многие представители сильного пола не уделяют достаточного внимания
                            своему психологическому состоянию. Существовали, и существуют до сих пор стереотипы,
                            согласно которым работа с психологом – это проявление слабости. Мы, совместно с нашими
                            специалистами, призваны развенчать подобные мифы. Мы убеждены, что только человек,
                            обладающий внутренней силой, способен обратиться за помощью.
                        </p>
                        <p className='about_us_single_item2_info'>
                            Когда же мужчине может понадобиться помощь психолога?
                            Совершенно в любой жизненной ситуации. У Вас возникло недопонимание с вашей второй
                            половиной? Вы сталкиваетесь с трудностями в рабочем процессе? Вы не можете найти общий язык
                            с начальством или коллегами? У Вас возникают разногласия с родителями, детьми или друзьями?
                            Или же Вы просто хотите с кем-то поговорить? С этими и другими проблемами Вам помогут
                            разобраться наши специалисты.
                        </p>
                        <p className='about_us_single_item2_info'>
                            Почему именно мы?
                            Men’s Psychology - твой путь к самосовершенствованию!
                            Сервис предложит платформу, объединяющую онлайн-консультации с психологами, тренинги,
                            профессиональные курсы саморазвития и поддержку сообщества мужчин, стремящихся к гармонии и
                            уверенности в себе.
                            Мы безгранично ценим женщин. Но никто не поймёт мужчину, как другой мужчина. Мы помогаем
                            раскрыть потенциал и достигать успеха в любой сфере жизни, сохраняя внутреннее равновесие и
                            эмоциональное благополучие. У нас работают преимущественно молодые специалисты, с которыми
                            Вам будет очень легко найти общий язык.
                            Ну и самое главное. Разобраться в себе и понять окружающих хочет каждый человек, но также
                            очень важно решить ту задачу, с которой пришёл клиент. Наша позиция заключается в том, что
                            консультации должны приносить не только психологический комфорт, но и быть направлены на
                            практическое применение в жизни. Наш основной принцип – на любую задачу найдётся своё
                            решение.
                            Men’s Psychology – люди, которые поймут.»
                        </p>
                    </div>
                </div>
            </section>
            <Footer activePage={"about_us"}/>

        </div>
    );
};

export default AboutUs;
