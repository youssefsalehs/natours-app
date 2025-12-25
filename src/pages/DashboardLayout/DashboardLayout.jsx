import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/DashboardSidebar";
import { Typography } from "@mui/material";
import useMyTheme from "../../Store/useMyTheme";
import ScrollupBtn from "../../components/ScrollupBtn/ScrollupBtn";
import { useRef } from "react";

function DashboardLayout() {
  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const currentPage = pathParts[pathParts.length - 1].toLowerCase();
  const darkMode = useMyTheme((state) => state.darkMode);
  const scrollContainerRef = useRef();
  const titles = {
    dashboard: "Tours",
    addtour: "Add Tour",
  };

  const title =
    titles[currentPage] ||
    currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-1 ">
        <div
          className="hidden md:block"
          style={{
            width: 300,
            height: "calc(100vh - 64px)",
            overflow: "hidden",
          }}
        >
          <Sidebar />
        </div>

        <div
          ref={scrollContainerRef}
          className={`flex-1 px-5 pt-4 overflow-y-auto custom-scrollbar  ${
            darkMode ? "scrollbar-dark" : "scrollbar-light"
          }`}
          style={{ height: "calc(100vh - 64px)" }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            {title}
          </Typography>
          <ScrollupBtn scrollContainerRef={scrollContainerRef} />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
