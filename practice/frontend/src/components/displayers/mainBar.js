import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuDreawer from "./menuList"
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function MainBar({children, titulo, notLogin}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleDrawer = () => {setIsOpen(!isOpen);};
  const closeDrawer = () => {setIsOpen(false);};

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton  onClick={handleDrawer} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {titulo}
          </Typography>
          {notLogin ?
            <>
            <Button href="/registro" color="inherit">Registrar</Button>
            <Button href="/ingreso" color="inherit">Ingresar</Button>
            </>
            :
            <Button href="/" color="inherit">salir</Button>
          }
        </Toolbar>
      </AppBar>
          <Box component="div">
            <MenuDreawer isOpen={isOpen} closeDrawer={closeDrawer} />
            {children}
          </Box>
    </Box>
  );
}

MainBar.defaultProps = { notLogin: false};

export default MainBar;