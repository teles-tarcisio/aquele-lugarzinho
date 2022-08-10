import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import * as api from '../../services/api';

export default function AddContentButtons({ token }) {
  const [openDialog, setOpenDialog] = useState(false);

  function handleAddLocation(ev) {
    console.log(ev.target);
    setOpenDialog(true);
  }
  function handleClose() {
    setOpenDialog(false);
  }

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
      </Stack>
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
            autoFocus
            margin="dense"
            id="name"
            label="Endereço do lugar"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClose}>Enviar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
