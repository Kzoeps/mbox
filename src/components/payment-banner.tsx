import React, { useCallback, useContext, useEffect, useState } from "react";
import { Button, Stack, Text } from "@chakra-ui/react";
import { UserContext } from "./user-context";
import { getPaymentInfo } from "../api/misc.api";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";

export interface PaymentBannerProps {}

const getTrialText = (expiry: Dayjs, current: Dayjs): string => {
  let differenceText = "";
  const differenceDays = expiry.diff(current, "d");
  const differenceHours = expiry.diff(current, "h");
  differenceText = differenceDays
    ? `${differenceDays} ${differenceDays > 1 ? "days" : "day"}`
    : `${differenceHours} ${differenceHours > 1 ? "hours" : "hour"}`;
  return `Your free trial ends in ${differenceText}, subscribe now to continue using mbox`;
};

const isInvalidPayment = (lastPayment: undefined | any) => {
  if (!lastPayment) return true;
  const latestPayment = dayjs(lastPayment.toDate());
  return dayjs().isAfter(latestPayment);
};

export const PaymentBanner = (props: PaymentBannerProps) => {
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [text, setText] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const setDisplayText = useCallback(
    (expiry: Dayjs, current: Dayjs, paymentValidity: undefined | any) => {
      const isInvalid = isInvalidPayment(paymentValidity);
      if (current.isBefore(expiry) && isInvalid) {
        setShowBanner(true);
        setText(getTrialText(expiry, current));
      } else if (
        [undefined, null].includes(paymentValidity) &&
        current.isAfter(expiry)
      ) {
        setShowBanner(true);
        setText(
          "Your free trial has ended, subscribe now to continue using mbox"
        );
      } else if (paymentValidity && isInvalid) {
        setShowBanner(true);
        setText(
          "Your subscription has expired, subscribe again to continue using mbox"
        );
      }
    },
    []
  );

  const handleDismiss = () => {
    sessionStorage.setItem("dismissPayment", "true");
    setShowBanner(false);
  };

  useEffect(() => {
    const handleDisplay = async () => {
      const dismissedInfo = sessionStorage.getItem("dismissPayment") === "true";
      if (user?.uid && !dismissedInfo) {
        const paymentInfo = await getPaymentInfo(user.uid);
        // latest_payment is actually the last validity date for subscription
        const { expiry_date, payment_valid_till } = paymentInfo.data() as any;
        const expiryDate = dayjs(expiry_date.toDate());
        const currentDate = dayjs();
        setDisplayText(expiryDate, currentDate, payment_valid_till);
      }
    };
    void handleDisplay();
  }, [user?.uid, setDisplayText]);
  if (!showBanner || !user) {
    return null;
  }
  return (
    <>
      <Stack p="4" boxShadow="md" borderRadius="sm">
        <Stack
          maxW="930px"
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Text fontSize="xl" fontWeight="semibold">
            {text}
          </Text>
          <Stack spacing="24px" direction={{ base: "column", md: "row" }}>
            <Button
              onClick={handleDismiss}
              variant="outline"
              borderColor="orange.400"
              color={"orange.400"}
            >
              Dismiss
            </Button>
            <Button
              onClick={() => navigate("/subscribe")}
              color="white"
              bg="orange.400"
              _hover={{ bg: "orange.500" }}
            >
              Subscribe
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default PaymentBanner;
