import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo } from "../../constants/navbar";
import useAuth from "../../Store/useAuth";
import { Avatar, InputAdornment, TextField } from "@mui/material";
import { TbMapPinSearch } from "react-icons/tb";
import useSearch from "../../Store/useSearch";
import { IoClose } from "react-icons/io5";
const pages = [
  { name: "All Tours", to: "/overview" },
  { name: "About", to: "/about" },
];

const settings = [
  { name: "Profile", to: "/profile" },
  { name: "Dashboard", to: "/dashboard" },
];

export default function Navbar() {
  const isLogged = useAuth((state) => state.isLogged);
  const user = useAuth((state) => state.user);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { search, setSearch, clearSearch } = useSearch((state) => state);
  if (location.pathname.includes("/tour") && search !== "") {
    navigate("/overview");
  }
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              textDecoration: "none",
            }}
          >
            <img src={Logo} alt="logo" className="w-[40px]" />
          </Typography>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
              aria-label="open menu"
            >
              <AiOutlineMenu />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  component={Link}
                  to={page.to}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              textDecoration: "none",
            }}
          >
            <img src={Logo} alt="logo" className="w-[40px]" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.to}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          {(location.pathname === "/overview" ||
            location.pathname.includes("/tour") ||
            location.pathname === "/dashboard/tours") && (
            <Box
              sx={{
                flexGrow: 1,
                maxWidth: 420,
                mx: 2,
                display: "flex",
              }}
            >
              <TextField
                size="small"
                placeholder="Search for a tour..."
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "rgba(255,255,255,0.18)",
                    color: "#fff",
                    borderRadius: 3,
                    px: 1,
                    backdropFilter: "blur(6px)",
                    "& fieldset": { borderColor: "transparent" },
                    "&:hover fieldset": {
                      borderColor: "rgba(255,255,255,0.4)",
                    },
                    "&.Mui-focused fieldset": { borderColor: "#fff" },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "rgba(255,255,255,0.8)",
                    opacity: 1,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TbMapPinSearch
                        style={{ color: "rgba(255,255,255,0.9)" }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IoClose
                        style={{
                          color: "rgba(255,255,255,0.9)",
                          cursor: "pointer",
                        }}
                        onClick={clearSearch}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}

          {isLogged && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar src={user?.photo?.url} />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                anchorOrigin={{ vertical: "center", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                {settings.map((item) => {
                  if (item.name === "Dashboard" && user.role !== "admin")
                    return null;

                  return (
                    <MenuItem
                      key={item.name}
                      onClick={() => {
                        handleCloseUserMenu();
                      }}
                      component={Link}
                      to={item.to}
                    >
                      <Typography textAlign="center">{item.name}</Typography>
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
          )}

          {!isLogged && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Button
                component={Link}
                to="/login"
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  bgcolor: "primary.dark",
                }}
              >
                login
              </Button>

              <Button
                component={Link}
                to="/signup"
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  bgcolor: "primary.dark",
                }}
              >
                Register
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
