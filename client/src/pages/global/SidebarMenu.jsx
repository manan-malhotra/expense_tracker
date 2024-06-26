import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { sidebarMenu } from "../../constants/sidebarMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../../styles/theme";
import { useContext, useEffect, useState } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SidebarMenuItem from "./SidebarMenuItem";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import "react-pro-sidebar/dist/css/styles.css";
import axios from "axios";
const SidebarMenu = () => {
  const colorMode = useContext(ColorModeContext);
  const location = useLocation();
  const urlPathName = location.pathname;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState(urlPathName);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("user");
  const findLastNumber = (inputString) => {
    let lastNumber = null;

    for (let i = inputString.length - 1; i >= 0; i--) {
      if (!isNaN(parseInt(inputString[i]))) {
        lastNumber = parseInt(inputString[i]);
        break;
      }
    }

    return lastNumber + 5;
  };
  const id = findLastNumber(localStorage.getItem("id"));
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    axios.defaults.headers.common["Authorization"] = null;
    navigate("/");
  };
  useEffect(() => {
    setSelected(location.pathname);
    console.log("selected " + urlPathName);
  }, []);

  return (
    <>
      <Box
        sx={{
          "& .pro-sidebar-inner": {
            background: `${colors.primary[400]} !important`,
          },
          "& .pro-icon-wrapper": {
            backgroundColor: "transparent !important",
          },
          "& .pro-inner-item": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .pro-inner-item:hover": {
            color: "#868dfb !important",
          },
          "& .pro-menu-item.active": {
            color: "#6870fa !important",
          },
        }}
      >
        <ProSidebar collapsed={isCollapsed}>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={`https://raw.githubusercontent.com/manan-malhotra/heal.in-client/test/assets/avatars/male/${
                      id % 7
                    }.png`}
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                    }}
                  />
                </Box>

                <Box textAlign="center">
                  <Typography
                    variant="h2"
                    fontWeight="bold"
                    color={colors.grey[100]}
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {username}
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              {sidebarMenu.map((menu) =>
                menu.tag === "divider" ? (
                  <Typography
                    variant="h6"
                    key={menu.title}
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                  >
                    {menu.title}
                  </Typography>
                ) : (
                  <SidebarMenuItem
                    key={menu.title}
                    menu={menu}
                    selected={selected}
                    setSelected={setSelected}
                  />
                )
              )}
            </Box>
          </Menu>
          <Box
            display="flex"
            marginLeft="auto"
            marginRight="auto"
            marginTop="auto"
            marginBottom="5%"
          >
            <IconButton onClick={colorMode.toggleColorMode}>
              {
                // by user click toggle UI theme color...
                theme.palette.mode === "dark" ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <LightModeOutlinedIcon />
                )
              }
            </IconButton>

            <IconButton onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </ProSidebar>
      </Box>
    </>
  );
};

export default SidebarMenu;
