import React, { useEffect, useState } from "react";
import CommonPage from "./CommonPage";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { BASE_URL } from "../base_url";
const TeacherPage = () => {
  const {
    fetchTeachersAgain,
    setFetchTeachersAgain,
    allTeachers,
    setAllTeachers,
  } = ChatState();
  const [teacherName, setTeacherName] = useState();
  const [loadingTeacherName, setLoadingTeacherName] = useState();
  const [loadingAllTeachers, setLoadingAllTeachers] = useState(false);

  const toast = useToast();
  const handleDeleteTeacher = async (i, tid) => {
    try {
      const { data } = axios.post(
        `${BASE_URL}/api/teacher/remove`,
        {
          tid: tid,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast({
        title: "Deleted successfully",
        status: "success",
        duration: 4000,
        position: "top-left",
        isClosable: true,
      });
      setFetchTeachersAgain(!fetchTeachersAgain);
    } catch (error) {
      console.log("Error: while deleting the", tid, "Teacher");
      toast({
        title: "Error",
        description: error.message,
        status: "warning",
        duration: 4000,
        position: "top-left",
        isClosable: true,
      });
    }
  };

  const fetchAllTeachers = async () => {
    try {
      setLoadingAllTeachers(true);
      const { data } = await axios.get(`${BASE_URL}/api/teacher`);
      const getOnlyTeachers = [];
      for (let i = 0; i < data.length; i++) {
        getOnlyTeachers[i] = {};
        getOnlyTeachers[i].tid = data[i].tid;
        getOnlyTeachers[i].teacherName = data[i].name;
      }
      setAllTeachers(getOnlyTeachers);
      setLoadingAllTeachers(false);
      return;
    } catch (error) {
      console.log("error fetching all Teachers", error);
      toast({
        title: "Error",
        description: error.message,
        status: "warning",
        duration: 4000,
        position: "top-left",
        isClosable: true,
      });
      setLoadingAllTeachers(false);
      return;
    }
  };

  const handleAddTeacher = async () => {
    if (!teacherName) {
      toast({
        title: "Warning",
        description: "Please fill Teacher Name",
        status: "warning",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      return;
    }

    try {
      setLoadingTeacherName(true);
      const { data } = await axios.post(
        `${BASE_URL}/api/teacher`,
        {
          name: teacherName,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setLoadingTeacherName(false);
      setTeacherName("");
      setFetchTeachersAgain(!fetchTeachersAgain);
      toast({
        title: "Added successfully",
        status: "success",
        duration: 4000,
        position: "top-left",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.message,
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      setLoadingTeacherName(false);
      return;
    }
  };

  useEffect(() => {
    fetchAllTeachers();
  }, [fetchTeachersAgain]);

  return (
    <>
      <CommonPage
        inputName={teacherName}
        setInputName={setTeacherName}
        loading={loadingTeacherName}
        loadingAllContent={loadingAllTeachers}
        allData={allTeachers}
        handleDel={handleDeleteTeacher}
        handleAdd={handleAddTeacher}
        page="Teacher Name"
      />
    </>
  );
};

export default TeacherPage;
