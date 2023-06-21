import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

interface GenericDialogProps {
  title: string;
  okText: string;
  cancelText: string;
  isOpen: boolean;
  children?: React.ReactElement;
  hideCancel?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function GenericDialog(props: GenericDialogProps) {
  const { okText, hideCancel, onConfirm, cancelText, title, isOpen, onClose, children } = props;
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={"380px"}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {children || "Are you sure you want to do this?"}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onConfirm}>
              {okText}
            </Button>
            {!hideCancel && <Button onClick={onClose} variant="outline">{cancelText}</Button>}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

GenericDialog.defaultProps = {
  title: "Pick Date Range",
  okText: "Confirm",
  cancelText: "Cancel",
};
