import BarChartIcon from '@mui/icons-material/BarChart';
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from '@mui/icons-material/Menu';
import PasswordIcon from '@mui/icons-material/Password';
import TimerIcon from '@mui/icons-material/Timer';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

//paths
import PasswordGenerator from "./components/PasswordGenerator";
import TodoList1 from "./components/SimpleTodo";
import TodoList2 from "./components/TodoDataG";
import Data from './components/data';
import Time from "./components/timer";
import logo from "./photos/logo.png";
import "./styles/App.scss";

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const drawer = (
    <div className="drawer">
      <div sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ ml: 22 }}
          aria-label="close drawer"
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
      <div className="logoAppBar">
        <img
          alt="logo"
          className="logo-icon"
          src={logo}
        />
      </div>
    
      <List>
        <ListItem component={Link} to="/list1">
          <ListItemButton>
            <ListItemIcon className='icons'>
              <ChecklistRtlIcon />
            </ListItemIcon>
            <ListItemText primary="Todo List One" className="hide-on-mobile" />
          </ListItemButton>
        </ListItem>

        <ListItem component={Link} to="/list2">
          <ListItemButton>
            <ListItemIcon className='icons'>
              <ChecklistRtlIcon />
            </ListItemIcon>
            <ListItemText primary="Todo List Two" className="hide-on-mobile" />
          </ListItemButton>
        </ListItem>
        <Divider />

        <ListItem component={Link} to="/Time">
          <ListItemButton>
            <ListItemIcon className='icons'>
              <TimerIcon />
            </ListItemIcon>
            <ListItemText primary="Timer" className="hide-on-mobile" />
          </ListItemButton>
        </ListItem>

        <ListItem component={Link} to="/PasswordGenerator">
          <ListItemButton>
            <ListItemIcon className='icons'>
              <PasswordIcon />
            </ListItemIcon>
            <ListItemText primary="Generator" className="hide-on-mobile" />
          </ListItemButton>
        </ListItem>

        <ListItem component={Link} to="/data">
          <ListItemButton>
            <ListItemIcon className='icons'>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Data" className="hide-on-mobile" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={`App ${isDrawerOpen ? "drawer-open" : ""}`}>
      <Box className="main-content" sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <AppBar className="appBar" position="fixed" open={isDrawerOpen}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              edge="start"
              sx={{ mr: 2, ...(isDrawerOpen && { display: 'none' }) }}
            >
              {isDrawerOpen ? <ChevronRightIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              React App!
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          variant="persistent"
        >
          {drawer}
        </Drawer>
        <Box className="main-content" sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Routes>
            <Route path="/list1" element={<TodoList1 />} />
            <Route path="/list2" element={<TodoList2 />} />
            <Route path="/Time" element={<Time />} />
            <Route path="/PasswordGenerator" element={<PasswordGenerator />} />
            <Route path="/data" element={<Data />} />
          </Routes>
        </Box>
      </Box>
    </div>
  );
};

export default App;
