import React, { createContext, useEffect, useState } from "react";
import CommonPage from "./CommonPage";
import { IconButton, useToast } from "@chakra-ui/react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import CommonTimeTablePage from "./CommonTimeTablePage";
import { getClassId } from "../config/ClassLogic";
import { getSubjId } from "../config/SubjectLogic";
import { AddIcon } from "@chakra-ui/icons";
import { getTimeSlotIdByStartTime } from "../config/TimeSlotLogic";
import { getConfigTeacherId } from "../config/ConfigTeacher";
import { BASE_URL } from "../base_url";
const HandleContext = createContext();

const ClassTimeTable = () => {
  const {
    fetchClassTTAgain,
    setFetchClassTTAgain,
    allClassTT,
    setAllClassTT,
    // allTimeSlots,
    // setAllTimeSlots,
    breakTime,
    setBreakTime,
  } = ChatState();
  const [className, setClassName] = useState("");
  const [loadingclassName, setLoadingClassName] = useState();
  const [loadingAllClassTT, setLoadingAllClassTT] = useState(false);
  const [timeSlotsRow, setTimeSlotsRow] = useState([]);
  const [allTimeSlots, setAllTimeSlots] = useState([]);

  const allDays = ["mon", "tue", "wed", "thu", "fri", "sat"];
  // array of array of objects
  const toast = useToast();

  const handleAddCell = async (i, j, tid, subjName, onClose, setLoadingAdd) => {
    // here i and j is i is the index of the row which is selected that is allDays[i] day is selected and j is the time slot which is being selected that means timeSlotsRow[j] wala time slot is selected bas ab inn dono ki id lao aur add wali request mardo
    console.log("start");
    if (!tid || !subjName) {
      toast({
        title: "Please fill all fields",
        status: "warning",
        duration: 4000,
        position: "top-left",
        isClosable: true,
      });
      return;
    }
    setLoadingAdd(true);
    const dayName = allDays[i];
    const classId = await getClassId(className);
    const tsStart = timeSlotsRow[j].startTime;
    const tsId = await getTimeSlotIdByStartTime(tsStart);
    const subjId = await getSubjId(subjName);
    const teacherId = await getConfigTeacherId(tid);

    console.log(teacherId, subjId, classId);
    try {
      if (teacherId === "" || subjId === "") {
        throw new Error("Information not valid");
      }
      const { data } = await axios.post(
        `${BASE_URL}/api/classTimeTable`,
        {
          classId: classId,
          dayName: dayName,
          tsId: tsId,
          teacherId: teacherId,
          subjectId: subjId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Data->", data);
      setFetchClassTTAgain(!fetchClassTTAgain);
      setLoadingAdd(false);
      toast({
        title: "Added successfully",
        status: "success",
        duration: 4000,
        position: "top-left",
        isClosable: true,
      });
      onClose();
    } catch (error) {
      if (error.message === "Information not valid") {
        toast({
          title: "Error: Adding Period",
          description: error.message,
          status: "warning",
          duration: 4000,
          position: "top-left",
          isClosable: true,
        });
      } else {
        toast({
          title: "Error: Adding Period",
          description: error.response.data,
          status: "warning",
          duration: 4000,
          position: "top-left",
          isClosable: true,
        });
      }
      setLoadingAdd(false);

      return;
    }
  };

  const handleDeleteCell = async (i, j) => {
    console.log("deletion started");
    const dayName = allDays[i];
    const classId = await getClassId(className);
    const tsStart = timeSlotsRow[j].startTime;
    const tsId = await getTimeSlotIdByStartTime(tsStart);

    try {
      const { data } = await axios.delete(
        `${BASE_URL}/api/classTimeTable/removeTS`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            classId: classId,
            dayName: dayName,
            tsId: tsId,
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
      setFetchClassTTAgain(!fetchClassTTAgain);
      return;
    } catch (error) {
      toast({
        title: "Error: Deleting the Period",
        status: "warning",
        duration: 4000,
        position: "top-left",
        isClosable: true,
      });
      return;
    }
  };

  const getSlotsOfSpecificDay = async (day, classId) => {
    const { data } = await axios.post(`${BASE_URL}/api/classTimeTable/getTS`, {
      classId: classId,
      dayName: day,
    });
    const entries = data.entries;
    const existedTimeSlots = data.timeSlotsStartTime;
    const timeSlotsOfDay = [];
    timeSlotsOfDay.push({
      dayName: day,
    });
    let j = 0;
    for (let i = 0; i < allTimeSlots.length; i++) {
      if (allTimeSlots[i] === existedTimeSlots[j]) {
        timeSlotsOfDay.push(entries[j]);
        j++;
      } else {
        timeSlotsOfDay.push({
          addIcon: (
            <IconButton aria-label="Add to friends" icon={<AddIcon />} />
          ),
        });
      }
    }
    return timeSlotsOfDay;
  };

  const fetchAllClassTT = async () => {
    try {
      console.log("fetching all class time table data");
      setLoadingAllClassTT(true);
      if (className === "") {
        return;
      }
      const classId = await getClassId(className);
      if (classId === "") {
        toast({
          title: "class not existed",
          status: "warning",
          duration: 4000,
          position: "top-left",
          isClosable: true,
        });
        return;
      }
      const allTimeTableDays = await Promise.all(
        allDays.map(async (day, k) => {
          const result = await getSlotsOfSpecificDay(day, classId);
          return result;
        })
      );
      console.log("allData -> ", allTimeTableDays);
      setAllClassTT(allTimeTableDays);
      setLoadingAllClassTT(false);
      return;
    } catch (error) {
      console.log("error fetching all days data in time table", error);
      toast({
        title: "Error",
        description: error.message,
        status: "warning",
        duration: 4000,
        position: "top-left",
        isClosable: true,
      });
      setLoadingAllClassTT(false);
      return;
    }
  };

  const setTimeRows = () => {
    const arr = [];
    for (let i = 0; i < allTimeSlots.length; i++) {
      const startTime = allTimeSlots[i];
      arr.push({ startTime: startTime });
    }
    setTimeSlotsRow(["", ...arr]);
  };

  const getAllTimeSlots = async () => {
    try {
      // setAllTimeSlots([]);
      const { data } = await axios.get(`${BASE_URL}/api/timeSlot`);
      const arr = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (element.isBreak === "true") {
          setBreakTime(parseInt(element.start));
        }
        arr.push(parseInt(element.start));
      }
      arr.sort(function (a, b) {
        return a - b;
      });
      setAllTimeSlots(arr);
    } catch (error) {
      console.log("error fetching all registered time slots", error);
      toast({
        title: "Error",
        description: error.message,
        status: "warning",
        duration: 4000,
        position: "top-left",
        isClosable: true,
      });
      return;
    }
  };
  useEffect(() => {
    setTimeRows();
  }, [allTimeSlots]);
  useEffect(() => {
    fetchAllClassTT();
  }, [fetchClassTTAgain]);

  const helper = async () => {
    await getAllTimeSlots();
    // setTimeRows();
  };
  useEffect(() => {
    helper();
  }, []);
  return (
    <>
      <HandleContext.Provider
        value={{ handleAdd: handleAddCell, handleDelete: handleDeleteCell }}
      >
        <CommonTimeTablePage
          inputName={className}
          setInputName={setClassName}
          loading={loadingclassName}
          loadingAllContent={loadingAllClassTT}
          allData={allClassTT}
          timeSlotsRow={timeSlotsRow}
          setTimeSlotsRow={setTimeSlotsRow}
        />
      </HandleContext.Provider>
    </>
  );
};
export default ClassTimeTable;
export { HandleContext };
