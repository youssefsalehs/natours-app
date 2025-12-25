import { MdPerson, MdDelete, MdLogout, MdChangeCircle } from "react-icons/md";
const settings = [
  { name: "account", icon: MdPerson },
  { name: "Change Password", icon: MdChangeCircle },
  { name: "Deactivate Account", deactivate: true, icon: MdDelete },
  { name: "logout", logout: true, icon: MdLogout },
];
export { settings };
