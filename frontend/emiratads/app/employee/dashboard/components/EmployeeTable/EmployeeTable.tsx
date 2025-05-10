"use client";
import DataTable from "@/app/components/DataTable/DataTable";
import { Pencil, Trash } from "phosphor-react";
import useEmployeeTable from "./useEmployeeTable";
import Button from "@/app/components/Button/Button";
import EmployeeActionModal from "../EmployeeActionModal/EmployeeActionModal";
import EmployeeDeleteModal from "../EmployeeDeleteModal/EmployeeDeleteModal";

const EmployeeTable: React.FC = () => {
  const {
    data,
    columns,
    employeeValue,
    isModalOpen,
    setIsModalOpen,
    handleEdit,
    handleDelete,
    handleRegisterClick,
    onSubmit,
    setEmployeeValue,
    isEditing,
    setHasError,
    deleteModalOpen,
    setDeleteModalOpen,
    onDelete,
  } = useEmployeeTable();

  return (
    <div>
      <div className="flex items-center justify-end mx-4 mb-4">
        <Button
          text="Cadastrar"
          size="SMALL"
          typeButton="submit"
          onClick={handleRegisterClick}
        />
      </div>
      <DataTable
        data={data}
        controls={[
          {
            children: <Pencil size={24} weight="regular" />,
            type: "PRIMARY",
            size: "SMALL",
            onClick: handleEdit,
          },
          {
            children: <Trash size={24} weight="regular" />,
            type: "DANGER",
            size: "SMALL",
            onClick: handleDelete,
          },
        ]}
        columns={columns}
      />
      <EmployeeActionModal
        onChange={setEmployeeValue}
        isOpen={isModalOpen}
        employee={employeeValue ?? undefined}
        isEditing={isEditing}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onSubmit}
        setError={setHasError}
      />
      <EmployeeDeleteModal
        onClose={() => setDeleteModalOpen(false)}
        isOpen={deleteModalOpen}
        onDelete={onDelete}
      />
    </div>
  );
};

export default EmployeeTable;
