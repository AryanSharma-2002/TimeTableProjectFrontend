import { Box, Text } from "@chakra-ui/react";
import React from "react";

const TableCell = ({ contentObj, handleDelete }) => {
  let classForHover = "nothing";
  return (
    <>
      <Box
        border={"2px solid black"}
        className="table-cell"
        display="flex"
        p="0.3rem"
      >
        {Object.keys(contentObj).map((key, i) => {
          if (key === "delete") {
            classForHover = "hoverRed";
          } else {
          }
          return (
            <Text
              key={i}
              fontWeight="700"
              fontSize="1.2rem"
              textTransform="capitalize"
              ml="1rem"
              className={classForHover}
              onClick={() => {
                if (key == "delete") {
                  handleDelete();
                  return;
                }
                return;
              }}
            >
              {contentObj[key]}
            </Text>
          );
        })}
      </Box>
    </>
  );
};

export default TableCell;
