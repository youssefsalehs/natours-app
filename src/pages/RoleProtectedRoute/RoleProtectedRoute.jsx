import useAuth from "../../Store/useAuth";
import UnauthorizedPage from "../UnauthorizedPage/UnauthorizedPage";

function RoleProtectedRoute({ children, allowedRoles }) {
  const user = useAuth((state) => state.user);
  if (!allowedRoles.includes(user.role)) {
    return <UnauthorizedPage />;
  }

  return children;
}

export default RoleProtectedRoute;
