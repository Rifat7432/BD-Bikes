import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import Spiner from "../componets/ui/spiner/Spiner";
import { jwtDecode } from "jwt-decode";
import { ReactNode } from "react";
import { logOut } from "../redux/features/auth/authSlice";
interface Props {
  children: ReactNode;
}
// private route
const Private: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  // get token
  const { token, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  if (token) {
    // decoded token
    const decoded = jwtDecode(token);
    const verify = new Date().getTime() / 1000 < (decoded.exp as number);
    if (!verify) {
      dispatch(logOut())
    }
    // set verification
    return verify ? (
      children
    ) : (
      <Navigate to="/login" state={{ from: location }} replace></Navigate>
    );
  }
  if (loading) {
    return <Spiner></Spiner>;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default Private;
