import React from "react";
import {
  Box,
  Stack,
  Link,
  IconButton,
  useTheme,
  IconProps,
  Icon,
} from "@mui/material";
import NextLink from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import AppsIcon from "@mui/icons-material/Apps";
import PersonIcon from "@mui/icons-material/Person";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import MenuIcon from "@mui/icons-material/Menu";

interface CompactSidebarProps {
  onMenuClick: () => void;
}

interface NavItem {
  icon: React.ReactElement<IconProps>;
  path: string;
}

interface StackIconButtonProps {
  icon: React.ReactElement<IconProps>;
  path: string;
}

const CompactSidebar: React.FC<CompactSidebarProps> = ({ onMenuClick }) => {
  const theme = useTheme();

  const navItems: NavItem[] = [
    { icon: <HomeIcon />, path: "/" },
    { icon: <AppsIcon />, path: "/projects" },
    { icon: <PersonIcon />, path: "/about" },
    { icon: <ContactPageIcon />, path: "/contact" },
  ];

  const StackIconButton: React.FC<StackIconButtonProps> = ({ icon, path }) => {
    return (
      <Link href={path} component={NextLink} passHref underline="hover">
        <IconButton
          sx={{
            pl: 3,
            pr: 2,
            "&.Mui-selected": {
              bgcolor: theme.palette.action.focus,
              "& .MuiIconButton-root": {
                color: theme.palette.secondary.main,
              },
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            },
            "&:hover": {
              "& .MuiIconButton-root": {
                color: theme.palette.secondary.main,
              },
            },
          }}
        >
          <Icon sx={{ color: theme.palette.primary.light }}> {icon}</Icon>
        </IconButton>
      </Link>
    );
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        height: "100vh",
        width: theme.spacing(8),
        bgcolor: theme.palette.primary.dark,
      }}
    >
      <Stack spacing={2} direction="column" alignItems="right">
        {navItems.map(({ icon, path }) => (
          <StackIconButton key={path} icon={icon} path={path} />
        ))}
      </Stack>
    </Box>
  );
};

export default CompactSidebar;
