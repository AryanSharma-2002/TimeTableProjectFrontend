import React, { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
const chatContext = createContext();

export const ChatState = () => {
  return useContext(chatContext);
};

const ChatProvider = ({ children }) => {
  const [fetchSubjectsAgain, setFetchSubjectsAgain] = useState(false);
  const [fetchClassesAgain, setFetchClassesAgain] = useState(false);
  const [fetchTeachersAgain, setFetchTeachersAgain] = useState(false);
  const [fetchConfTeachersAgain, setFetchConfTeachersAgain] = useState(false);
  const [fetchClassTTAgain, setFetchClassTTAgain] = useState(false);
  const [allSubjects, setAllSubjects] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [allConfTeachers, setAllConfTeachers] = useState([]);
  const [allClassTT, setAllClassTT] = useState([]);

  const [allTimeSlots, setAllTimeSlots] = useState([]);
  const [breakTime, setBreakTime] = useState([]);
  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   setUser(userInfo);
  //   if (!userInfo) {
  //     navigate("/");
  //   }
  // }, [navigate]);
  return (
    <>
      <chatContext.Provider
        value={{
          fetchSubjectsAgain,
          setFetchSubjectsAgain,
          fetchClassesAgain,
          setFetchClassesAgain,
          allSubjects,
          setAllSubjects,
          allClasses,
          setAllClasses,
          fetchConfTeachersAgain,
          setFetchConfTeachersAgain,
          allConfTeachers,
          setAllConfTeachers,
          fetchTeachersAgain,
          setFetchTeachersAgain,
          allTeachers,
          setAllTeachers,
          fetchClassTTAgain,
          setFetchClassTTAgain,
          allClassTT,
          setAllClassTT,
          allTimeSlots,
          setAllTimeSlots,
          breakTime,
          setBreakTime,
        }}
      >
        {children}
      </chatContext.Provider>
    </>
  );
};

export default ChatProvider;
