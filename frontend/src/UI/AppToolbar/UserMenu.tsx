import React from 'react';
import {Button, Grid, Typography} from '@mui/material';
import {User} from "../../types";
import {logout} from "../../features/users/usersThunks";
import {useAppDispatch} from "../../app/hooks";
import {NavLink, useNavigate} from "react-router-dom";
import {fetchArtists} from "../../features/artists/artistsThunks";

interface  Props {
  user: User;
}

const UserMenu:React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logout());
        await dispatch(fetchArtists()).unwrap();
        navigate('/');
    };

  return (
      <Grid container alignItems="center" spacing={2} direction="row">
          <Grid item>
              <Typography color="inherit">
                  Hello, {user.username}!
              </Typography>
          </Grid>
          <Grid item>
              <Button component={NavLink} to="/artists/new" color="inherit">
                  Add new Artist
              </Button>
          </Grid>
          <Grid item>
              <Button component={NavLink} to="/albums/new" color="inherit">
                  Add new Albums
              </Button>
          </Grid>
          <Grid item>
              <Button component={NavLink} to="/tracks/new" color="inherit">
                  Add new Tracks
              </Button>
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