import { useAuthContext } from "@/app/contexts/auth";

const useHomeHeader = () => {
  const { userData } = useAuthContext();

  return {
    username: userData?.usuario.nome,
    milescore: userData?.usuario.saldo_milhas,
  };
};

export default useHomeHeader;
