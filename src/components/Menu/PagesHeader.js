import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

const PagesHeader = ({ title, afterClick }) => {
  return (
    <>
      <Box
        w="40%"
        border="2px solid white"
        h="auto"
        textAlign="center"
        p="0.25rem"
        m="1rem"
        borderRadius="10px"
      >
        <NavLink to={afterClick}>
          <Text fontWeight="700" fontSize="1.5rem" className="btn">
            {title}
          </Text>
        </NavLink>
      </Box>
    </>
  );
};

export default PagesHeader;
