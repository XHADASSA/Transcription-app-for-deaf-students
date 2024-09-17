import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../style/Homepage.css';

function Homepage() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const startTyping = () => {
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => {
                        const span = document.getElementById(`letter-${i}`);
                        if (span) {
                            span.style.visibility = 'visible';
                            span.classList.add('animate');
                        }
                    }, i * 100); // המתנה של 300 מילישניות בין כל אות
                    setTimeout(()=>{
                        const welcomeButtons = document.getElementsByClassName("welcome-button");
                        for (let button of welcomeButtons) {
                            button.style.visibility = 'visible';
                }
                    },1050);
                }
            }, 2000); // המתן 3 שניות לפני התחלת הכתיבה
        };

        startTyping();

        return () => {};
    }, []);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const target = queryParams.get('target');
        if (target) {
            scrollToSection(target);
        }
    }, [location]);

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className="background"></div>
            <div className="page">
                <h1 className='h'>אפליקציית תמלול <br />לסטודנטים חרשים</h1>
                <span id="letter-0">w</span>
                <span id="letter-1">e</span>
                <span id="letter-2">l</span>
                <span id="letter-3">c</span>
                <span id="letter-4">o</span>
                <span id="letter-5">m</span>
                <span id="letter-6">e</span>
                <span id="letter-7">.</span>
                <span id="letter-8">.</span>
                <span id="letter-9">.</span>
                <div className="welcome-buttons">
                    <button onClick={() => navigate('/SignUp')} className="welcome-button">הרשמה</button>
                    <button onClick={() => navigate('/Connection')} className="welcome-button">התחברות</button>
                </div>
                <div className="general">
                    <div className='ref' id='about-us'></div>
                    <div className="contents">
                        <div className="contents-header">אודותינו</div>
                        <div className="content">
                            <p>אנו, מפתחי האפליקציה, מאמינים שכל סטודנט, ללא קשר למגבלותיו, זכאי לחוויית לימודים אקדמאית מלאה ושווה. מתוך חזון זה, פיתחנו את אפליקציית התמלול לסטודנטים בעלי מגבלות שמיעה. האפליקציה שלנו נועדה לספק מענה לצרכים הייחודיים של סטודנטים אלה ולאפשר להם להשתלב ולהצטיין בלימודים אקדמיים.</p>
                            <p>האפליקציה שלנו מאפשרת תמלול בזמן אמת של שיעורים והרצאות, ומעניקה לסטודנטים גישה מיידית ומלאה לתכנים הנלמדים. אנו מחויבים לשפר ולהתאים את האפליקציה באופן מתמיד, כדי להבטיח חוויית לימודים מותאמת ואיכותית.</p>
                            <p>הצוות שלנו מורכב ממומחים בתחום הטכנולוגיה, החינוך והנגישות, הפועלים יחד מתוך תחושת שליחות ורצון אמיתי לשפר את הנגישות להשכלה גבוהה עבור סטודנטים עם מגבלות שמיעה. אנו מאמינים שבעזרת האפליקציה שלנו, נוכל לפתוח דלתות חדשות ולהעניק הזדמנויות רבות יותר לסטודנטים שאפתניים בכל מקום.</p>
                            <p>תודה שאתם איתנו במסע חשוב זה להנגשת ההשכלה האקדמאית. יחד, נוכל ליצור עולם שבו כל סטודנט יוכל לומר בגאווה: </p>
                            <h2>I can do it!</h2>
                        </div>
                    </div>
                    <div className='ref'  id='development'></div>
                    <div className="contents">
                        <div className="content">
                            <p>פיתוח האפליקציה שלנו מצריך ידע בפיתון ובטכנולוגיות של מפתח Full Stack. אנו מחפשים אנשים מוכשרים ובעלי מוטיבציה עם כלים מתאימים, הרוצים להצטרף בהתנדבות למיזם ולהגשים איתנו את החזון שלנו.</p>
                            <p>אם אתם בעלי ידע וניסיון בתחום התכנות, במיוחד ב-Python ובטכנולוגיות Full Stack, ורוצים לקחת חלק בפרויקט מרתק ומשמעותי זה, נשמח לשמוע מכם. זו הזדמנות נדירה להיות חלק מצוות שפועל למען מטרה חשובה ולהשפיע באופן ישיר על חייהם של סטודנטים בעלי מגבלות שמיעה.</p>
                            <p>אנו מאמינים בכוח של הטכנולוגיה לשנות חיים, ואם גם אתם מאמינים בכך, הצטרפו אלינו במסע זה. יחד נוכל ליצור אפליקציה שתעניק נגישות שווה להשכלה אקדמאית לכולם.</p>
                            <p>לפרטים נוספים ולהצטרפות, אנא צרו קשר איתנו. נשמח לצרף אתכם לצוות המפתח ולהתקדם יחד לעבר מטרה זו.</p>
                            <button className='Contact-Development' onClick={() => navigate('/Contact')}>צור קשר</button>
                            <p>תודה מראש על תרומתכם ושיתוף הפעולה.</p>
                        </div>
                        <div className="contents-header">השתלבות בפיתוח</div>
                    </div>
                    <div className='ref' id='donations'></div>
                    <div className="contents">
                        <div className="contents-header">לתרומות</div>
                        <div className="content">
                            <h2>I can do it!</h2>
                            <p>זה משפט שצריך לומר כל אחד השואף להשתלב בלימודים אקדמיים. אנחנו, בפיתוח אפליקציית התמלול לסטודנטים בעלי מגבלות שמיעה, יוצרים את העתיד והחזון של כל אלו ששואפים להגיע לתואר אקדמאי בלי לעצור מול האבנים שבדרך.</p>
                            <p>תרומתכם תסייע לנו להמשיך לפתח, לשפר ולהנגיש את האפליקציה ליותר סטודנטים בעלי מגבלות שמיעה, ולאפשר להם לחוות חוויית לימודים אקדמאית מלאה ומותאמת לצרכיהם. יחד נוכל להפוך את החזון שלנו למציאות ולעזור לכל סטודנט להגשים את שאיפותיו האקדמיות.</p>
                            <p>אנו מודים לכם על התמיכה וההשתתפות שלכם במשימה חשובה זו. כל תרומה, קטנה כגדולה, מקרבת אותנו צעד נוסף לעבר עולם שבו השכלה אקדמאית נגישה לכולם.</p>
                            <p>תודה רבה על תרומתכם ועל ההבנה של חשיבות המשימה שלנו.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Homepage;
