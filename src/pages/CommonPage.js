import {
  Box,
  Button,
  Center,
  Container,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { BASE_URL } from "../base_url";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import LoadingAllSubjects from "../components/miscellaneous/LoadingAllSubjects";
import TableRow from "../components/Menu/TableRow";

// this is the common page of teacher page,subject page, classPage
const CommonPage = ({
  inputName,
  setInputName,
  loading,
  loadingAllContent,
  allData,
  handleAdd,
  handleDel,
  page,
}) => {
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
            placeholder={page}
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
            onClick={handleAdd}
            isLoading={loading}
            fontWeight="700"
            fontSize="1.2rem"
          >
            Add
          </Button>
        </Box>

        <Box w="80%" h="60%" m="auto" mt="1rem">
          {/* {loadingAllContent ? (
            <LoadingAllSubjects />
          ) : ( */}
          <>
            {allData.length === 0 ? (
              <Center
                fontWeight={700}
                fontSize="1.3rem"
                color="green "
                w="100%"
                mt="1rem"
              >
                No Entries Added
              </Center>
            ) : page === "Teacher Name" ? (
              <TableRow
                arr={[
                  { tid: "Teacher Id" },
                  { name: page },
                  { delete: "Delete" },
                ]}
                color="red"
              />
            ) : (
              <TableRow
                arr={[{ sno: "SNo." }, { name: page }, { delete: "Delete" }]}
                color="red"
              />
            )}

            {/* {allData.map((ele, i) => {
              const contentKey = Object.keys(ele)[0];
              return (
                <TableRow
                  key={i}
                  arr={[
                    { sno: i + 1 },
                    { name: ele[contentKey] },
                    { delete: <DeleteIcon /> },
                  ]}
                  handleDelete={() => {
                    handleDel(i, ele[contentKey]);
                  }}
                />
              );
            })} */}
            {page === "Teacher Name"
              ? allData.map((ele, i) => {
                  const tidKey = Object.keys(ele)[0];
                  const contentKey = Object.keys(ele)[1];
                  return (
                    <TableRow
                      key={i}
                      arr={[
                        { sno: ele[tidKey] },
                        { name: ele[contentKey] },
                        { delete: <DeleteIcon /> },
                      ]}
                      handleDelete={() => {
                        handleDel(i, ele[tidKey]);
                      }}
                    />
                  );
                })
              : allData.map((ele, i) => {
                  const contentKey = Object.keys(ele)[0];
                  return (
                    <TableRow
                      key={i}
                      arr={[
                        { sno: i + 1 },
                        { name: ele[contentKey] },
                        { delete: <DeleteIcon /> },
                      ]}
                      handleDelete={() => {
                        handleDel(i, ele[contentKey]);
                      }}
                    />
                  );
                })}
          </>
          {/* )} */}
        </Box>
      </Box>
    </>
  );
};

export default CommonPage;
