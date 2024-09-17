import './AllHeader.css';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from './logo.png';

function AllHeader() {
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleNavigation = (path, id) => {
        if (location.pathname !== '/') {
            // נווט לדף הבית עם מזהה היעד כפרמטר
            navigate(`/?target=${id}`);
        } 
        // גלול למיקום המבוקש בדף הבית
        scrollToSection(id);
    };

    return (
        <div className='header'>
            <button className='button-header' onClick={() => handleNavigation('/About', 'about-us')}>אודותינו</button>
            <button className='button-header' onClick={() => handleNavigation('/Donations', 'donations')}>לתרומות</button>
            <button className='button-header' onClick={() => handleNavigation('/Development', 'development')}>השתלבות בפיתוח</button>
            <img src={logo} alt="logo" className="header-logo" onClick={() => {navigate('/'); window.location.reload(); }}/>
        </div>
    );
}

export default AllHeader;
