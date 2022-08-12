import React, { useState, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import TopBar from '../components/TopBar/TopBar';
import AddContentButtons from '../components/AddContentButtons/AddContentButtons';
// import CategoryButtons from '../../components/CategoryButtons/CategoryButtons';

import AuthContext from '../contexts/AuthContext';
import * as api from '../services/api';

export default function Home() {
  // const [filter, setFilter] = useState('');
  const { auth, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!auth) {
    alert('Você precisa estar logado para acessar este conteúdo.');
    navigate('/');
  }

  function handleLogout() {
    logoutUser();
    navigate('/');
  }

  return (
    <>
      <TopBar logout={handleLogout} />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            my: 1,
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              e aí, achou um lugarzinho novo ou tá procurando aquela comida que conforta até a alma?
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={4}
              justifyContent="center"
            >
              <Button
                key="locations-button"
                sx={{ bgcolor: '#388E3c' }}
                variant="contained"
                onClick={() => navigate('/home/locations')}
                id="locations-button"
              >
                Locais
              </Button>
              <Button
                key="reviews-button"
                sx={{ bgcolor: '#388E3c' }}
                variant="contained"
                onClick={() => navigate('/home/reviews')}
                id="reviews-button"
              >
                Avaliações
              </Button>
            </Stack>
            <Outlet />
          </Container>
        </Box>
      </main>
    </>
  );
}
