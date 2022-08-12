import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import {
  Avatar,
  Button,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Input,
  Typography,
} from '@mui/material';
import * as api from '../services/api';
import BackgroundCollage from '../components/BackgroundCollage/BackgroundCollage';

export default function SignUpSide() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repeatedPassword: '',
    userImageUrl: '',
  });
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFormChange(ev) {
    setFormData({
      ...formData,
      [ev.target.name]: ev.target.value,
    });
  }

  function handleFileChange(ev) {
    setSelectedFile(ev.target.files[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      !formData?.email || !formData?.password
      || !formData?.name || !formData?.repeatedPassword) {
      return alert('Favor preencher todos os campos obrigatórios');
    }

    if (formData.repeatedPassword !== formData.password) {
      return alert('As senhas não conferem, tente novamente');
    }

    const imgUpload = await api.uploadImage(selectedFile);
    const imgUrl = imgUpload.data.display_url;
    setFormData({
      ...formData,
      userImageUrl: imgUrl,
    });
    try {
      await api.registerUser(formData);
      alert('Cadastro efetuado com sucesso, por favor faça login');
      navigate('/');
    } catch (error) {
      alert(`Erro: ${error.response.data}`);
    }
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <BackgroundCollage />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#388E3c' }}>
            <RestaurantIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Cadastro
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              onChange={handleFormChange}
              margin="normal"
              required
              fullWidth
              id="name"
              type="text"
              label="Apelido"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              onChange={handleFormChange}
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={handleFormChange}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              onChange={handleFormChange}
              margin="normal"
              required
              fullWidth
              name="repeatedPassword"
              label="Repita a Senha"
              type="password"
              id="repeatedPassword"
              autoComplete="current-password"
            />
            <Typography variant="p" color="text.secondary" paragraph>
              Imagem do Perfil (opcional):
            </Typography>
            <Input
              margin="dense"
              id="image"
              type="file"
              accept="image/*"
              fullWidth
              onChange={handleFileChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#388E3c' }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  Já tem cadastro? Acesse
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
