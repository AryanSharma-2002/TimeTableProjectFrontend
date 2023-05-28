import {
  Box,
  Button,
  Text,
  useDisclosure,
  useStatStyles,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import ModalBodyOnAdd from "./ModalBodyOnAdd";
import OptionsInCell from "../OptionsInCell";
import { HandleContext } from "../../../pages/ClassTimeTable";

const TableCellTT = ({ contentObj, row, col }) => {
  const { handleAdd } = useContext(HandleContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [tid, setTid] = useState();
  const [subjName, setSubjName] = useState();
  const [loadingAdd, setLoadingAdd] = useState(false);
  return (
    <>
      {/* <div className="container-cell"> */}
      <Box
        border={"2px solid black"}
        className="table-cell"
        display="flex"
        flexDir="column"
        // height="200px"
        height="170px"
        justifyContent="center"
        p="0.2rem"
      >
        <span className="menu-btn-container">
          {Object.keys(contentObj).includes("dayName") === false ? (
            <OptionsInCell row={row} col={col} />
          ) : (
            ""
          )}
        </span>
        {Object.keys(contentObj).map((key, i) => {
          return (
            <>
              <Text
                mt="0.3rem"
                mb="0.1rem"
                w="100%"
                textAlign="center"
                //   border="2px solid red"
                key={i}
                fontWeight="700"
                fontSize="1.1rem"
                margin="auto"
                textTransform="capitalize"
              >
                {key === "dayName" ? <span>{contentObj[key]}</span> : ""}
                {key === "addIcon" ? (
                  <span onClick={onOpen} style={{ margin: "auto" }}>
                    {contentObj[key]}
                  </span>
                ) : (
                  ""
                )}
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Add Teacher Id And Subject Name</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <ModalBodyOnAdd
                        tid={tid}
                        setTid={setTid}
                        subjName={subjName}
                        setSubjName={setSubjName}
                      />
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button
                        variant="ghost"
                        isLoading={loadingAdd}
                        onClick={() => {
                          handleAdd(
                            row,
                            col,
                            parseInt(tid),
                            subjName,
                            onClose,
                            setLoadingAdd
                          );
                        }}
                      >
                        Add
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                {key === "tid" ? (
                  <span style={{ marginRight: "10px", color: "#F4B52E" }}>
                    Tid {contentObj[key]}
                  </span>
                ) : (
                  ""
                )}
                {key === "teacherName" ? (
                  <span style={{ color: "darkmagenta" }}>
                    {contentObj[key]}
                  </span>
                ) : (
                  ""
                )}
                {key === "subjectName" ? (
                  <span style={{ color: "#ff006e" }}>{contentObj[key]}</span>
                ) : (
                  ""
                )}
              </Text>
            </>
          );
        })}
      </Box>
      {/* </div> */}
    </>
  );
};

export default TableCellTT;
