import { PhoneIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { Form, Formik, FormikProps } from "formik";
import {
  useContext,
  useEffect, useRef
} from "react";
import { BiCommentAdd } from "react-icons/bi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { ImListNumbered } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addRecord
} from "../api/misc.api";
import GenericDialog from "../components/generic-dialog";
import { UserContext } from "../components/user-context";
import useLoaderHook from "../hooks/useLoaderHook";
import { DateFormats } from "../types/enums";
import {
  BaseRecordInfo,
  MboxRecord
} from "../types/misc.types";
import { formatPhoneNumber, getStringiDate } from "../utils/misc.utils";
import { RecordEntrySchema } from "../utils/validation-schemas";

export interface RecordAdditionProps {}

export const RecordAddition = (props: RecordAdditionProps) => {
  const { colorMode } = useColorMode();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const {isOpen, onOpen, onClose} = useDisclosure()
  const { isLoading, setIsLoading } = useLoaderHook();
  const initialValues: MboxRecord = {
    journalNumber: (location?.state as BaseRecordInfo)?.journalNumber ?? "",
    amount: (location?.state as BaseRecordInfo)?.amount ?? "",
    remarks: (location?.state as BaseRecordInfo)?.remarks ?? "",
    phoneNumber: "",
    date: location?.state?.date || getStringiDate(undefined),
  };
  const formRef = useRef<FormikProps<MboxRecord> | null>(null);
  const toast = useToast();

  const handleRecordAddition = async (values: MboxRecord) => {
    if (user) {
      setIsLoading(true);
      const phoneNumber = values.phoneNumber
        ? formatPhoneNumber(values.phoneNumber.toString())
        : "";
      await addRecord(user.uid, {
        ...values,
        phoneNumber,
        date: dayjs(values.date, DateFormats.CalendarDate).toDate(),
      });
      setIsLoading(false);
      toast({
        title: "Record added",
        description: `Record with jrnl no: ${values.journalNumber} has been successfully added`,
        status: "success",
        isClosable: true,
      });
      navigate(`/dashboard`);
    }
  };
  
  useEffect(() => {
    if (!location?.state?.journalNumber || !location?.state?.amount) {
      onOpen()
    }
    return () => {
      onClose()
    }
  }, [location?.state?.journalNumber, location?.state?.amount, onOpen, onClose])

  return (
    <>
    <GenericDialog hideCancel={true} title="Hey! Caution" isOpen={isOpen} onConfirm={onClose} onClose={onClose}>
        <Text>We weren't able to get all the information</Text>
        </GenericDialog>
      <Formik
        innerRef={formRef}
        initialValues={initialValues}
        validationSchema={RecordEntrySchema}
        onSubmit={handleRecordAddition}
      >
        {(formik) => {
          return (
            <Form>
              <Flex
                minH={"100vh"}
                align={"center"}
                justify={"center"}
              >
                <Stack
                  spacing={4}
                  w={"full"}
                  maxW={"md"}
                  bg={colorMode === "light" ? "white" : "gray.700"}
                  rounded={"xl"}
                  boxShadow={"lg"}
                  p={6}
                  my={4}
                >
                  <Heading
                    lineHeight={1.1}
                    fontSize={{ base: "2xl", md: "3xl" }}
                  >
                    Add new record
                  </Heading>
                  <FormControl
                    id="jrnl"
                    isRequired
                    isInvalid={
                      !!formik.errors.journalNumber &&
                      !!formik.touched.journalNumber
                    }
                  >
                    <FormLabel>Journal Number</FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <ImListNumbered />
                      </InputLeftElement>
                      <Input
                        autoComplete={"off"}
                        name="journalNumber"
                        value={formik.values.journalNumber ?? ""}
                        onChange={formik.handleChange}
                      />
                    </InputGroup>
                    {formik.errors.journalNumber &&
                    formik.touched.journalNumber ? (
                      <FormErrorMessage>
                        {formik.errors.journalNumber}
                      </FormErrorMessage>
                    ) : (
                      ""
                    )}
                  </FormControl>
                  <FormControl id="amount" isRequired>
                    <FormLabel>Amount</FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <FaMoneyBillAlt />
                      </InputLeftElement>
                      <Input
                        type="number"
                        max={100000}
                        min={1}
                        autoComplete={"off"}
                        name={"amount"}
                        value={formik.values.amount ?? ""}
                        onChange={formik.handleChange}
                        placeholder="Please enter amount without Nu"
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl
                    id="phoneNumber"
                    isInvalid={
                      !!formik.errors.phoneNumber &&
                      !!formik.touched.phoneNumber
                    }
                  >
                    <FormLabel>Phone Number</FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <PhoneIcon />
                      </InputLeftElement>
                      <Input
                        autoComplete={"off"}
                        name={"phoneNumber"}
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                      />
                    </InputGroup>
                    {formik.errors.phoneNumber && formik.touched.phoneNumber ? (
                      <FormErrorMessage>
                        {formik.errors.phoneNumber}
                      </FormErrorMessage>
                    ) : (
                      ""
                    )}
                  </FormControl>
                  <FormControl id="remarks">
                    <FormLabel>Remarks</FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                        <BiCommentAdd />
                      </InputLeftElement>
                      <Input
                        autoComplete={"off"}
                        value={formik.values.remarks}
                        name={"remarks"}
                        onChange={formik.handleChange}
                      />
                    </InputGroup>
                    <FormLabel>Date</FormLabel>
                  </FormControl>
                  <input
                    type="date"
                    max={getStringiDate(undefined)}
                    value={formik.values.date as string}
                    name={"date"}
                    onChange={formik.handleChange}
                    style={{
                      border: "1px solid #E2E8F0",
                      height: "40px",
                      padding: "0 16px",
                    }}
                  />
                  <Stack spacing={6}>
                    <Button
                      isLoading={isLoading}
                      type={"submit"}
                      bg={"orange.400"}
                      color={"white"}
                      _hover={{
                        bg: "orange.500",
                      }}
                    >
                      Submit
                    </Button>
                  </Stack>
                </Stack>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default RecordAddition;
