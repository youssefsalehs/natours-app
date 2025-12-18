import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";

import { CiLight, CiDark } from "react-icons/ci";
import useMyTheme from "../../Store/useMyTheme";
export default function ToggleThemeBtn() {
  const darkMode = useMyTheme((state) => state.darkMode);
  const toggleTheme = useMyTheme((state) => state.toggleTheme);
  return (
    <Box sx={{ m: 3, position: "fixed", bottom: 0, right: 0, zIndex: 3 }}>
      <Fab color="primary" size="medium" onClick={toggleTheme}>
        {darkMode == true ? (
          <CiLight className="text-2xl" />
        ) : (
          <CiDark className="text-2xl" />
        )}
      </Fab>
    </Box>
  );
}
