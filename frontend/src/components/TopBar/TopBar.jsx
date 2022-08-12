/* eslint-disable no-unused-vars */
import React from 'react';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Container,
} from '@mui/material';

export default function TopBar({ logout }) {
  return (
    <AppBar sx={{ bgcolor: 'primary', borderRadius: '12px' }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home/reviews"
            sx={{
              mr: 2,
              display: { md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            aquele lugarzinho
          </Typography>
          <Button
            onClick={logout}
            color="inherit"
          >
            sair
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
