import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import TopBar from '../../components/TopBar/TopBar';

import AuthContext from '../../contexts/AuthContext';
import * as api from '../../services/api';

const theme = createTheme();

export default function NewReview() {
  const [categories, setCategories] = useState([]);
  const [chosenCategory, setChosenCategory] = useState('');
  const [formData, setFormData] = useState({
    foodName: '',
    foodImage: '',
    reviewText: '',
    categoryId: '',
  });
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleFormChange(ev) {
    setFormData({
      ...formData,
      [ev.target.name]: ev.target.value,
    });
  }

  function handleSelectChange(ev) {
    setFormData({
      ...formData,
      [ev.target.name]: ev.target.value,
    });
    setChosenCategory(ev.target.value);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    console.log(formData);
    console.log('submit new-review');
    /*
    try {
      await api.registerUser(formData);
      alert('Cadastro efetuado com sucesso, por favor faça login');
      navigate('/');
    } catch (error) {
      alert(`Erro: ${error.response.data}`);
    }
    */
  }

  useEffect(() => {
    if (!auth) {
      alert('Você precisa estar logado para acessar este conteúdo.');
      return navigate('/');
    }
    /* const categoriesPromise = api.getCategories(auth.token);
    categoriesPromise.then((response) => {
      setCategories(response.data);
    });
    */
  }, [auth]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopBar />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 6,
            pb: 4,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="text.primary"
              gutterBottom
            >
              nova recomendação
            </Typography>
            <Typography variant="h6" align="center" color="text.secondary" paragraph>
              Cadastre aqui sua sugestão de comida que alenta até a alma
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 2 }} maxWidth="lg">
          <Box
            sx={{ display: 'flex', flexDirection: 'column' }}
            component="form"
            onSubmit={handleSubmit}
          >
            <TextField
              onChange={handleFormChange}
              margin="normal"
              required
              fullWidth
              id="foodName"
              type="text"
              label="O que você comeu de bom?"
              name="foodName"
              autoComplete="foodName"
            />
            <InputLabel id="demo-simple-select-label">Categoria Principal</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={chosenCategory}
              label="Categoria Principal"
              onChange={handleSelectChange}
              name="categoryId"
            >
              {categories.map((category) => (
                <MenuItem value={category.id}>{category.categoryName}</MenuItem>
              ))}
            </Select>
            <TextField
              onChange={handleFormChange}
              margin="normal"
              required
              id="foodImage"
              type="text"
              label="URL de sua imagem"
              name="foodImage"
              autoComplete="foodImage"
            />
            <TextField
              id="outlined-multiline-flexible"
              label="Descreva sua experiência"
              name="reviewText"
              multiline
              maxRows={4}
              value={formData.reviewText}
              onChange={handleFormChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#388E3c' }}
            >
              Cadastrar nova recomendação
            </Button>
          </Box>
        </Container>
      </main>
    </ThemeProvider>
  );
}
