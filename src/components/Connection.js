import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Realm from "realm-web";
import '../style/Connection.css'; // יש לוודא שמסלול הקובץ נכון

const REALM_APP_ID = "myrealmapp-gksbhwv"; // החליפי ב-App ID שלך

function Connection() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordSubmit = async () => {
        try {
            // התחברות ל- Realm
            const app = new Realm.App({ id: REALM_APP_ID });
            const credentials = Realm.Credentials.anonymous();
            const user = await app.logIn(credentials);
            const mongodb = app.currentUser.mongoClient("mongodb-atlas");
            const collection = mongodb.db("mydatabase").collection("UserName");

            // חיפוש המשתמש במסד הנתונים
            const userRecord = await collection.findOne({ Username: username });

            if (userRecord && userRecord.Password === password) {
                navigate('/Lesson');
            } else {
                setError('Invalid username or password. Please try again.');
            }
        } catch (error) {
            console.error('Error checking credentials:', error);
            setError('An error occurred. Please try again.');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handlePasswordSubmit();
        }
    };

    return (
        <div className="container">
            <h2>Enter username and password</h2>
            <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Username"
                maxLength={50}
            />
            <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                onKeyUp={handleKeyDown}
                placeholder="Password"
                maxLength={30}
            />
            <button onClick={handlePasswordSubmit}>Log In</button>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Connection;
