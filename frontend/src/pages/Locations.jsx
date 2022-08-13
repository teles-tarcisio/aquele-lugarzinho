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
import LocationCard from '../components/LocationCard/LocationCard';
import * as api from '../services/api';

export default function Locations() {
  const [locationCards, setLocationCards] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { auth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    locationImageUrl: '',
  });
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

  function handleFormChange(ev) {
    setFormData({
      ...formData,
      [ev.target.name]: ev.target.value,
    });
  }

  async function handleSend() {
    if (!formData?.name || !formData?.address) {
      return alert('Favor preencher todos os campos obrigatórios');
    }
    const imgUpload = await api.uploadImage(selectedFile);
    setFormData({
      ...formData,
      locationImageUrl: imgUpload.data.display_url,
    });

    try {
      await api.registerLocation(formData, auth.token);
      alert('Novo lugarzinho cadastrado com sucesso!');
      handleClose();
      navigate('/home/locations');
    } catch (error) {
      alert(`Erro ao cadastrar novo local: ${error.response.data}`);
    }
  }

  return (
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
            onChange={handleFormChange}
            margin="dense"
            id="name"
            name="name"
            required
            label="Nome do lugar"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            onChange={handleFormChange}
            id="address"
            name="address"
            required
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
            <LocationCard cardContent={card} />
          </Grid>
        ))}
      </Grid>
      {console.log(locationCards, '<<locCards')}
    </Container>
  );
}
