import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import TopBar from '../../components/TopBar/TopBar';
import ReviewCard from '../../components/ReviewCard/ReviewCard';
import AddContentButtons from '../../components/AddContentButtons/AddContentButtons';
// import CategoryButtons from '../../components/CategoryButtons/CategoryButtons';

import AuthContext from '../../contexts/AuthContext';
import * as api from '../../services/api';

export default function Home() {
  // const [filter, setFilter] = useState('');
  const [cards, setCards] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  /*
  function handleLogout() {
    logoutUser();
    navigate('/');
  }
  */

  useEffect(() => {
    if (!auth) {
      alert('Você precisa estar logado para acessar este conteúdo.');
      return navigate('/');
    }
    const reviewCards = api.getReviews(auth.token);
    reviewCards.then((response) => (
      setCards(response.data)
    ));
  }, [auth/* , filter */]);

  return (
    <>
      <TopBar />
      {console.log(cards, '<<<<')}
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

            <AddContentButtons token={auth.token} />
            {/* <CategoryButtons token={auth.token} setFilter={setFilter} /> */}

          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <ReviewCard cardContent={card} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}
