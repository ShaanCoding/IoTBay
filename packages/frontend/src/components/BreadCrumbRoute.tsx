import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

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
            <BreadcrumbLink to={parameter.links} as={Link}>
              {parameter.paths}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
    </Box>
  );
};

export default BreadCrumbRoute;
