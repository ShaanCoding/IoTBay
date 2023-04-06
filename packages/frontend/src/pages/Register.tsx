import {
    Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import useRegister from "../hooks/useRegister";

interface LoginData {
  email: string;
  password: string;
}

export default function Register() {
    const registerMutation = useRegister()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>();

  const onSubmit: SubmitHandler<LoginData> = (data) => registerMutation.mutateAsync(data);

  return (
    <Container maxW={"container.sm"}>
      <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
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
            <Input type="password" {...register("password", { required: true })} />
            {errors.password ? (
                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            ) : (
                <FormHelperText>Enter your password.</FormHelperText>
            )}
        </FormControl>
        <Button
            type="submit"
            isLoading={isSubmitting}
        >
            Submit
        </Button>
      </Stack>
    </Container>
  );
}