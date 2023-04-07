import OpenAPI from "openapi-typescript-codegen";

const generate = async () => {
 

  const ref = OpenAPI.generate({
    exportCore: true,
    exportSchemas: false,
    exportServices: true,
    input: "http://localhost:3000/docs/json",
    output: "./src/api/generated",
    clientName: "BuiltView360Client",
  });

  ref.then(() => {
    console.log("Generated new types");
  });
};

generate();