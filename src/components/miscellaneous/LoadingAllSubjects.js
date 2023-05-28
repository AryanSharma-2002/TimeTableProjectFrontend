import { Skeleton, VStack } from "@chakra-ui/react";
import React from "react";

const LoadingAllSubjects = () => {
  return (
    <VStack>
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </VStack>
  );
};

export default LoadingAllSubjects;
