/* eslint-disable no-unused-vars */
import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
} from '@mui/material';

export default function TopBar() {
  return (
    <AppBar sx={{ bgcolor: 'primary', borderRadius: '12px' }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
