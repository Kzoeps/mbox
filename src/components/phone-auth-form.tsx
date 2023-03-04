import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
} from "@chakra-ui/react";

export interface PhoneAuthFormProps {
  formik: any;
  showCode: boolean;
}

export const PhoneAuthForm = (props: PhoneAuthFormProps) => {
  const { formik, showCode } = props;
  return (
    <>
      <FormControl
        id="email"
        isRequired
        isInvalid={!!formik.errors.phoneNumber && formik.touched.phoneNumber}
      >
        <FormLabel>Phone Number</FormLabel>
        <Input onChange={formik.handleChange} name="phoneNumber" />
        {!!formik.errors.phoneNumber && formik.touched.phoneNumber && (
          <FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage>
        )}
      </FormControl>
      {showCode && (
        <FormControl
          id="password"
          isRequired
          isInvalid={
            !!formik.errors.verificationCode && formik.touched.verificationCode
          }
        >
          <FormLabel>Verification Code</FormLabel>
          <InputGroup>
            <Input onChange={formik.handleChange} name="verificationCode" />
          </InputGroup>
          {!!formik.errors.verificationCode &&
            formik.touched.verificationCode && (
              <FormErrorMessage>
                {formik.errors.verificationCode}
              </FormErrorMessage>
            )}
        </FormControl>
      )}
      <div id="recaptcha-container" />
    </>
  );
};

export default PhoneAuthForm;
