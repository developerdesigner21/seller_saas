import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Navigator from "./Sidebar/Navigator";
import Header from "./Header/Header";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Content/Dashboard/Dashboard";
import ManagePdf from "./Content/ProductResearch/ManagePdf/ManagePdf";
import SearchProduct from "./Content/ProductResearch/SearchProduct/SearchProduct";

let theme = createTheme({
  palette: {
    primary: {
      light: "#63ccff",
      main: "#009be5",
      dark: "#006db3",
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#081627",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        contained: {
          boxShadow: "none",
          "&:active": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          margin: "0 16px",
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up("md")]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(255,255,255,0.15)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#4fc3f7",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
          minWidth: "auto",
          marginRight: theme.spacing(2),
          "& svg": {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
};

export default function User() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  let drawerWidth = isNavOpen ? 256 : 50;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: 256 } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              isNavOpen={true}
              isDrawer={true}
            />
          )}

          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: "block", xs: "none" } }}
            isNavOpen={isNavOpen}
            setIsNavOpen={setIsNavOpen}
            isDrawer={false}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }} >
          <Header onDrawerToggle={handleDrawerToggle} />
          <Box
            component="main"
          >
            <div style={{width:`calc(100vw - ${isSmUp ? (drawerWidth) : 0}px)`,height:`calc(100vh - 144px)`,overflow:"auto"}} >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/managePdf" element={<ManagePdf />} />
                <Route path="/searchProduct" element={<SearchProduct />} />
              </Routes>
            </div>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
