import { Box, Button, Typography } from "@mui/material";
import { settings } from "../../constants/dashboardConstants";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        height: "100%",
        bgcolor: "background.paper",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      {settings.map((item) => (
        <Button
          key={item.name}
          component={NavLink}
          to={`/dashboard/${item.name.toLowerCase()}`}
          sx={(theme) => ({
            width: "100%",
            py: 2,
            textAlign: "left",
            justifyContent: "flex-start",
            color: "inherit",
            gap: 2,
            fontWeight: "bold",
            "&.active": {
              bgcolor: theme.palette.primary.main,
              color: "#fff",
              "&:hover": { bgcolor: theme.palette.primary.dark },
            },
          })}
        >
          {item.icon && <item.icon size={28} sx={{ mr: 2 }} />}
          <Typography sx={{ fontSize: 18 }}>{item.name}</Typography>
        </Button>
      ))}
    </Box>
  );
}

export default Sidebar;
