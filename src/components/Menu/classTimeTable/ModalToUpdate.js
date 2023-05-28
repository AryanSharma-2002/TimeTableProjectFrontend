import React, { useContext, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import ModalBodyOnAdd from "./ModalBodyOnAdd";
import { HandleContext } from "../../../pages/ClassTimeTable";

const ModalToUpdate = ({ onOpen, row, col, isOpen, onClose }) => {
  const { handleAdd } = useContext(HandleContext);

  const [tid, setTid] = useState();
  const [subjName, setSubjName] = useState();
  const [loadingAdd, setLoadingAdd] = useState();
  return (
    <>
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
                setTid("");
                setSubjName("");
              }}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalToUpdate;
