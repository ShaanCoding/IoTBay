import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import React from "react";

interface IParameters {
  paths: string;
  links: string;
}

const BreadCrumbRoute: React.FC<{
  parameters: IParameters[];
}> = ({ parameters }) => {
  return (
    <Box>
      <Breadcrumb>
        {parameters.map((parameter) => (
          <BreadcrumbItem>
            <BreadcrumbLink href={parameter.links}>
              {parameter.paths}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </Box>
  );
};

export default BreadCrumbRoute;
