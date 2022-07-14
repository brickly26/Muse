import React from "react";
import {
  AppBar,
  IconButton,
  ButtonBase,
  Toolbar,
  Typography,
  Button,
  styled,
  Avatar,
  Switch,
  Box,
  Badge
} from "@mui/material";
import { MusicNote, Notifications, DarkMode } from "@mui/icons-material";

const Navbar = () => {
  const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  }));

  return (
    <AppBar position="">
      <Toolbar>
        <ButtonBase
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MusicNote />
          <Typography
            ml={2}
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: "none", sm: "block" },
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Muse
          </Typography>
        </ButtonBase>
        <Button variant="contained" color="success">
          Search
        </Button>
        <Box>
          <IconButton>
            <Badge >
              <Notifications />
            </Badge>
          </IconButton>
          <UserBox>
            <Avatar
              sx={{ width: 30, height: 30 }}
              src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              onClick={() => {}}
            />
            <Typography variant="span">Burak</Typography>
          </UserBox>
          <Switch defaultChecked color="default" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
