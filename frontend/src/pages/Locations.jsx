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
import AuthContext from '../contexts/AuthContext';
import ReviewCard from '../components/ReviewCard/ReviewCard';
import * as api from '../services/api';

export default function Locations() {
  const [locationCards, setLocationCards] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const cards = api.getLocations(auth.token);
    cards.then((response) => (
      setLocationCards(response.data)
    ));
  }, [auth]);

  function handleAddLocation() {
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
      {console.log(locationCards, '<<<<locations')}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Button
          key="add-location-button"
          sx={{ bgcolor: '#388E3c' }}
          variant="contained"
          onClick={handleAddLocation}
          id="add-location-button"
        >
          Adicionar &ldquo;Lugarzinho&rdquo;
        </Button>
        <Dialog open={openDialog} onClose={handleClose}>
          <DialogTitle>Novo Lugarzinho</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Descobriu um lugar novo que te ganhou? Espalhe a novidade!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nome do lugar"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="name"
              label="Endereço do lugar"
              type="text"
              fullWidth
              variant="standard"
            />
            Imagem (opcional):
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
          {locationCards.map((card) => (
            <Grid item key={card.id} xs={12} sm={6} md={4}>
              <ReviewCard cardContent={card} />
              locationCard
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
