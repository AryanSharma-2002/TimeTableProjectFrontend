import React, { useEffect, useState } from "react";
import CommonPage from "./CommonPage";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { BASE_URL } from "../base_url";

const ClassPage = () => {
  const { fetchClassesAgain, setFetchClassesAgain, allClasses, setAllClasses } =
    ChatState();
  const [className, setClassName] = useState();
  const [loadingClassName, setLoadingClassName] = useState();
  const [loadingAllClasses, setLoadingAllClasses] = useState(false);
  const toast = useToast();

  const handleDeleteClass = async (i, className) => {
    try {
      console.log(i, className);
      const name = allClasses[i];
      const { data } = await axios.delete(`${BASE_URL}/api/class/remove`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          className: className,
        },
      });
      console.log(data);
      toast({
        title: "Deleted Successfully",
        status: "success",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      setFetchClassesAgain(!fetchClassesAgain);
    } catch (error) {
      console.log("Error: while deleting the", className, "class");
      console.log(error);
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

  const handleAddClass = async () => {
    if (!className) {
      toast({
        title: "Warning",
        description: "Please fill Class Name",
        status: "warning",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
      return;
    }

    try {
      setLoadingClassName(true);
      const { data } = await axios.post(
        `${BASE_URL}/api/class`,
        {
          className: className,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setLoadingClassName(false);
      setClassName("");
      setFetchClassesAgain(!fetchClassesAgain);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: error.message,
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      setLoadingClassName(false);
      return;
    }
  };

  const fetchAllClasses = async () => {
    try {
      setLoadingAllClasses(true);
      const { data } = await axios.get(`${BASE_URL}/api/class/`);
      const getOnlyClasses = [];
      for (let i = 0; i < data.length; i++) {
        getOnlyClasses[i] = {};
        getOnlyClasses[i].className = data[i].className;
      }
      setAllClasses(getOnlyClasses);
      setLoadingAllClasses(false);
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
      setLoadingAllClasses(false);
      return;
    }
  };

  useEffect(() => {
    fetchAllClasses();
  }, [fetchClassesAgain]);

  return (
    <>
      <CommonPage
        inputName={className}
        setInputName={setClassName}
        loading={loadingClassName}
        loadingAllContent={loadingAllClasses}
        allData={allClasses}
        handleDel={handleDeleteClass}
        handleAdd={handleAddClass}
        page="Class Name"
      />
    </>
  );
};

export default ClassPage;
