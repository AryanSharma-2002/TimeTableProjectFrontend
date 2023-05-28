import {
  Box,
  Button,
  Center,
  Container,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import LoadingAllSubjects from "../components/miscellaneous/LoadingAllSubjects";
import TableRow from "../components/Menu/TableRow";
import TableRowTT from "../components/Menu/classTimeTable/TableRowTT";
import { HandleContext } from "./ClassTimeTable";

const CommonTimeTablePage = ({
  inputName,
  setInputName,
  loading,
  loadingAllContent,
  allData,
  timeSlotsRow,
  setTimeSlotsRow,
}) => {
  const { fetchClassTTAgain, setFetchClassTTAgain } = ChatState();
  const handleAddClick = () => {
    setFetchClassTTAgain(!fetchClassTTAgain);
  };
  const { handleAdd, handleDelete } = useContext(HandleContext);

  const toast = useToast();
  return (
    <>
      <Box
        w="90%"
        m="auto"
        h="100vh"
        display="flex"
        flexDir="column"
        justifyContent="space-around"
        className="subject-container"
      >
        <Box
          w="80%"
          h="30%"
          m="auto"
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Input
            type="text"
            placeholder={"Class Name"}
            w="50%"
            m="1rem"
            bg="white"
            border="2px solid black"
            borderColor="black"
            fontSize="1.2rem"
            fontWeight="700"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <Button
            colorScheme="teal"
            w="6rem"
            isLoading={loading}
            fontWeight="700"
            fontSize="1.2rem"
            onClick={handleAddClick}
          >
            Find
          </Button>
        </Box>

        <Box w="100%" h="60%" m="auto" mt="1rem">
          <>
            {<TableRow arr={timeSlotsRow} color="red" />}

            {allData.map((allSlotsInDay, i) => {
              return <TableRowTT key={i} i={i} arr={allSlotsInDay} />;
            })}
          </>
        </Box>
      </Box>
    </>
  );
};

export default CommonTimeTablePage;
