export function handlePasswordSubmit(password,navigate) {
  //בדיקה במסד נתונים והחזרת שם הסטודנט
    if (password === '123456789') {
      navigate(`/Lesson`)
    } else {
      alert("No access permission");
    }
  }
