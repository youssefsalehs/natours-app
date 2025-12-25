import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ProfileSidebar from "../../components/Sidebar/ProfileSidebar";
import { Typography } from "@mui/material";

const formatTitle = (text) => {
  const map = {
    changepassword: "Change Password",
    editprofile: "Edit Profile",
    userreviews: "User Reviews",
    addcabin: "Add Cabin",
    editcabin: "Edit Cabin",
  };

  return map[text.toLowerCase()] || text;
};

function ProfileLayout() {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const currentPage = pathParts[pathParts.length - 1];
  let title = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
  if (title === "Profile") title = "Account";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div
          className="hidden md:block"
          style={{
            width: 300,
            height: "calc(100vh - 64px)",
            overflow: "hidden",
          }}
        >
          <ProfileSidebar />
        </div>

        <div
          className="flex-1 px-5 pt-4 overflow-y-auto custom-scrollbar"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
            {formatTitle(title)}
          </Typography>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;
