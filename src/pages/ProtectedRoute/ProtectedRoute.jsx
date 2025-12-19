import useAuth from "../../Store/useAuth";
import UnAuthenticatedUserPage from "../UnAuthinicatedUser/UnAuthenticatedUserPage";

function ProtectedRoute({ children }) {
  const isLogged = useAuth((state) => state.isLogged);
  if (!isLogged) return <UnAuthenticatedUserPage />;
  return <div>{isLogged && children}</div>;
}

export default ProtectedRoute;
