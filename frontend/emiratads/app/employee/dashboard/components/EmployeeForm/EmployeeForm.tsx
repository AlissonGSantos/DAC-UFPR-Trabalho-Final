"use client";

import Input from "@/app/components/Input/Input";
import SelectInput from "@/app/components/SelectInput/SelectInput";
import { Employee } from "@/app/types/EmployeeTypes";
import useEmployeeForm from "./useEmployeeForm";
import { maskCPF } from "@/app/utils/cpfMask";
import Button from "@/app/components/Button/Button";
import { phoneMask } from "@/app/utils/phoneMask";

interface EmployeeFormProps {
  employee?: Employee;
  onChange?: (employee: Employee) => void;
  onSubmit: (employee: Employee) => void;
  onClose: () => void;
  isEditing: boolean;
  onError?: (error: boolean) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  employee = {} as Employee,
  onChange,
  onSubmit,
  onClose,
  onError,
  isEditing,
}) => {
  const { register, handleSubmit, errors, setValue } = useEmployeeForm({
    employee,
  });

  const handleInputChange = (field: keyof Employee, value: any) => {
    if (onChange) {
      onChange({ ...employee, [field]: value });
    }
    setValue(field, value, { shouldValidate: true });
  };

  return (
    <div>
      <form
        className="flex w-full flex-col gap-3"
        onSubmit={handleSubmit((data) => {
          const payload: Employee = {
            ...data,
            codigo: data.codigo ?? 0,
          };
          onSubmit(payload);
        })}
      >
        <div className="flex gap-4 w-full">
          <Input
            type={"text"}
            label={"Nome:"}
            value={employee.nome || ""}
            error={
              errors.nome
                ? [{ hasError: true, message: errors.nome.message ?? "" }]
                : []
            }
            extraClasses="flex-1"
            {...(register("nome"),
            {
              onChange: (e) => {
                handleInputChange("nome", e.target.value);
              },
            })}
          />
          <Input
            type={"email"}
            label={"Email:"}
            value={employee.email || ""}
            error={
              errors.email
                ? [{ hasError: true, message: errors.email.message ?? "" }]
                : []
            }
            extraClasses="flex-1"
            {...(register("email"),
            {
              onChange: (e) => {
                handleInputChange("email", e.target.value);
              },
            })}
          />

          <Input
            type={"text"}
            label={"CPF:"}
            value={employee.cpf || ""}
            disabled={isEditing}
            error={
              errors.cpf
                ? [{ hasError: true, message: errors.cpf.message ?? "" }]
                : []
            }
            extraClasses="flex-1"
            {...register("cpf", {
              onChange: (e) => {
                const maskedValue = maskCPF(e.target.value);
                handleInputChange("cpf", maskedValue);
              },
            })}
          />
        </div>
        <div className="flex flex-fill gap-4">
          <div className="flex flex-col gap-4 w-1/2">
            <SelectInput
              label="Status:"
              options={[
                { value: "true", label: "Ativo" },
                { value: "false", label: "Inativo" },
              ]}
              placeholder="Selecione o status"
              onChange={(e) =>
                handleInputChange("ativo", e.target.value === "true")
              }
              value={employee.ativo ? "true" : "false"}
            />
          </div>
          <div className="flex flex-col gap-4 w-1/2">
            <Input
              type={"text"}
              label={"Telefone:"}
              value={employee.telefone || ""}
              error={
                errors.telefone
                  ? [{ hasError: true, message: errors.telefone.message ?? "" }]
                  : []
              }
              {...register("telefone", {
                onChange: (e) => {
                  const maskedValue = phoneMask(e.target.value);
                  handleInputChange("telefone", maskedValue);
                },
              })}
            />
          </div>
        </div>
        <div className="my-4 flex flex-row w-full justify-between">
          <Button
            text="Cancelar"
            type="SECONDARY"
            size="SMALL"
            onClick={onClose}
          />
          <Button
            text={isEditing ? "Salvar" : "Confirmar"}
            type={"PRIMARY"}
            size="SMALL"
            typeButton="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
