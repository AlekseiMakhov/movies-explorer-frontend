import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';
import './Main.css';

const Main = ({ 
    isMobile, 
    isTablet, 
    openMenu, 
    loggedIn 
}) => {

    return (
        <>
            <Header 
                isMobile={isMobile} 
                isTablet={isTablet} 
                openMenu={openMenu} 
                loggedIn={loggedIn} 
            />
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Footer />
        </>
    )
}

export default Main;