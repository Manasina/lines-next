import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Stack from "@mui/material/Stack"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Link from "next/link"
import { useState } from "react"

const drawerWidth = 240

export default function HeaderUnauthenticated() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" noWrap component="div">
          ECONOMIE
        </Typography>
      </Box>
      <Divider />
      <List>
        <Link href="/">
          <ListItem button>
            <ListItemText primary="Uploads" />
          </ListItem>
        </Link>
        <Link href="/listes">
          <ListItem button>
            <ListItemText primary="Listes" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link href="auth/register">
          <ListItem button>
            <ListItemText primary="Register" />
          </ListItem>
        </Link>
        <Link href="auth/login">
          <ListItem button>
            <ListItemText primary="Login" />
          </ListItem>
        </Link>
      </List>
    </Box>
  )

  return (
    <>
      <AppBar color="inherit" position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ mr: 2, display: { xs: "block", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="menu appbar"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
              ECONOMIE
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link href="/">
                <Button
                  sx={{ my: 2, color: "text.secondary", display: "block" }}
                >
                  Uploads
                </Button>
              </Link>
              <Link href="/listes">
                <Button
                  sx={{ my: 2, color: "text.secondary", display: "block" }}
                >
                  Listes
                </Button>
              </Link>
            </Box>
            <Stack
              direction="row"
              spacing={1}
              sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}
            >
              <Link href="auth/register">
                <Button variant="outlined">Register</Button>
              </Link>
              <Link href="auth/login">
                <Button variant="contained">Login</Button>
              </Link>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  )
}
