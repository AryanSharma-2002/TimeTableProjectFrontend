import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ChatState } from "./Context/ChatProvider";
import Menu from "./pages/Menu";
import SubjectPage from "./pages/SubjectPage";
import ClassPage from "./pages/ClassPage";
import TeacherPage from "./pages/TeacherPage";
import ConfigureTeacherPage from "./pages/ConfigureTeacherPage";
import ClassTimeTable from "./pages/ClassTimeTable.js";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Menu />}></Route>
          <Route path="/subject" element={<SubjectPage />}></Route>
          <Route path="/class" element={<ClassPage />}></Route>
          <Route path="/teacher" element={<TeacherPage />}></Route>
          <Route
            path="/configureTeacher"
            element={<ConfigureTeacherPage />}
          ></Route>
          <Route path="/classTimeTable" element={<ClassTimeTable />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
