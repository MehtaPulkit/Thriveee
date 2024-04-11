import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = "Client";

  if (token) {
    const decoded = jwtDecode(token);
    const {
      id,
      email,
      subscription,
      firstname,
      lastname,
      roles,
      active,
      postalAddress,
      currentAddress,
      dateOfBirth,
      mobileNumber,
      profilePicture,
      lastLogin
    } = decoded.UserInfo;

    // isManager = roles.includes('Manager')
    // isAdmin = roles.includes('Admin')

    // if (isManager) status = "Manager"
    // if (isAdmin) status = "Admin"

    return  {
      id,
      email,
      subscription,
      firstname,
      lastname,
      roles,
      active,
      postalAddress,
      currentAddress,
      dateOfBirth,
      mobileNumber,
      profilePicture,
      lastLogin
    }
    // return { username, roles, status, isManager, isAdmin }
  }

  return { username: "", roles: [], status };
};
export default useAuth;
