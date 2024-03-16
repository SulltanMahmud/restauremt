import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import PeopleIcon from "@mui/icons-material/People";
import TableBarIcon from "@mui/icons-material/TableBar";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LoggedinUserInfo from "../components/userinfo/LoggedinUserInfo";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
const drawerWidth = 255.5;

const primaryPropsStyle = {
  fontFamily: "'Josefin Sans', sans-serif !important",
  fontSize: "13px",
  fontWeight: "600 !important",
};
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
export default function CustomDrawer() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);
  const handleListItemClick = (index) => {
    setActiveItem(index);
    
  };
  const handleMenuItemClick = () => {
    setIsModalOpen(false); // Close the modal when a menu item is clicked
  };
  const logout = () => {
    prompt("ghghghd");
    showLoader();
    const token = localStorage.getItem("token")
    console.log(token)
    localStorage.removeItem("user");
    
    navigate("/login");
    hideLoader();
    
  };

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
          zIndex: 99999999,
          position: "sticky",
          top: 0
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <LoggedinUserInfo />
        </DrawerHeader>
        <Divider />

        <Box className="drawerListBoxStyle">
          <List>
            <Box sx={{ padding: "0px 8px" }}>
              <Link to={""}>
                <ListItem
                  disablePadding
                  sx={{ "&:hover": { background: "none !imporatant" } }}
                  className={activeItem === 1 ? "itemBackground" : ""}
                  onClick={() => {handleListItemClick(1); handleMenuItemClick();}}
                >
                  <ListItemButton className="listItemButtonStyle">
                    <ListItemIcon className="menuIcon">
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText
                      className="menuItem"
                      primary="Employees"
                      primaryTypographyProps={primaryPropsStyle}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to={"table-list"}>
                <ListItem
                  disablePadding
                  sx={{ "&:hover": { background: "none !imporatant" } }}
                  className={activeItem === 2 ? "itemBackground" : ""}
                  onClick={() => handleListItemClick(2)}
                >
                  <ListItemButton className="listItemButtonStyle">
                    <ListItemIcon className="menuIcon">
                      <TableBarIcon />
                    </ListItemIcon>
                    <ListItemText
                      className="menuItem"
                      primary="Tables"
                      primaryTypographyProps={primaryPropsStyle}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to={"food-list"}>
                <ListItem
                  disablePadding
                  sx={{ "&:hover": { background: "none !imporatant" } }}
                  className={activeItem === 3 ? "itemBackground" : ""}
                  onClick={() => handleListItemClick(3)}
                >
                  <ListItemButton className="listItemButtonStyle">
                    <ListItemIcon className="menuIcon">
                      <FastfoodIcon />
                    </ListItemIcon>
                    <ListItemText
                      className="menuItem"
                      primary="Foods"
                      primaryTypographyProps={primaryPropsStyle}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to={"order-list"}>
                <ListItem
                  disablePadding
                  sx={{ "&:hover": { background: "none !imporatant" } }}
                  className={activeItem === 4 ? "itemBackground" : ""}
                  onClick={() => handleListItemClick(4)}
                >
                  <ListItemButton className="listItemButtonStyle">
                    <ListItemIcon className="menuIcon">
                      <LocalMallIcon />
                    </ListItemIcon>
                    <ListItemText
                      className="menuItem"
                      primary="New Oder"
                      primaryTypographyProps={primaryPropsStyle}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to={"all-orders-list"}>
                <ListItem
                  disablePadding
                  sx={{ "&:hover": { background: "none !imporatant" } }}
                  className={activeItem === 5 ? "itemBackground" : ""}
                  onClick={() => handleListItemClick(5)}
                >
                  <ListItemButton className="listItemButtonStyle">
                    <ListItemIcon className="menuIcon">
                      <FormatListBulletedIcon />
                    </ListItemIcon>
                    <ListItemText
                      className="menuItem"
                      primary="Orders"
                      primaryTypographyProps={primaryPropsStyle}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            </Box>
          </List>
          <List sx={{ marginTop: "auto" }}>
            <Box>
              <Link onClick={logout}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      padding: "0px 12px !important",
                      marginBottom: "12px !important",
                    }}
                  >
                    <Button
                      startIcon={<ExitToAppIcon />}
                      fullWidth
                      variant="outlined"
                      className="btnLogoutStyle"
                    >
                      Logout
                    </Button>
                  </ListItemButton>
                </ListItem>
              </Link>
            </Box>
          </List>
        </Box>
      </Drawer>
    </>
  )
}
