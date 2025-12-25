import { Box, Button, Typography } from "@mui/material";
import { settings } from "../../constants/profileConstants";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../api/axiosconfig";
import useAuth from "../../Store/useAuth";
import { useState } from "react";
import WarningModal from "../WarningModal/WarningModal";

function ProfileSidebar() {
  const token = useAuth((state) => state.token);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();
  const [isWarning, setIsWarning] = useState(false);
  const [msg, setMsg] = useState("");

  const handleDeactivation = async () => {
    try {
      await api.delete("/users/deleteMe", {
        headers: { Authorization: `Bearer ${token}` },
      });
      logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleClick = (item) => {
    if (item.logout) {
      logout();
      navigate("/");
    }

    if (item.deactivate) {
      setIsWarning(true);
      setMsg("Are You Sure You Want To Deactivate?");
    }
  };

  return (
    <>
      <WarningModal
        open={isWarning}
        setOpen={setIsWarning}
        handleOp={handleDeactivation}
        msg={msg}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          height: "100%",
          bgcolor: "background.paper",
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.8)",
        }}
      >
        {settings.map((item) => {
          const isAction = item.logout || item.deactivate;

          const buttonStyles = {
            width: "100%",
            py: 2,
            textAlign: "left",
            gap: 2,
            color: "inherit",
            justifyContent: "flex-start",
          };

          if (isAction) {
            return (
              <Button
                key={item.name}
                onClick={() => handleClick(item)}
                sx={buttonStyles}
              >
                {item.icon && <item.icon size={24} sx={{ mr: 2 }} />}
                <Typography sx={{ fontSize: 18 }}>{item.name}</Typography>
              </Button>
            );
          }

          return (
            <Button
              key={item.name}
              component={NavLink}
              to={`/profile/${item.name.toLowerCase().replace(/\s+/g, "")}`}
              sx={{
                ...buttonStyles,
                "&.active": {
                  bgcolor: "primary.main",
                  gap: 2,
                  color: "white",
                  "&:hover": { bgcolor: "primary.dark" },
                },
              }}
            >
              {item.icon && <item.icon size={24} sx={{ mr: 2 }} />}
              <Typography sx={{ fontSize: 18 }}>{item.name}</Typography>
            </Button>
          );
        })}
      </Box>
    </>
  );
}

export default ProfileSidebar;
