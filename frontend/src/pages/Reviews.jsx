import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
} from '@mui/material';
import ReviewCard from '../components/ReviewCard/ReviewCard';
import AuthContext from '../contexts/AuthContext';
import * as api from '../services/api';

export default function Reviews() {
  const [cards, setCards] = useState([]);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const reviewCards = api.getReviews(auth.token);
    reviewCards.then((response) => (
      setCards(response.data)
    ));
  }, [auth]);

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={4}>
            <ReviewCard cardContent={card} />
          </Grid>
        ))}
      </Grid>
      {console.log(cards, '<<<reviewcards')}
    </Container>
  );
}
