import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  TextField,
  Typography,
} from '@mui/material';
import AuthContext from '../../contexts/AuthContext';
import * as api from '../../services/api';

export default function LocationCard({ cardContent }) {
  const { auth } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    reviewText: '',
    locationId: '',
    reviewImageUrl: '',
  });
  const navigate = useNavigate();

  function handleAddReview() {
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
      locationId: cardContent.id,
      [ev.target.name]: ev.target.value,
    });
  }

  async function handleSend() {
    if (!formData?.reviewText) {
      return alert('Favor preencher todos os campos obrigatórios');
    }
    const imgUpload = await api.uploadImage(selectedFile);
    setFormData({
      ...formData,
      reviewImageUrl: imgUpload.data.display_url,
    });
    console.log(formData, '<<<COM URL');

    try {
      await api.registerReview(formData, auth.token);
      alert('Nova avaliação cadastrada com sucesso!');
      handleClose();
      navigate('/home/reviews');
    } catch (error) {
      alert(`Erro ao cadastrar nova avaliação: ${error.response.data}`);
    }
  }
  return (
    <>
      {console.log(formData, '<<<<formData')}
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        onClick={handleAddReview}
      >
        <CardMedia
          component="img"
          sx={{
            // 16:9
            pt: '5%',
          }}
          image={cardContent.locationImageUrl}
          alt="reviewlocation picture"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography>
            {cardContent.name}
          </Typography>
          <Typography>
            {cardContent.address}
          </Typography>
        </CardContent>
      </Card>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{`Nova Avaliação de ${cardContent.name}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Conta aí o que você comeu de bom que todo mundo precisa conhecer!
          </DialogContentText>
          {/* <TextField
            margin="dense"
            id="title"
            name="reviewTitle"
            label="Prato/comida"
            type="text"
            fullWidth
            variant="standard"
          /> */}
          <TextField
            margin="dense"
            onChange={handleFormChange}
            required
            id="description"
            name="reviewText"
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
    </>
  );
}
