import { Box } from "@chakra-ui/react";
import React from "react";
import TableCellTT from "./TableCellTT";
// isme array mai objects as element hai har object ko ek cell mai show krna tareeke se color ki puri row ka content kis color ka handleDelete mai vo function jo tab run krega jab delete wali entry par click krenge
const TableRowTT = ({ arr, color, i }) => {
  return (
    <>
      <Box w="100%" display="flex" color={color}>
        {arr.map((ele, j) => {
          return <TableCellTT key={j} row={i} col={j} contentObj={ele} />;
        })}
      </Box>
    </>
  );
};

export default TableRowTT;
