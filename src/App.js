import React from "react";
import {
  Route,
  Routes,
  Link,
  useLocation,
  BrowserRouter as Router,
} from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import MenuIcon from '@mui/icons-material/Menu';
import TodoList1 from "./components/SimpleTodo";
import TodoList2 from "./components/TodoDataG";
import Time from "./components/timer";
import "./styles/App.scss"; 
import TimerIcon from '@mui/icons-material/Timer';



import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";


const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const drawer = (
    <div className="drawer">
      <div sx={{ display: "flex", justifyContent: "flex-end"}}>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ ml: 1 }}
          aria-label="close drawer"
        >
        </IconButton>
      </div> 
      <Toolbar />
      <List >
        {/* TODO ONE HERE*/}
        <ListItem component={Link} to="/list1">
        <ListItemButton>
          <ListItemIcon>
            <ChecklistRtlIcon />
          </ListItemIcon>
          <ListItemText primary="Todo List One" />
        </ListItemButton>
        </ListItem>
      
      

        {/* TODO TWO HERE*/}
        <ListItem component={Link} to="/list2">
        <ListItemButton>
          <ListItemIcon>
            <ChecklistRtlIcon />
          </ListItemIcon>
          <ListItemText primary="Todo List Two" />
        </ListItemButton>
        </ListItem>
        <Divider />

        {/* TIMER TWO HERE*/}
        <ListItem component={Link} to="/Time">
        <ListItemButton>
          <ListItemIcon>
            <TimerIcon/>
          </ListItemIcon>
          <ListItemText primary="Timer" />
        </ListItemButton>
        </ListItem>
      </List>
    </div>
    
  );
  return (
    <div className={`App ${isDrawerOpen ? "drawer-open" : ""}`}>
      <Box
          className="main-content"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        ></Box>
       <Box sx={{ display: "flex" }}>

        {/* Side Navigation Drawer */}
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          variant="persistent"
          PaperProps={{
            style: {
              backgroundColor: '#ACBCFF',
            },
          }}
        >
          {drawer}
        </Drawer>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
          
          <Box
          className="main-content"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 1,
              pl: 2,
              pr: 3,
            }}
          >
            <IconButton 
              color="inherit"
              aria-label="toggle drawer"
              onClick={handleDrawerToggle}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Typography>Menu</Typography>
          </Box>
        </Box>
          </Toolbar>
         </AppBar>
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        {/* Side Navigation Drawer */}
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          variant="persistent"
          PaperProps={{
            style: {
              backgroundColor: '#ACBCFF',
            },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Content */}
        <Box
          className="main-content"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {/* Page Content */}
          <Routes>
            <Route path="/list1" element={<TodoList1 />} />
            <Route path="/list2" element={<TodoList2 />} />
            <Route path="/Time" element={<Time />} />
          </Routes>
        </Box>
      </Box>
    </div>
  );
};

export default App;
