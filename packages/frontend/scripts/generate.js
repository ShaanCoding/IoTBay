import OpenAPI from "openapi-typescript-codegen";
import rimraf from "rimraf";
const generate = async () => {
  await rimraf("./src/api/generated");

  await OpenAPI.generate({
    exportCore: true,
    exportSchemas: false,
    exportServices: true,
    input: "http://127.0.0.1:3000/docs/json",
    output: "./src/api/generated",
    clientName: "IoTBayClient",
  });

  console.log("Generated API client");
};

generate();