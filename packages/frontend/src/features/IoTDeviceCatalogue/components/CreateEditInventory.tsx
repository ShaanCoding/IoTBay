import {
  Box,
  Container,
  Stack,
  Button,
  HStack,
  Select,
  Input,
  Flex,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  Textarea,
  useColorMode,
  FormErrorMessage,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import { useGetCategories } from "../../../hooks/useCategories";

import { useEffect, useState } from "react";
import { DownloadIcon, MinusIcon } from "@chakra-ui/icons";
import BreadCrumbRoute from "../../../components/BreadCrumbRoute";
import PageTitle from "../../../components/PageTitle";
import { useForm } from "react-hook-form";
import CreateEditCancelButtons from "./CreateEditCancelButtons";
import FormErrorNotification from "../../../components/Form/FormErrorNotification";
import { RouterInput, RouterOutput } from "backend";

export type FormValues = {
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  category: string;
};

interface IEditUpdateInventoryProps {
  createOrUpdate: "create" | "edit";

  createProduct?: (data: RouterInput["products"]["create"]) => void;
  updateProduct?: (data: RouterInput["products"]["update"]) => void;

  initialFormValues?: FormValues;

  editId?: string;
}

const defaultPreviewImage: string = "https://via.placeholder.com/150";

const EditUpdateInventory: React.FC<IEditUpdateInventoryProps> = (props) => {
  const initialDefaultValues = {
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    image: defaultPreviewImage,
  } as FormValues;

  const getCategories = useGetCategories();

  const isPropsNull = () => {
    if (!props.initialFormValues) return true;
    if (Object.keys(props.initialFormValues).length === 0) return true;

    const value = Object.values(props.initialFormValues).some(
      (value) => value === null || value === undefined || value === ""
    );

    return value;
  };

  const {
    handleSubmit, // function to invoke when the form is submitted
    register, // register the input into the hook by invoking the "register" function
    formState: { errors, defaultValues },
    reset,
    setValue,
  } = useForm({
    defaultValues: isPropsNull()
      ? initialDefaultValues
      : props.initialFormValues,
  });

  const [imageURL, setImageURL] = useState<string | undefined>(
    defaultPreviewImage
  );
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    defaultValues !== undefined && defaultValues.image
      ? defaultValues.image
      : defaultPreviewImage
  );

  const onSubmit = (data: any) => {
    const dataFormatted = { ...data, image: previewImage };
    props.createProduct && props.createProduct(dataFormatted);
    props.updateProduct && props.updateProduct(dataFormatted);
  };

  useEffect(() => {
    if (props.initialFormValues && props.createOrUpdate === "edit") {
      reset(props.initialFormValues);
      setPreviewImage(props.initialFormValues.image);
      setImageURL(props.initialFormValues.image);
    }
  }, [props.initialFormValues]);

  // if (!getCategories.isSuccess) return <div>Loading...</div>;

  /*
    Validation Rules:
      - Name
        - Required
        - Max Length: 40 as defined in data dictionary
      - Image URL
        - Required
        - Valid URL
        - Max Length: 1000 as defined in data dictionary
      - Stock
        - Required
        - Min: 0 value
        - Max: 9999 value
      - Price
        - Required
        - Min: 0
        - Max: 9999 value
        - Data Type: Float, 2 decimal places
      - Category
        - Required
        - No validation for data as it's a dropdown
      - Description
        - Optional
        - Max Length: 5000 as defined in data dictionary
        - Min Length: N/A
  */

  return (
    <Container maxW={"container.xl"}>
      <Stack spacing={4}>
        {/* Manage Inventory Header, Create, Delete */}
        <PageTitle
          title={
            props.createOrUpdate === "create"
              ? "Create Product"
              : "Edit Product"
          }
        />

        {/* Breadcrumb */}
        <BreadCrumbRoute
          parameters={[
            { paths: "Manage Inventory", links: "/staff/inventory" },
            {
              paths:
                props.createOrUpdate === "create"
                  ? "Create Product"
                  : "Edit Product",
              links:
                props.createOrUpdate === "create"
                  ? "/staff/inventory/create"
                  : `/staff/inventory/edit/${props.editId}`,
            },
          ]}
        />

        {/* Product Info */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            background={
              useColorMode().colorMode === "light" ? "gray.100" : "gray.900"
            }
            padding={4}
          >
            <Flex
              direction="row"
              alignItems={"start"}
              justifyContent={"space-between"}
              w="100%"
              m={4}
            >
              {/* Preview Image */}
              <Box width="100%" margin={2}>
                <img
                  src={previewImage}
                  width="100%"
                  height="auto"
                  alt="Preview Image"
                />
              </Box>

              <Box width="100%" margin={2}>
                {/* Notification Message */}
                <FormErrorNotification errors={errors} />

                <Stack spacing={4}>
                  {/* Name */}
                  <FormControl isInvalid={errors.name ? true : false}>
                    <FormLabel>Name</FormLabel>
                    <Input
                      variant="filled"
                      id="name"
                      {...register("name", {
                        required: "Name is required",
                        maxLength: {
                          value: 40,
                          message: "Name cannot exceed 40 characters",
                        },
                      })}
                      defaultValue={
                        defaultValues !== undefined && defaultValues.name
                          ? defaultValues.name
                          : initialDefaultValues.name
                      }
                    />
                    <FormErrorMessage>
                      {errors.name && errors.name.message}
                    </FormErrorMessage>
                  </FormControl>

                  {/* Image */}
                  <FormControl isInvalid={errors.image ? true : false}>
                    <FormLabel>Image URL</FormLabel>
                    <Input
                      variant="filled"
                      id="image"
                      {...register("image", {
                        required: "Image URL is required",
                        maxLength: {
                          value: 1000,
                          message: "Image URL cannot exceed 1000 characters",
                        },
                      })}
                      defaultValue={
                        defaultValues !== undefined && defaultValues.image
                          ? defaultValues.image
                          : initialDefaultValues.image
                      }
                      onChange={(e) => {
                        setImageURL(e.target.value);
                      }}
                      value={imageURL}
                    />
                    <FormErrorMessage>
                      {errors.image && errors.image.message}
                    </FormErrorMessage>
                  </FormControl>

                  <Box>
                    <HStack spacing={2} align="center">
                      <Button
                        colorScheme="green"
                        leftIcon={<DownloadIcon />}
                        onClick={() => {
                          setPreviewImage(imageURL);
                        }}
                      >
                        Upload Image
                      </Button>

                      <Button
                        colorScheme="red"
                        variant={"outline"}
                        leftIcon={<MinusIcon />}
                        onClick={() => {
                          setPreviewImage(defaultPreviewImage);
                          setImageURL(defaultPreviewImage);
                        }}
                      >
                        Clear
                      </Button>
                    </HStack>
                  </Box>

                  {/* Stock */}
                  <FormControl isInvalid={errors.stock ? true : false}>
                    <FormLabel>Stock</FormLabel>
                    <Input
                      variant="filled"
                      id="stock"
                      {...register("stock", {
                        required: "Stock is required",
                        max: {
                          value: 9999,
                          message: "Stock must be less than 9999",
                        },
                        min: {
                          value: 0,
                          message: "Stock must be greater than or equal to 0",
                        },
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Stock must be a whole number",
                        },
                      })}
                      defaultValue={
                        defaultValues !== undefined && defaultValues.stock
                          ? defaultValues.stock
                          : initialDefaultValues.stock
                      }
                    />
                    <FormErrorMessage>
                      {errors.stock && errors.stock.message}
                    </FormErrorMessage>
                  </FormControl>

                  {/* Price */}
                  <FormControl isInvalid={errors.price ? true : false}>
                    <FormLabel>Price</FormLabel>

                    <Input
                      variant="filled"
                      id="price"
                      {...register("price", {
                        required: "Price is required",
                        max: {
                          value: 9999,
                          message: "Price must be less than 9999",
                        },
                        min: {
                          value: 0,
                          message: "Price must be greater than or equal to 0",
                        },
                        pattern: {
                          value: /^\d+(\.\d{1,2})?$/,
                          message:
                            "Price must be a number with a maximum of 2 decimal places",
                        },
                      })}
                      defaultValue={
                        defaultValues !== undefined && defaultValues.price
                          ? defaultValues.price
                          : initialDefaultValues.price
                      }
                    />
                    <FormErrorMessage>
                      {errors.price && errors.price.message}
                    </FormErrorMessage>
                  </FormControl>

                  {/* Category */}
                  <FormControl isInvalid={errors.category ? true : false}>
                    <FormLabel>Category</FormLabel>
                    <Select
                      placeholder="Filter by category"
                      variant="filled"
                      id="category"
                      {...register("category", {
                        required: "Category is required",
                      })}
                      defaultValue={
                        defaultValues !== undefined && defaultValues.category
                          ? defaultValues.category
                          : initialDefaultValues.category
                      }
                    >
                      {getCategories.data?.map((category) => {
                        return (
                          <option value={category.name}>{category.name}</option>
                        );
                      })}
                    </Select>
                    <FormErrorMessage>
                      {errors.category && errors.category.message}
                    </FormErrorMessage>
                  </FormControl>
                </Stack>
              </Box>
            </Flex>

            {/* Description */}
            <Box>
              <FormControl isInvalid={errors.description ? true : false}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Product Description"
                  variant="filled"
                  id="description"
                  {...register("description", {
                    maxLength: {
                      value: 5000,
                      message: "Description must be less than 5000 characters",
                    },
                  })}
                  defaultValue={
                    defaultValues !== undefined && defaultValues.description
                      ? defaultValues.description
                      : initialDefaultValues.description
                  }
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>
            </Box>
          </Box>

          <CreateEditCancelButtons createOrUpdate={props.createOrUpdate} />
        </form>
      </Stack>
    </Container>
  );
};

export default EditUpdateInventory;
