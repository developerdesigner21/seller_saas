import React,{useEffect,useState} from "react";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import BroadcastOnHomeIcon from "@mui/icons-material/BroadcastOnHome";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import MoreIcon from "@mui/icons-material/More";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { useLocation, useNavigate } from "react-router-dom";

const categories = [
  {
    id: "",
    children: [
      {
        id: "Dashboard",
        icon: <DashboardIcon />,
        link: "/user"
      },
    ],
  },
  {
    id: "Product Research",
    children: [
      { id: "PDF Manage", icon: <PictureAsPdfIcon />, link: "/user/managePdf" },
      { id: "Product Search", icon: <QueryStatsIcon />, link: "/user/searchProduct" }
    ],
  }
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

const arrowStyle = {
  color: "rgba(255, 255, 255, 0.7)",
};

export default function Navigator(props) {
  const navigate = useNavigate()
  const location = useLocation();
  const [currentPath ,setCurrentPath] = useState("/");

  useEffect(() => {
    setCurrentPath(location.pathname)
  }, [location.pathname]);

  const { isDrawer, isNavOpen, setIsNavOpen, ...other } = props;

  const handleChangeTab = (link) =>{
    navigate(link)
    isDrawer && props.onClose()
  }

  return (
    <Drawer variant="permanent" {...other}>
      {isNavOpen ? (
        <div style={{ height: "100vh", position: "relative" }}>
          <List disablePadding>
            <ListItem
              sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}
            >
              User
            </ListItem>
            {categories.map(({ id, children }) => (
              <Box key={id} sx={{ bgcolor: "#101F33" }}>
                {id === "" ? (
                  <>
                    {children.map(({ id: childId, icon, link }) => (
                      <ListItem disablePadding key={childId} sx={{ pt: 2 }}>
                        <ListItemButton selected={currentPath===link} sx={item} onClick={()=>{handleChangeTab(link)}}>
                          <ListItemIcon>{icon}</ListItemIcon>
                          <ListItemText>{childId}</ListItemText>
                        </ListItemButton>
                      </ListItem>
                    ))}
                    <Divider sx={{ mt: 2 }} />
                  </>
                ) : (
                  <>
                    <ListItem sx={{ py: 2, px: 3 }}>
                      <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
                    </ListItem>
                    {children.map(({ id: childId, icon, link }) => (
                      <ListItem disablePadding key={childId}>
                        <ListItemButton selected={currentPath===link} sx={item} onClick={()=>{handleChangeTab(link)}}>
                          <ListItemIcon>{icon}</ListItemIcon>
                          <ListItemText>{childId}</ListItemText>
                        </ListItemButton>
                      </ListItem>
                    ))}
                    <Divider sx={{ mt: 2 }} />
                  </>
                )}
              </Box>
            ))}
          </List>
          {!isDrawer && (
            <ListItemButton
              selected={false}
              sx={arrowStyle}
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                padding: "13px",
              }}
              onClick={() => {
                setIsNavOpen(false);
              }}
            >
              <ArrowBackIosNewIcon />
            </ListItemButton>
          )}
        </div>
      ) : (
        <div style={{ height: "100vh", position: "relative" }}>
          <List disablePadding>
            {categories.map(({ id, children }) => (
              <Box key={id} sx={{ bgcolor: "#101F33" }}>
                {id === "" ? (
                  <>
                    <Divider sx={{ mt: 0 }} />
                    {children.map(({ id: childId, icon, link }) => (
                      <ListItem disablePadding key={childId} sx={{ py: 1 }}>
                        <ListItemButton
                          selected={currentPath===link}
                          sx={item}
                          style={{ paddingLeft: "15px" }}
                          onClick={()=>{handleChangeTab(link)}}
                        >
                          <ListItemIcon>{icon}</ListItemIcon>
                        </ListItemButton>
                      </ListItem>
                    ))}
                    <Divider sx={{ mt: 0 }} />
                  </>
                ) : (
                  <>
                    {children.map(({ id: childId, icon, link }) => (
                      <ListItem disablePadding key={childId} sx={{ py: 1 }}>
                        <ListItemButton
                          selected={currentPath===link}
                          sx={item}
                          style={{ paddingLeft: "15px" }}
                          onClick={()=>{handleChangeTab(link)}}
                        >
                          <ListItemIcon>{icon}</ListItemIcon>
                        </ListItemButton>
                      </ListItem>
                    ))}
                    <Divider sx={{ mt: 0 }} />
                  </>
                )}
              </Box>
            ))}
          </List>
          {!isDrawer && (
            <ListItemButton
              selected={false}
              sx={arrowStyle}
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                padding: "13px",
              }}
              onClick={() => {
                setIsNavOpen(true);
              }}
            >
              <ArrowForwardIosIcon />
            </ListItemButton>
          )}
        </div>
      )}
    </Drawer>
  );
}
