import React, { useContext, useState } from "react";
import { Form, Formik } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { updateUserProfile } from "../api/misc.api";
import { getTrialDates } from "../utils/misc.utils";
import { PhoneSignUpForm } from "../types/misc.types";
import { PHONE_SIGN_UP } from "../constants/misc.constants";
import { InitSignUpSchema, SignUpSchema } from "../utils/validation-schemas";
import PhoneAuthForm from "../components/phone-auth-form";
import usePhoneAuth from "../hooks/usePhoneAuth";
import { UserContext } from "../components/user-context";

export interface PhoneSignUpProps {}

export const PhoneSignUp = (props: PhoneSignUpProps) => {
  const initialValue: PhoneSignUpForm = PHONE_SIGN_UP;
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isCreating } = useContext(UserContext);
  const { deliverCode, showCode, verifyCode } = usePhoneAuth({});

  const handleDelivery = async (vals: PhoneSignUpForm) => {
    await deliverCode(vals.phoneNumber);
  };

  const verifyOtp = async (vals: PhoneSignUpForm) => {
    try {
      setIsLoading(true);
      isCreating.current = true;
      const userCredentials = await verifyCode(+vals.verificationCode);
      if (userCredentials?._tokenResponse.isNewUser) {
        await handleProfileGeneration(vals, userCredentials.user);
        toast({
          title: "Account successfully created",
          description: "We've created your account for you",
          status: "success",
          isClosable: true,
        });
        navigate("/dashboard", { replace: true });
      }
    } catch (e: any) {
      toast({ title: e?.message || e || "an error occurred", status: "error" });
    } finally {
      isCreating.current = false;
      setIsLoading(false);
    }
  };

  const handleProfileGeneration = async (
    formVals: PhoneSignUpForm,
    user: any
  ) => {
    const { firstName, lastName } = formVals;
    const displayName = `${firstName.trim()} ${lastName.trim()}`;
    await updateProfile(user, { displayName });
    await updateUserProfile(user.uid, {
      ...getTrialDates(),
      phone_number: user.phoneNumber,
    });
  };

  const handleOtpRequest = async (vals: PhoneSignUpForm) => {
    showCode ? await verifyOtp(vals) : await handleDelivery(vals);
  };
  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={showCode ? SignUpSchema : InitSignUpSchema}
        onSubmit={async (values) => {
          await handleOtpRequest(values);
        }}
      >
        {(formik) => {
          return (
            <Form>
              <Flex
                minH={"100vh"}
                align={"center"}
                justify={"center"}
                bg={colorMode === "light" ? "gray.50" : "gray.700"}
              >
                <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                  <Stack align={"center"}>
                    <Heading
                      color={"orange.400"}
                      fontSize={"4xl"}
                      textAlign={"center"}
                    >
                      Sign up
                    </Heading>
                    <Text
                      fontSize={"lg"}
                      color={colorMode === "light" ? "gray.600" : "gray.50"}
                    >
                      to enjoy all of our neat features ✌️
                    </Text>
                  </Stack>
                  <Box
                    rounded={"lg"}
                    bg={colorMode === "light" ? "white" : "gray.500"}
                    boxShadow={"lg"}
                    p={8}
                  >
                    <Stack spacing={4}>
                      <HStack>
                        <Box>
                          <FormControl id="firstName" isRequired>
                            <FormLabel>First Name</FormLabel>
                            <Input
                              onChange={formik.handleChange}
                              name={"firstName"}
                              type="text"
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <FormControl id="lastName">
                            <FormLabel>Last Name</FormLabel>
                            <Input
                              onChange={formik.handleChange}
                              name="lastName"
                              type="text"
                            />
                          </FormControl>
                        </Box>
                      </HStack>
                      <PhoneAuthForm formik={formik} showCode={showCode} />
                      <div id="recaptcha-container" />
                      <Stack spacing={10} pt={2}>
                        <Button
                          loadingText="Creating Account"
                          isLoading={isLoading}
                          size="lg"
                          type="submit"
                          bg={"orange.400"}
                          color={"white"}
                          id={"request-otp"}
                          _hover={{
                            bg: "orange.500",
                          }}
                        >
                          {showCode ? "Confirm" : "Send Code"}
                        </Button>
                      </Stack>
                      <Stack pt={6}>
                        <Text align={"center"}>
                          Already a user?{" "}
                          <Link
                            as={RouterLink}
                            to={`/sign-in`}
                            color={"orange.400"}
                          >
                            Login
                          </Link>
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default PhoneSignUp;
