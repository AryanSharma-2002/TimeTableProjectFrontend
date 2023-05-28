import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { DeleteIcon, Search2Icon } from "@chakra-ui/icons";
import { BASE_URL } from "../base_url";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import LoadingAllSubjects from "../components/miscellaneous/LoadingAllSubjects";
import TableRow from "../components/Menu/TableRow";
import SearchItem from "../components/miscellaneous/SearchItem";
import { getSubjId } from "../config/SubjectLogic";
import { getTeacherRefId } from "../config/TeacherLogic";

const ConfigureTeacherPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const [tid, setTid] = useState();
  const [teacherName, setTeacherName] = useState("");
  const [subjName, setSubjName] = useState("");
  const [loadingName, setLoadingName] = useState(false);
  const [loadingTids, setLoadingTids] = useState(false);
  const [searchSubjectResults, setSearchSubjectResults] = useState([]);
  const [allTids, setAllTids] = useState(); //inside the search modal show all tids when click find
  const [searchTeacherResults, setSearchTeacherResults] = useState([]);
  const {
    fetchConfTeachersAgain,
    setFetchConfTeachersAgain,
    allConfTeachers, // jo table mai data show ho rha hai
    setAllConfTeachers,
  } = ChatState();
  const searchSubjects = async (query) => {
    try {
      if (!query || query == "") {
        setSearchSubjectResults([]);
        return;
      }
      const { data } = await axios.get(
        `${BASE_URL}/api/subject/search?key=${subjName}`
      );
      const getOnlySubjects = [];
      for (let i = 0; i < data.length; i++) {
        getOnlySubjects[i] = data[i].name;
      }
      setSearchSubjectResults(getOnlySubjects);
      return;
    } catch (error) {
      console.log("Error: while searching the subjects");
      console.log(error);
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

  const fetchConfTeachers = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/confTeacher`);
      const getOnlyContent = [];
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].subjects.length; j++) {
          const obj = data[i].subjects[j];
          getOnlyContent.push({});
          let n = getOnlyContent.length;
          getOnlyContent[n - 1].tid = data[i].teacherRefId.tid;
          getOnlyContent[n - 1].teacherName = data[i].teacherRefId.name;
          getOnlyContent[n - 1].subjName = obj.name;
        }
      }
      setAllConfTeachers(getOnlyContent);
    } catch (error) {
      console.log("Error: while getting the configured teacher data");
      console.log(error);
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

  const handleAdd = async () => {
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
    try {
      setLoadingName(true);
      const id = await getSubjId(subjName);
      if (id === "") {
        toast({
          title: "Not a valid subject",
          status: "warning",
          duration: 4000,
          position: "top-left",
          isClosable: true,
        });
        return;
      }
      const teacherRefId = await getTeacherRefId(tid);
      if (teacherRefId === "") {
        toast({
          title: "Not a valid teacher id",
          status: "warning",
          duration: 4000,
          position: "top-left",
          isClosable: true,
        });
        return;
      }
      // now teacher mil gya aur uska subject toh use add krdo
      const { data } = await axios.post(
        `${BASE_URL}/api/confTeacher`,
        {
          teacherRefId: teacherRefId,
          newSubjects: [id],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSubjName("");
      setLoadingName(false);

      setFetchConfTeachersAgain(!fetchConfTeachersAgain);
    } catch (error) {
      console.log("Error: while configuring the teacher");
      console.log(error);
      setLoadingName(false);
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

  const handleSearchSubjectClick = async (searchBoxName) => {
    setSubjName(searchBoxName[0].toUpperCase() + searchBoxName.substring(1));
  };
  const handleSearchTeacherClick = async (searchBoxName) => {
    const mySentence = searchBoxName;

    // logic to capitalize each first word of teacher name
    const words = mySentence.split(" ");

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    let s = "";
    for (let i = 0; i < words.length; i++) {
      if (i != words.length - 1) {
        s += words[i] + " ";
      } else {
        s += words[i];
      }
    }
    setTeacherName(s);
  };

  const handleDel = async (i, tid, subjName) => {
    try {
      console.log("delete started");
      const id = await getSubjId(subjName);
      const teacherRefId = await getTeacherRefId(tid);
      const { data } = await axios.post(
        `${BASE_URL}/api/confTeacher/remove`,
        {
          teacherRefId: teacherRefId,
          deleteSubs: [id],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFetchConfTeachersAgain(!fetchConfTeachersAgain);
      toast({
        title: "Deleted successfully",
        status: "success",
        duration: 4000,
        position: "top-left",
        isClosable: true,
      });
      return;
    } catch (error) {
      console.log(
        "Error: while deleting the teacher",
        teacherName,
        "and subject",
        subjName
      );
      console.log(error);
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

  // iss function se pta lag rha ki teacher name ki kon kon si ids hai kyo ki ek teacher ki ek se jada tids ho skti many teachers -> same name.
  const findTid = async () => {
    if (!teacherName) {
      toast({
        title: "Please fill all fields",
        status: "warning",
        duration: 4000,
        position: "top-left",
        isClosable: true,
      });
      return;
    }
    try {
      setAllTids([]);
      setLoadingTids(true);
      const { data } = await axios.get(`${BASE_URL}/api/teacher`);
      let getAllTid = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].name === teacherName.toLowerCase()) {
          getAllTid.push(data[i].tid);
        }
      }
      setAllTids(getAllTid);
      setLoadingTids(false);
    } catch (error) {
      console.log("Error: while getting all tids by teacher name");
      console.log(error);
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

  const searchTeachers = async (query) => {
    try {
      if (!query || query == "") {
        setSearchTeacherResults([]);
        return;
      }
      const { data } = await axios.get(
        `${BASE_URL}/api/teacher/search?key=${query}`
      );
      const getOnlyTeachers = [];
      for (let i = 0; i < data.length; i++) {
        if (!getOnlyTeachers.includes(data[i].name)) {
          getOnlyTeachers.push(data[i].name);
        }
      }
      setSearchTeacherResults(getOnlyTeachers);
      return;
    } catch (error) {
      console.log("Error: while searching the teachers in modal");
      console.log(error);
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

  const handleTidClickModal = (tid) => {
    setTid(tid);
    onClose();
  };

  useEffect(() => {
    searchSubjects(subjName);
  }, [subjName]);

  useEffect(() => {
    searchTeachers(teacherName);
  }, [teacherName]);

  useEffect(() => {
    fetchConfTeachers();
  }, [fetchConfTeachersAgain]);

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
          h="40%"
          m="auto"
          display="flex"
          flexDir="row"
          justifyContent="center"
          alignItems="center"
        >
          <Box w="50%" h="100%">
            <InputGroup
              w="100%"
              m="1rem 0"
              borderColor="black"
              fontSize="1.2rem"
              fontWeight="700"
            >
              <Input
                type="Number"
                bg="white"
                placeholder="Enter Teacher Id"
                border="2px solid black"
                fontSize="1.2rem"
                fontWeight="700"
                value={tid}
                onChange={(e) => setTid(e.target.value)}
              />
              <InputRightAddon
                border="2px solid black"
                onClick={() => {
                  setTeacherName("");
                  setAllTids([]);
                  onOpen();
                }}
                children={<Search2Icon />}
              />
            </InputGroup>

            {/* the modal to search the tid of particular teacher */}
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Search Tid</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Input
                    type="text"
                    placeholder="Teacher Name"
                    w="100%"
                    bg="white"
                    border="2px solid black"
                    fontSize="1.2rem"
                    fontWeight="700"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                  />
                  <Box w="100%">
                    {searchTeacherResults?.slice(0, 2)?.map((name, i) => {
                      return (
                        <SearchItem
                          name={name}
                          handleClickFunc={() => {
                            handleSearchTeacherClick(name);
                          }}
                        />
                      );
                    })}
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={findTid}
                    isLoading={loadingTids}
                  >
                    Find
                  </Button>
                </ModalFooter>

                <Box w="80%" m="auto">
                  {allTids?.map((tid, i) => {
                    return (
                      <>
                        <SearchItem
                          name={tid}
                          handleClickFunc={() => {
                            handleTidClickModal(tid);
                          }}
                        />
                        <Divider />
                      </>
                    );
                  })}
                </Box>
              </ModalContent>
            </Modal>

            <Input
              type="text"
              display="block"
              placeholder="Subject Name"
              w="100%"
              m="2rem 0 0.5rem 0"
              bg="white"
              border="2px solid black"
              borderColor="black"
              fontSize="1.2rem"
              fontWeight="700"
              value={subjName}
              onChange={(e) => setSubjName(e.target.value)}
            />
            <Box w="100%">
              {searchSubjectResults?.slice(0, 2)?.map((name, i) => {
                return (
                  <SearchItem
                    name={name}
                    handleClickFunc={() => {
                      handleSearchSubjectClick(name);
                    }}
                  />
                );
              })}
            </Box>
          </Box>
          <Button
            colorScheme="teal"
            w="6rem"
            m="4.5rem 0 0 3rem"
            onClick={handleAdd}
            isLoading={loadingName}
            fontWeight="700"
            fontSize="1.2rem"
          >
            Add
          </Button>
        </Box>
        <Box h="60%">
          {allConfTeachers.length === 0 ? (
            <Center
              fontWeight={700}
              fontSize="1.3rem"
              color="green "
              w="100%"
              mt="1rem"
            >
              No Entries Added
            </Center>
          ) : (
            <TableRow
              arr={[
                { sno: "SNo." },
                { tid: "Teacher Id." },
                { teacherName: "Teacher Name" },
                { subjName: "Subject Name" },
                { delete: "Delete" },
              ]}
              color="red"
            />
          )}

          {allConfTeachers.map((ele, i) => {
            const tid = ele.tid;
            const teacherName = ele.teacherName;
            const subjName = ele.subjName;

            return (
              <TableRow
                key={i}
                arr={[
                  { sno: i + 1 },
                  { tid: tid },
                  { teacherName: teacherName },
                  { subjName: subjName },
                  { delete: <DeleteIcon /> },
                ]}
                handleDelete={() => {
                  handleDel(i, tid, subjName);
                }}
              />
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default ConfigureTeacherPage;
