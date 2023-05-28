import React, { useEffect, useState } from "react";
import CommonPage from "./CommonPage";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { BASE_URL } from "../base_url";
const SubjectPage = () => {
  const {
    fetchSubjectsAgain,
    setFetchSubjectsAgain,
    allSubjects,
    setAllSubjects,
  } = ChatState();
  console.log(fetchSubjectsAgain);
  const [subName, setSubName] = useState();
  const [loadingSubName, setLoadingSubName] = useState();
  const [loadingAllSubjects, setLoadingAllSubjects] = useState(false);

  const toast = useToast();
  const handleDeleteSubject = async (i, subjName) => {
    try {
      const { data } = axios.delete(`/api/subject/remove?name=${subjName}`);
      setFetchSubjectsAgain(!fetchSubjectsAgain);
      toast({
        title: "Deleted Successfully",
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    } catch (error) {
      console.log("Error: while deleting the", subjName, "subject");
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

  const fetchAllSubjects = async () => {
    try {
      setLoadingAllSubjects(true);
      const { data } = await axios.get(`${BASE_URL}/api/subject/`);
      const getOnlySubjects = [];
      for (let i = 0; i < data.length; i++) {
        getOnlySubjects[i] = {};
        getOnlySubjects[i].subjName = data[i].name;
      }
      setAllSubjects(getOnlySubjects);
      setLoadingAllSubjects(false);
      return;
    } catch (error) {
      console.log("error fetching all subjects", error);
      toast({
        title: "Error",
        description: error.message,
        status: "warning",
        duration: 4000,
        position: "top-left",
        isClosable: true,
      });
      setLoadingAllSubjects(false);
      return;
    }
  };

  const handleAddSubject = async () => {
    if (!subName) {
      toast({
        title: "Warning",
        description: "Please fill Subject Name",
        status: "warning",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      return;
    }

    try {
      setLoadingSubName(true);
      const { data } = await axios.post(
        `${BASE_URL}/api/subject`,
        {
          subName: subName,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setLoadingSubName(false);
      setSubName("");
      setFetchSubjectsAgain(!fetchSubjectsAgain);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.message,
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      setLoadingSubName(false);
      return;
    }
  };

  useEffect(() => {
    fetchAllSubjects();
  }, [fetchSubjectsAgain]);

  return (
    <>
      <CommonPage
        inputName={subName}
        setInputName={setSubName}
        loading={loadingSubName}
        loadingAllContent={loadingAllSubjects}
        allData={allSubjects}
        handleDel={handleDeleteSubject}
        handleAdd={handleAddSubject}
        page="Subject Name"
      />
    </>
  );
};

export default SubjectPage;
