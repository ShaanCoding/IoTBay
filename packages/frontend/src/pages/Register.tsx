import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import useRegister from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../api/generated";

interface LoginData {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

export default function Register() {
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>();

  const navigate = useNavigate();

  const toast = useToast();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      await registerMutation.mutateAsync(data);
      toast({
        title: "Registration successful",
        description: "You have been registered.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/login`);
    } catch (error) {
      if (error instanceof ApiError) {
        toast({
          title: "Login failed",
          description: error.body?.message ?? "Unknown error",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login failed",
          description: "Unknown error",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize="3xl" fontWeight="bold">
          Register
        </Text>
        <FormControl isInvalid={!!errors.address}>
          <FormLabel>Address</FormLabel>
          <Input  {...register("address", { required: true })} />
          {errors.address ? (
            <FormErrorMessage>{errors.address.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Mailing address.</FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.name}>
          <FormLabel>Name</FormLabel>
          <Input  {...register("name", { required: true })} />
          {errors.name ? (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Name.</FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.phone}>
          <FormLabel>Phone</FormLabel>
          <Input  {...register("phone", { required: true })} />
          {errors.phone ? (
            <FormErrorMessage>{errors.phone.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Phone</FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email address</FormLabel>
          <Input type="email" {...register("email", { required: true })} />
          {errors.email ? (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          ) : (
            <FormHelperText>We'll never share your email.</FormHelperText>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password ? (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          ) : (
            <FormHelperText>Enter your password.</FormHelperText>
          )}
        </FormControl>
        <Button type="submit" isLoading={isSubmitting}>
          Submit
        </Button>
      </Stack>
    </Container>
  );
}
