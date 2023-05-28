import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Box,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import axios from "axios";
import { BASE_URL } from "../../base_url";
const TimeSlotModal = ({ title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [breakTime, setBreakTime] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleSave = async (e) => {
    // agar use click kre toh start time se end time tak loop lge aur time slots add ho jaye database mai 1 ghante ke aur break time par isBreak = true bhejna
    if (!startTime || !endTime || !breakTime) {
      toast({
        title: "Warning",
        description: "Please fill all fields.",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    let start = parseInt(startTime);
    let end = parseInt(endTime);
    let breakStart = parseInt(breakTime);
    let isBreak = false;
    console.log(start, end);
    for (let i = start; i < end; i++) {
      try {
        if (i === breakStart) {
          isBreak = true;
        }
        const { data } = await axios.post(
          `${BASE_URL}/api/timeSlot`,
          {
            start: i + ":00",
            finish: i + 1 + ":00",
            isBreak: isBreak,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(data);
        isBreak = false;
        setLoading(false);
        onClose();
      } catch (error) {
        console.log(error);
        toast({
          title: "Warning",
          description: error.message,
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }
    }
    toast({
      title: "Added Successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    return;
  };
  return (
    <>
      <Box
        w="40%"
        border="2px solid white"
        h="auto"
        textAlign="center"
        p="0.25rem"
        m="1rem"
        onClick={onOpen}
        borderRadius="10px"
      >
        <Text fontWeight="700" fontSize="1.5rem" className="btn">
          {title}
        </Text>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior={"inside"}
        size="md"
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalHeader fontWeight={700} fontSize="1.7rem" mb="0rem" pb="0.5rem">
            Time Slots
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Select Starting Time</FormLabel>
              <Input
                size="md"
                type="time"
                mb="0.5rem"
                p="0.5rem"
                fontSize="1.2rem"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Select Ending Time</FormLabel>
              <Input
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                }}
                size="md"
                type="time"
                mb="0.5rem"
                p="0.5rem"
                fontSize="1.2rem"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Start Break Time</FormLabel>
              <Input
                size="md"
                type="time"
                p="0.5rem"
                fontSize="1.2rem"
                value={breakTime}
                onChange={(e) => {
                  setBreakTime(e.target.value);
                }}
              />
              <FormHelperText>Break will be of 1 hour only</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleSave} isLoading={loading}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TimeSlotModal;
