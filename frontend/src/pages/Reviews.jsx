import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Input,
  TextField,
} from '@mui/material';
import ReviewCard from '../components/ReviewCard/ReviewCard';
import AuthContext from '../contexts/AuthContext';
import * as api from '../services/api';

export default function Reviews() {
  const [cards, setCards] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const reviewCards = api.getReviews(auth.token);
    reviewCards.then((response) => (
      setCards(response.data)
    ));
  }, [auth]);

  function handleAddReview() {
    setOpenDialog(true);
  }

  function handleClose() {
    setOpenDialog(false);
  }

  function handleFileChange(ev) {
    setSelectedFile(ev.target.files[0]);
  }

  async function handleSend() {
    const imgUpload = await api.uploadImage(selectedFile);
    console.log(imgUpload.data.display_url);
  }

  return (
    <>
      {console.log(cards, '<<<<reviews')}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Button
          key="add-location-button"
          sx={{ bgcolor: '#388E3c' }}
          variant="contained"
          onClick={handleAddReview}
          id="add-location-button"
        >
          Adicionar Avaliação
        </Button>
        adicionar avaliação ao clicar num local!
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>Nova Avaliação</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Conta aí o que você comeu de tão bom que todo mundo precisa conhecer!
            </DialogContentText>
            <TextField
              margin="dense"
              id="title"
              label="Prato/comida"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="description"
              label="Sua opinião sincera"
              type="text"
              fullWidth
              variant="standard"
            />
            Uma imagem pra dar fome:
            <Input
              margin="dense"
              id="image"
              type="file"
              accept="image/*"
              fullWidth
              onChange={handleFileChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleSend}>Enviar</Button>
          </DialogActions>
        </Dialog>
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card.id} xs={12} sm={6} md={4}>
              <ReviewCard cardContent={card} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
