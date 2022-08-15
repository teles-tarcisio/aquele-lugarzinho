/* eslint-disable no-unused-vars */
import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
} from '@mui/material';

export default function TopBar({ logout }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          bgcolor: 'primary',
          borderRadius: '12px',
        }}
        position="static"
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home/reviews"
            sx={{
              flexGrow: 1,
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
            sx={{
              textTransform: 'none',
            }}
          >
            sair
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
