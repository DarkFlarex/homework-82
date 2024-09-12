import {AppBar, Container, Grid, styled, Toolbar, Typography} from '@mui/material';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  return (
    <AppBar position="sticky" sx={{ mb: 2 }}>
      <Toolbar>
        <Container maxWidth="xl">
          <Grid justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <StyledLink to="/">Music</StyledLink>
            </Typography>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
