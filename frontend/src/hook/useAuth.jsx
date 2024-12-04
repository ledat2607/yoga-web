import { useContext } from "react";
import { AuthContext } from "../ultities/provider/AuthProvider";
const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;
