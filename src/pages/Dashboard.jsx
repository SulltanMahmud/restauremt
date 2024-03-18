import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
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
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import UseLoader from "../components/loader/UseLoader.jsx";
import { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import CartComponent from "../components/CartComponent.jsx";
import LogoImg from '../assets/logo.png';


const drawerWidth = 255.5;

const primaryPropsStyle = {
  fontFamily: "'Josefin Sans', sans-serif !important",
  fontSize: "13px",
  fontWeight: "600 !important",
};

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  position: "sticky"
}));

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [loader, showLoader, hideLoader] = UseLoader();
  const [activeItem, setActiveItem] = useState(null);
  const isScreenSmall = useMediaQuery("(max-width:1280px)");


  const handleModalToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    setOpen(!isScreenSmall);
  }, [isScreenSmall]);

  const handleListItemClick = (index) => {
    setActiveItem(index);
    if (isScreenSmall) {
      handleModalToggle();
    }
  };


  const logout = () => {
    showLoader();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    const navigate = useNavigate();
    hideLoader();
    navigate("/logout");
  };

  return (
    <>
      <div>
        <Box sx={{ display: "flex", overflow: "auto" }}>
          <CssBaseline />
          <AppBar position="fixed" style={{ zIndex: 9999999, paddingLeft: isScreenSmall ? "0px" : drawerWidth }} >
            <Toolbar className="toolBarStyle">
              <div className="appBar-logo-container">
                <img
                  src={LogoImg}
                  alt="icon"
                  className="appBar-logo"
                />
                <p className="appBarTitle">BSS RESTAURANT</p>
              </div>

              <Button className="appBarAdmin">Admin</Button>

              <div className="relative customCartStyle">
                <CartComponent></CartComponent>
              </div>

              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleModalToggle}
                edge="start"
                className="hamburger-menu"
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <Drawer
            sx={{
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
              zIndex: 99999999,
              position: "sticky",
              top: 0,
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
                      onClick={() =>  handleListItemClick(1)}
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

          <Main className="main-body" style={{ padding: 0, paddingLeft: isScreenSmall ? "0px" : drawerWidth }}>
            <DrawerHeader />
            <Outlet />
          </Main>
        </Box>
        {loader}
      </div>
    </>
  );
}