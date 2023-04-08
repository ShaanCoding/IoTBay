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
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../api/generated";

interface LoginData {
  email: string;
  password: string;
}

export default function Login() {
  const loginMutation = useLogin();
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>();

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      await loginMutation.mutateAsync({
        username: data.email,
        password: data.password,
      });
      // console.log(res);
      toast({
        title: "Login successful",
        description: "You have been logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/profile`)
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
          Login
        </Text>
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
