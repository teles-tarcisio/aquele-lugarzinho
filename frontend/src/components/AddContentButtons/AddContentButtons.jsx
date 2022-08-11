/* eslint-disable no-restricted-syntax */
import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  InputLabel,
  Stack,
  TextField,
} from '@mui/material';
import * as api from '../../services/api';
import CustomUploadButton from './CustomUploadButton';

export default function AddContentButtons({ token }) {
  const [openDialog, setOpenDialog] = useState(false);
  const filesElement = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  function handleAddLocation(ev) {
    console.log(ev.target);
    setOpenDialog(true);
  }
  function handleClose() {
    setOpenDialog(false);
  }

  function handleFileChange(ev) {
    console.log(ev.target.files);
    setSelectedFile(ev.target.files[0]);
  }

  async function handleSend() {
    const body = new FormData();
    body.set('key', '34659037bd18afd2a6b33f03fbe71b5e');
    body.append('image', selectedFile);
    const result = await axios.post('https://api.imgbb.com/1/upload', body);
    console.log(result.data);
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
            margin="dense"
            id="name"
            label="Endereço do lugar"
            type="text"
            fullWidth
            variant="standard"
          />
          {/* <CustomUploadButton /> */}
          <Input
            margin="dense"
            id="image"
            label="Anexe sua imagem"
            type="file"
            ref={filesElement}
            accept="image/*"
            fullWidth
            variant="standard"
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
