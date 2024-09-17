import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Realm from "realm-web";
import '../style/SignUp.css'; 
import google from './google.jpg';

const REALM_APP_ID = "myrealmapp-gksbhwv"; 

function enter(username, password, navigate) {
    const app = new Realm.App({ id: REALM_APP_ID });

    async function updateDatabase() {
        try {
            // התחברות אנונימית
            const credentials = Realm.Credentials.anonymous();
            const user = await app.logIn(credentials);
            console.log("User logged in:", user);
            
            // גישה למסד הנתונים
            const mongodb = app.currentUser.mongoClient("mongodb-atlas");
            const collection = mongodb.db("mydatabase").collection("UserName");
            
            // הוספת משתמש חדש
            await collection.insertOne({ Username: username, Password: password });
            console.log("sucsses uptate to database");
            
            // ניווט לדף השיעור
            navigate(`/Lesson`);
        } catch (error) {
            console.error("Failed to insert data:", error);
            prompt("fjskrgashfjkdghk");
        }
    }
    updateDatabase();
}

function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mail, setMail] = useState("");
    const [city, setCity] = useState("");

    return (
        <div className="container">
            <h1>הרשמה</h1>
            <form className='signup'>
                <div className='Sign-up-with-Google' onClick={() => { window.location.href = 'http://localhost:3000' }}>
                    <img src={google} alt="google-logo" className="google-logo"></img>
                    <p className='header-Sign-up-with-Google'>התחברות באמצעות גוגל</p>
                </div>
                <div className="input-group">
                    <div>
                        <label aria-label="password" for="password"> סיסמא</label>
                        <br/>
                        <input id="password" name="password" type="password" maxLength={30} value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label aria-label="username" for="username">שם משתמש</label>
                        <input id="username" name="username" type="text" maxLength={50} value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                </div>
                <div className="input-group">
                    <div>
                        <label aria-label="city" for="city">עיר מגורים</label>
                        <input id="city" name="city" type="text" maxLength={50} value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div>
                        <label aria-label="mail" for="mail">כתובת מייל</label>
                        <input id="mail" name="mail" type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
                    </div>
                </div>
                <div className="late-container">
                    <button className="late" type="button" onClick={() => enter(username, password, navigate)}>הרשמה</button>
                </div>
                <p className='Connection' onClick={() => navigate('/Connection')}>התחברות</p>
            </form>
        </div>
    );
}

export default SignUp;
