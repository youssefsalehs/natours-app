import { createTheme } from "@mui/material/styles";

export const getTheme = (darkMode) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#1de9b6" : "#00bfa5",
        light: darkMode ? "#64ffda" : "#26a69a",
        dark: darkMode ? "#00bfa5" : "#00796b",
        contrastText: "#ffffff",
      },

      secondary: {
        main: darkMode ? "#ff7043" : "#ff5722",
        light: darkMode ? "#ffab91" : "#ff8a65",
        dark: darkMode ? "#f4511e" : "#e64a19",
        contrastText: "#ffffff",
      },

      background: {
        default: darkMode ? "#121212" : "#fdfdfd",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
        transparent: darkMode ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.05)",
      },

      text: {
        primary: darkMode ? "#e0f7fa" : "#004d40",
        secondary: darkMode ? "#80cbc4" : "#00695c",
        disabled: darkMode ? "#607d8b" : "#9e9e9e",
      },

      divider: darkMode ? "#37474f" : "#e0e0e0",

      info: { main: darkMode ? "#29b6f6" : "#0288d1" },
      success: { main: darkMode ? "#66bb6a" : "#2e7d32" },
      warning: { main: darkMode ? "#ffa726" : "#f57c00" },
      error: { main: darkMode ? "#ef5350" : "#d32f2f" },
    },

    typography: {
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    },

    shape: {
      borderRadius: 10,
    },
  });
