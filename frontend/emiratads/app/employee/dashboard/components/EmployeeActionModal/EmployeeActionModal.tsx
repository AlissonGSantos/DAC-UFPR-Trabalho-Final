"use client";

import Modal from "@/app/components/Modal/Modal";
import React from "react";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import { Employee } from "@/app/types/EmployeeTypes";

export interface EmployeeActionModalProps {
  employee?: Employee;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (employee: Employee) => void;
  isEditing?: boolean;
  onChange: (employee: Employee) => void;
  setError?: (error: boolean) => void;
}

const EmployeeActionModal: React.FC<EmployeeActionModalProps> = ({
  employee,
  isOpen,
  onClose,
  onSubmit,
  isEditing = false,
  onChange,
  setError,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Editar Funcionário" : "Cadastrar Funcionário"}
    >
      <EmployeeForm
        onSubmit={onSubmit}
        employee={employee}
        onChange={onChange}
        onClose={onClose}
        isEditing={isEditing}
        onError={setError}
      />
    </Modal>
  );
};

export default EmployeeActionModal;
