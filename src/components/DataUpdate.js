import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Realm from "realm-web";
import '../style/DataUpdate.css';

const REALM_APP_ID = "myrealmapp-gksbhwv"; 

function DataUpdate() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [audioBlob, setAudioBlob] = useState(null);

    const recording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                const audioChunks = [];

                mediaRecorder.ondataavailable = event => {
                    audioChunks.push(event.data);
                };

                mediaRecorder.onstop = () => {
                    const blob = new Blob(audioChunks, { type: 'audio/wav' });
                    setAudioBlob(blob);
                };

                mediaRecorder.start();

                setTimeout(() => {
                    mediaRecorder.stop();
                }, 10000); // הקלטה למשך 10 שניות
            })
            .catch(error => {
                console.error("Error accessing microphone:", error);
            });
    };

    const updateData = async () => {
        if (!name || !audioBlob) {
            alert("Please enter a name and record audio.");
            return;
        }

        const app = new Realm.App({ id: REALM_APP_ID });
        try {
            // התחברות אנונימית (או כל שיטת אימות אחרת שהגדרת ב-Realm)
            const credentials = Realm.Credentials.anonymous();
            const user = await app.logIn(credentials);

            // גישה למסד הנתונים
            const mongodb = app.currentUser.mongoClient("mongodb-atlas");
            const collection = mongodb.db("mydatabase").collection("teacherdata");

            // יצירת קובץ הקלטה לקריאה כ-Buffer
            const reader = new FileReader();
            reader.readAsArrayBuffer(audioBlob);
            reader.onloadend = async () => {
                const audioBuffer = reader.result;

                // הוספת נתוני מורה חדשים
                await collection.insertOne({ TeacherName: name, Audio: audioBuffer });

                // ניווט לדף אחר (לדוגמה: Lesson)
                navigate(`/Lesson`);
            };
        } catch (error) {
            console.error("Failed to update data:", error);
        }
    };

    return (
        <div className="container">
            <h1>Update Data</h1>
            <h2>הכנס שם מורה</h2>
            <input 
                type="text" 
                maxLength={50} 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter teacher's name" 
            />
            <button onClick={recording}>הקלט מורה</button>
            <button onClick={updateData}>שמור מורה</button>
            {audioBlob && (
                <div>
                    <h3>הקשב להקלטה</h3>
                    <audio controls src={URL.createObjectURL(audioBlob)}></audio>
                </div>
            )}
        </div>
    );
}

export default DataUpdate;
