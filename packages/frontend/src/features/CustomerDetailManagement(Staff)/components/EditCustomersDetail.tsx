import {
  Box,
  Container,
  Stack,
  Button,
  HStack,
  Select,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import BreadCrumbRoute from "../../../components/BreadCrumbRoute";
import PageTitle from "../../../components/PageTitle";
import { useForm } from "react-hook-form";
import FormErrorNotification from "../../../components/Form/FormErrorNotification";
import type { RouterInput, RouterOutput } from "backend/src";
import { Link } from "react-router-dom";
import useZodForm from "../../../hooks/useZodForm";
import { CustomerEditSchema } from "backend/src/schema";
import { SubmitHandler } from "react-hook-form";
import { useEditCustomers, useGetCustomer } from "../../../hooks/useCustomer";
import { isTRPCClientError } from "../../../utils/trpc";

export type FormValues = {
  sex: string;
  isAnonymous: boolean;
};

interface IEditUpdateCustomerProps {
  initialCustomer: RouterOutput["customer"]["customer"];
}

const EditCustomersDetail: React.FC<IEditUpdateCustomerProps> = (props) => {
  const customer = useGetCustomer(props.initialCustomer.userId);

  const updateCustomer = useEditCustomers();

  const toast = useToast()

  const {
    handleSubmit, // function to invoke when the form is submitted
    register, // register the input into the hook by invoking the "register" function
    formState: { errors, defaultValues, isSubmitting },
    reset,
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      isAnonymous: props.initialCustomer.isAnonymous,
      sex: props.initialCustomer.sex ?? undefined,
    },
  });

  useEffect(() => {
    reset({
      isAnonymous: customer.data?.isAnonymous,
      sex: customer.data?.sex ?? undefined,
    })
  }, [customer.data])

  return (
    <Container maxW={"container.xl"}>
      <Stack spacing={4}>
        <PageTitle title={"Edit Customer"} />
        <BreadCrumbRoute
          parameters={[
            {
              paths: "Manage Customers Detail",
              links: "/staff/customerDetail",
            },
            {
              paths: "Edit Customer",
              links: `/staff/customerDetail/edit/${props.initialCustomer.userId}`,
            },
          ]}
        />

        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              await updateCustomer.mutateAsync({
                ...data,
                userId: props.initialCustomer.userId,
              });
              toast({
                title: "Success",
                description: "Successfully updated customer",
                colorScheme: "green"
              })
  
            } catch (error) {
              if (isTRPCClientError(error)) {
                toast({
                  title: "Error",
                  description: error.message,
                  colorScheme: "red"
                })
              } else {
                toast({
                  title: "Error",
                  description: "Something went wrong",
                  colorScheme: "red"
                })
              }
            }
            
            
          })}
        >
          <FormErrorNotification errors={errors} />
          <FormControl isInvalid={errors.sex ? true : false}>
            <FormLabel>Gender</FormLabel>
            <Select
              variant="filled"
              id="sex"
              {...register("sex", {
                required: "Gender must be required",
              })}
            >
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </Select>
            <FormErrorMessage>
              {errors.sex && errors.sex.message}
            </FormErrorMessage>
          </FormControl>

          <Checkbox {...register("isAnonymous")}>Anonymous</Checkbox>
          {/* <FormControl isInvalid={errors.isAnonymous ? true : false}>
                <FormLabel>Anonymous</FormLabel>
                <Select
                  placeholder="Anonymous Statement"
                  variant="filled"
                  id="isAnonymous"
                  {...register("isAnonymous", {
                    required: "Anonymous Statement",
                  })}
                  >
                  return (
                    <option value= "true">Anonymouse</option>
                    <option value= "false">Onymouse</option>
                  ); 
                  </Select>
                <FormErrorMessage>
                  {errors.isAnonymous && errors.isAnonymous.message}
                </FormErrorMessage>
              </FormControl> */}
          <Box>
            <HStack spacing={2} align="center" justify="flex-end">
              <Button
                colorScheme="blue"
                size="lg"
                leftIcon={<AddIcon />}
                type="submit"
                isLoading={isSubmitting}
              >
                Update Customer
              </Button>
              <Button
                colorScheme="red"
                variant={"outline"}
                size="lg"
                leftIcon={<CloseIcon />}
                as={Link}
                to="/staff/customerDetail"
              >
                Cancel
              </Button>
            </HStack>
          </Box>
        </form>
      </Stack>
    </Container>
  );
};

export default EditCustomersDetail;
