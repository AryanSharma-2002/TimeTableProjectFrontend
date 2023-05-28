import React, { useContext } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Box,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AddIcon,
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import ModalToUpdate from "./classTimeTable/ModalToUpdate";
import { HandleContext } from "../../pages/ClassTimeTable";

const OptionsInCell = ({ row, col }) => {
  const { handleDelete } = useContext(HandleContext);
  const { onOpen, isOpen, onClose } = useDisclosure();
  return (
    <>
      <Box alignSelf="right">
        <Menu autoSelect={false}>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<ChevronDownIcon />}
            className="menu-button"
          />
          <MenuList>
            <MenuItem icon={<ExternalLinkIcon />} onClick={onOpen}>
              Update Period
            </MenuItem>

            <ModalToUpdate
              row={row}
              col={col}
              onOpen={onOpen}
              isOpen={isOpen}
              onClose={onClose}
            />
            <MenuItem
              icon={<DeleteIcon />}
              onClick={() => {
                handleDelete(row, col);
              }}
            >
              Delete Period
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </>
  );
};

export default OptionsInCell;
