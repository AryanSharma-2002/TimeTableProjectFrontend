import { Box } from "@chakra-ui/react";
import React from "react";
import TableCell from "./TableCell";
// isme array mai objects as element hai har object ko ek cell mai show krna tareeke se color ki puri row ka content kis color ka handleDelete mai vo function jo tab run krega jab delete wali entry par click krenge
const TableRow = ({ arr, color, handleDelete }) => {
  return (
    <>
      <Box w="100%" display="flex" color={color}>
        {arr.map((ele, i) => {
          return (
            <TableCell key={i} contentObj={ele} handleDelete={handleDelete} />
          );
        })}
      </Box>
    </>
  );
};

export default TableRow;
