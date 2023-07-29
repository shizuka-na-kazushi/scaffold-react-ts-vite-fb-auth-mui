import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import { AuthContext, AuthLoginState } from './authProvider';
import ColoredAvatar from './coloredAvator';
import { Link } from 'react-router-dom';

const pages_template = [
  { text: 'Profile', link: '/profile' },
  { text: 'Blog', link: '/blog' },
];

const settings = [
  { text: 'Profile', link: '/profile' },
  { text: 'Logout', link: '/logout' },
];

const siteTitle = 'Project name'


const AppBarAvatar = () => {

  const { currentUserInfo } = React.useContext(AuthContext)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const location = useLocation()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (_href?: string) => {
    setAnchorElUser(null);
    // href && navigate(href, {state: {from: location.pathname}})
  };

  return (
    <Box sx={{ flexGrow: 0 }}>

      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {/* 
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            */}
          <ColoredAvatar
            name={currentUserInfo && currentUserInfo.name}
            email={currentUserInfo && currentUserInfo.email}
            disableTooltip />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={() => handleCloseUserMenu()}
      >
        {settings.map((setting) => (
          <MenuItem key={setting.text} component={Link} to={setting.link} state={{ from: location.pathname }}>
            <Typography textAlign="center">{setting.text}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

const LoginSignInMenu = () => {
  const location = useLocation()

  return (
    <Box>
      <Button component={Link} to='/login' state={{ from: location.pathname }}>Login</Button>
      <Button component={Link} to='/createUser' state={{ from: location.pathname }}>Register</Button>
    </Box>
  )
}


const AppMenuBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const location = useLocation()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (_href?: string) => {
    setAnchorElNav(null);
    // href && navigate(href, {state: {from: location.pathname}})
  };

  const { authState } = React.useContext(AuthContext)

  const pages: { text: string, link: string }[] = [];
  pages_template.forEach((p) => {
    let data: { text: string, link: string } = p
    pages.push(data)
  })

  return (
    <AppBar position="static" color='transparent'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {siteTitle}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => { handleCloseNavMenu() }}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.text} component={Link} to={page.link} state={{ from: location.pathname }}>
                  <Typography textAlign="center">{page.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {siteTitle}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                component={Link}
                to={page.link}
                state={{ from: location.pathname }}
                key={page.text}
                onClick={() => { handleCloseNavMenu() }}
                sx={{ my: 2, color: 'primary', display: 'block' }}
              >
                {page.text}
              </Button>
            ))}
          </Box>

          {
            (authState === AuthLoginState.Authorized) ?
              (<AppBarAvatar></AppBarAvatar>) :       //　ログイン済み
              (<LoginSignInMenu></LoginSignInMenu>)   // 未ログイン
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppMenuBar;