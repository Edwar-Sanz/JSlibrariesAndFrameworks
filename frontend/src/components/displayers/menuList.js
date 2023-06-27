import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from '@mui/material';

function MenuList({ text, link }) {
  return (
    <Link underline="none" rel="noreferrer" href={link} >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            {text}
          </ListItemButton>
        </ListItem>
      </List>
    </Link>
  );
}


export default function MenuDreawer({isOpen, closeDrawer}) {

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={closeDrawer}
      onKeyDown={closeDrawer}
    >
      <MenuList text={"hola"} link={"#"}/>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={closeDrawer}
      >
        {list}
      </Drawer>
    </div>
  );
}
