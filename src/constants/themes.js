import { createTheme } from "@mui/material/styles";

export const getTheme = (darkMode) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",

      primary: {
        main: darkMode ? "#81c784" : "#2e7d32",
        light: darkMode ? "#a5d6a7" : "#60ad5e",
        dark: darkMode ? "#519657" : "#005005",
        contrastText: "#ffffff",
      },

      secondary: {
        main: darkMode ? "#aed581" : "#8bc34a",
        light: darkMode ? "#dce775" : "#cddc39",
        dark: darkMode ? "#7da453" : "#689f38",
        contrastText: "#ffffff",
      },

      background: {
        default: darkMode ? "#121212" : "#fdfdfd",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
        transparent: darkMode ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.05)",
      },

      text: {
        primary: darkMode ? "#e8f5e9" : "#1b5e20",
        secondary: darkMode ? "#c8e6c9" : "#2e7d32",
        disabled: darkMode ? "#78909c" : "#9e9e9e",
      },

      divider: darkMode ? "#37474f" : "#e0e0e0",

      info: { main: darkMode ? "#4fc3f7" : "#0288d1" },
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
