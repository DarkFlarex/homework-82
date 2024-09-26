import React from 'react';
import {Button, Grid, Typography} from '@mui/material';
import {User} from "../../types";
import {logout} from "../../features/users/usersThunks";
import {useAppDispatch} from "../../app/hooks";

interface  Props {
  user: User;
}

const UserMenu:React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

  return (
      <Grid container alignItems="center" spacing={2} direction="row">
          <Grid item>
              <Typography color="inherit">
                  Hello, {user.username}!
              </Typography>
          </Grid>
          <Grid item>
              <Button onClick={handleLogout} color="inherit">
                  Logout
              </Button>
          </Grid>
      </Grid>
  );
};

export default UserMenu;