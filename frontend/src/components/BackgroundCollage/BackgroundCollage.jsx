import React from 'react';
import Grid from '@mui/material/Grid';
import SignInImage from '../../assets/images/colagem-culinaria-mundo.jpg';

export default function BackgroundCollage() {
  return (
    <Grid
      item
      xs={false}
      sm={4}
      md={7}
      sx={{
        backgroundImage: `url(${SignInImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  );
}
