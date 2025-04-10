import { z } from "zod";
import { EmployeeSchema } from "../../schema/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Employee } from "@/app/types/EmployeeTypes";

interface UseEmployeeFormProps {
  employee?: Employee;
}

const useEmployeeForm = ({ employee }: UseEmployeeFormProps) => {
  type EmployeeFormData = z.infer<typeof EmployeeSchema>;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: {
      codigo: employee?.codigo ?? 0,
      nome: employee?.nome ?? "",
      email: employee?.email ?? "",
      cpf: employee?.cpf ?? "",
      telefone: employee?.telefone ?? "",
      ativo: employee?.ativo ?? false,
    },
  });

  return {
    register,
    handleSubmit,
    errors,
    setValue,
  };
};

export default useEmployeeForm;
