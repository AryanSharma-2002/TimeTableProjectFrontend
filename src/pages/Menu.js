import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import PagesHeader from "../components/Menu/PagesHeader";
import TimeSlotModal from "../components/Menu/TimeSlotModal";
const Menu = () => {
  return (
    <>
      <Box display="flex" justifyContent="center" alignItems="center" w="100%">
        <Box
          w="50%"
          h="80%"
          display="flex"
          flexWrap="wrap"
          justifyContent="space-around"
          alignItems="flex-start"
          className="btn-container"
        >
          <TimeSlotModal title="Time Slot" />
          <PagesHeader title="Add Subject" afterClick="/subject" />
          <PagesHeader title="Add Class" afterClick="/class" />
          <PagesHeader title="Add Teacher" afterClick="/teacher" />
          <PagesHeader
            title="Configure Teacher"
            afterClick="/configureTeacher"
          />
          <PagesHeader
            title="ClassWise Time Table"
            afterClick="/classTimeTable"
          />
        </Box>
      </Box>
    </>
  );
};

export default Menu;
