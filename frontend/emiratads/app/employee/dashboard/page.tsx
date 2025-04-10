import { robotoFont } from "@/app/assets/fontsSetup";
import EmployeeTable from "./components/EmployeeTable/EmployeeTable";


const EmployeeDashboard = () => {
  return (
    <div className="w-3/4 mx-auto mt-10 text-start">
      <h1
        className={`text-2xl font-bold mb-4 ml-4 text-slate-300 uppercase ${robotoFont.className}`}
      >
        Funcionários
      </h1>
      <EmployeeTable />
    </div>
  );
};

export default EmployeeDashboard;
