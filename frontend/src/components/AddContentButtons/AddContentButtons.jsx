/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Stack,
  TextField,
} from '@mui/material';
import * as api from '../../services/api';

export default function AddContentButtons({ auth }) {
  const [locationDialog, setLocationDialog] = useState(false);
  const [reviewDialog, setReviewDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [chosenLocation, setChosenLocation] = useState(null);
  const [inputLocation, setInputLocation] = useState('');
  const [locationsArray, setLocationsArray] = useState([]);

  function handleAddLocation() {
    setLocationDialog(true);
    setReviewDialog(false);
  }

  function handleAddReview() {
    setReviewDialog(true);
    setLocationDialog(false);
  }

  function handleClose() {
    setLocationDialog(false);
    setReviewDialog(false);
  }

  function handleFileChange(ev) {
    setSelectedFile(ev.target.files[0]);
  }

  async function handleSend() {
    const imgUpload = await api.uploadImage(selectedFile);
    console.log(imgUpload.data.display_url);
  }

  useEffect(() => {
    const allLocations = api.getLocations(auth.token);
    allLocations.then((response) => {
      setLocationsArray(response.data);
      console.log(response.data);
    });
  }, [auth]);

  return (
    <>
      <Stack
        sx={{ pt: 4 }}
        direction="row"
        spacing={4}
        justifyContent="center"
      >
        <Button
          key="add-location-button"
          sx={{ bgcolor: '#388E3c' }}
          variant="contained"
          onClick={handleAddLocation}
          id="add-location-button"
        >
          Adicionar &ldquo;Lugarzinho&rdquo;
        </Button>
        <Button
          key="add-review-button"
          sx={{ bgcolor: '#388E3c' }}
          variant="contained"
          onClick={handleAddReview}
          id="add-review-button"
        >
          Adicionar Avaliação
        </Button>
      </Stack>
      <Dialog open={locationDialog} onClose={handleClose}>
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
          Imagem:
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
      <Dialog open={reviewDialog} onClose={handleClose}>
        <DialogTitle>Nova Avaliação</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Conta aí o que você comeu de tão bom que todo mundo precisa conhecer!
          </DialogContentText>
          <Autocomplete
            value={chosenLocation}
            onChange={(event, newChosenLocation) => {
              setChosenLocation(newChosenLocation);
            }}
            inputValue={inputLocation}
            onInputChange={(event, newInputLocation) => {
              setInputLocation(newInputLocation);
            }}
            id="controllable-states-demo"
            options={locationsArray.map((location) => location.name)}
            fullWidth
            renderInput={(params) => <TextField {...params} label="Lugarzinho" />}
          />
          {console.log(chosenLocation, inputLocation)}
          Imagem:
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
