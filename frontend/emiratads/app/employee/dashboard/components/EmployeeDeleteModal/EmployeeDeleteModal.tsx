import Button from "@/app/components/Button/Button";
import Modal from "@/app/components/Modal/Modal";
import React from "react";

export interface EmployeeDeleteModalProps {
  onClose: () => void;
  isOpen: boolean;
  onDelete: () => void;
}

const EmployeeDeleteModal: React.FC<EmployeeDeleteModalProps> = ({
  onClose,
  isOpen,
  onDelete,
}) => {
  return (
    <Modal title="Deletar usuário" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-10 w-full px-2 py-4 justify-center items-center">
        <p className="text-slate-300 text-center">
          Você tem certeza que deseja deletar esse funcionário?
        </p>
        <div className="flex flex-1 justify-end w-full gap-8 px-8">
          <Button
            text="Cancelar"
            type="SECONDARY"
            size="SMALL"
            onClick={onClose}
          />
          <Button
            text={"Deletar"}
            type={"DANGER"}
            size="SMALL"
            onClick={onDelete}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EmployeeDeleteModal;
