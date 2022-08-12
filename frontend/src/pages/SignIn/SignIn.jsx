import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AuthContext from '../../contexts/AuthContext';
import * as api from '../../services/api';
import BackgroundCollage from '../../components/BackgroundCollage/BackgroundCollage';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { auth, loginUser } = useContext(AuthContext);

  function handleFormChange(ev) {
    setFormData({
      ...formData,
      [ev.target.name]: ev.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      !formData?.email || !formData?.password) {
      return alert('Favor preencher todos os campos');
    }
    try {
      const login = await api.signUser(formData);
      loginUser({ token: login.data });
      navigate('/home');
    } catch (error) {
      alert(`Erro: ${error.response.data}`);
    }
  }

  useEffect(() => {
    if (auth) {
      return navigate('/home');
    }
  }, [auth]);

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
            Acessar
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                <Link href="/sign-up" variant="body2">
                  Não tem cadastro? Cadastre-se
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>

    </Grid>
  );
}
