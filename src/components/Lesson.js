import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Realm from "realm-web";
import '../style/Lesson.css'; // יש לוודא שמסלול הקובץ נכון

const REALM_APP_ID = "myrealmapp-gksbhwv";

function Lesson() {
  const navigate = useNavigate();
  const [nameLesson, setNameLesson] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");

  // Fetch teachers from MongoDB
  useEffect(() => {
    const fetchTeachers = async () => {
      const app = new Realm.App({ id: REALM_APP_ID });
      try {
        const credentials = Realm.Credentials.anonymous();
        const user = await app.logIn(credentials);
        const mongodb = app.currentUser.mongoClient("mongodb-atlas");
        const collection = mongodb.db("mydatabase").collection("teacherdata");
        const teacherData = await collection.find({});
        setTeachers(teacherData.map(teacher => teacher.TeacherName)); // Assuming `TeacherName` field exists
      } catch (error) {
        console.error("Failed to fetch teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const startLesson = () => {
    if (nameLesson && selectedTeacher) {
      navigate(`/Transcription?nameLesson=${nameLesson}&teacher=${selectedTeacher}`);
    } else {
      alert("Please enter a lesson name and select a teacher.");
    }
  };

  const addTeacher = () => {
    navigate('/DataUpdate');
  };

  return (
    <div className="container">
      <h1>בחר נתונים כדי להתחיל שיעור</h1>
      <h3>בחר שם לשיעור</h3>
      <input
        type="text"
        maxLength={30}
        value={nameLesson}
        onChange={(e) => setNameLesson(e.target.value)}
      />
      <h3>בחר מורה</h3>
      {teachers.length === 0 ? (
        <div>
          <p>אין מורים ברשימה. הוסף מורה חדש.</p>
          <button onClick={addTeacher}>הוסף מורה</button>
        </div>
      ) : (
        <div>
          <select
            value={selectedTeacher}
            onChange={(e) => setSelectedTeacher(e.target.value)}
          >
            <option value="">בחר מורה</option>
            {teachers.map((teacher, index) => (
              <option key={index} value={teacher}>{teacher}</option>
            ))}
          </select>
          <button onClick={startLesson}>התחל שיעור</button>
        </div>
      )}
      <button onClick={addTeacher} className="add-teacher-button">הוסף מורה חדש</button>
    </div>
  );
}

export default Lesson;
