import Modal, { ModalProps } from "@/app/components/Modal/Modal";
import React from "react";

interface BookingCodeModalProps extends ModalProps {
  bookingCode: string;
}

const BookingCodeModal: React.FC<BookingCodeModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} title={title}>
      {children}
    </Modal>
  );
};

export default BookingCodeModal;
