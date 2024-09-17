import React, { useState } from 'react';
import { Button, Grid, Menu, MenuItem } from '@mui/material';
import {User} from "../../types";

interface  Props {
  user: User;
}

const UserMenu:React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () =>{
    setAnchorEl(null);
  };

  return (
      <Grid item>
        <Button onClick={handleClick} color="inherit">
          Hello, {user.username}!
        </Button>
        <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted>
          <MenuItem>{user.username}</MenuItem>
        </Menu>
      </Grid>
  );
};

export default UserMenu;