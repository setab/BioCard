import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
// import type { userType } from "@/types/user";

type NavLink = { label: string; to: string; params?: Record<string, string> };

interface AppDrawerProps {
  navLinks: NavLink[];
}

export default function AppDrawer({ navLinks }: AppDrawerProps) {
  const [open, setOpen] = React.useState(false);
  const auth = useAuth();

  const toggleDrawer = (state: boolean) => () => setOpen(state);

  return (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ m: 1 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          {navLinks.map((link) => (
            <ListItem key={link.to} disablePadding>
              <Link
                to={link.to}
                {...(link.params ? { params: link.params } : {})}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                }}
              >
                <ListItemButton onClick={toggleDrawer(true)}>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
          <ListItem key={"logout"}>
            <Link
              to={"/login"}
              onClick={() => {
                auth.logout();
                setOpen(false);
              }}
            >
              <Button onClick={toggleDrawer(true)}>
                <LogOut size={18} />
                <ListItemText primary={"Logout"} />
              </Button>
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
