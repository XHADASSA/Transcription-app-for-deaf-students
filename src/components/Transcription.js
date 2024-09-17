import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../style/Transcription.css'; // ודא שהמסלול לקובץ CSS נכון

function Transcription() {
  const [transcription, setTranscription] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [lessonName, setLessonName] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Extract parameters from URL
    const queryParams = new URLSearchParams(location.search);
    const teacher = queryParams.get('teacher');
    const nameLesson = queryParams.get('nameLesson');

    if (teacher && nameLesson) {
      setTeacherName(teacher);
      setLessonName(nameLesson);

      // Send initial request to the server with teacher name
      const startTranscription = async () => {
        try {
          await axios.post('/api/start', { teacherName: teacher });
        } catch (error) {
          console.error("Failed to start transcription:", error);
        }
      };

      startTranscription();

      // Function to fetch transcription from the server
      const fetchTranscription = async () => {
        try {
          const response = await axios.get('/api/transcribe', {
            params: { teacherName: teacher }
          });
          setTranscription(response.data.transcription);
        } catch (error) {
          console.error("Failed to fetch transcription:", error);
        }
      };

      // Fetch transcription immediately
      fetchTranscription();

      // Set interval to fetch transcription every 10 seconds
      const interval = setInterval(fetchTranscription, 10000);

      return () => clearInterval(interval);
    }
  }, [location.search]);

  return (
    <div className="container">
      <h1>{lessonName}</h1>
      <h2>מורה: {teacherName}</h2>
      <div className="transcription-box">
        {transcription}
      </div>
    </div>
  );
}

export default Transcription;
