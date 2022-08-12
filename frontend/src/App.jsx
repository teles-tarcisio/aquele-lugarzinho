import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { red, pink } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import {
  SignIn,
  SignUpSide,
  Home,
  // NewReview,
} from './pages/index';

export default function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#388E3c',
      },
      secondary: pink,
      error: {
        main: red.A400,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Container maxWidth="xl">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUpSide />} />
              <Route path="/home" element={<Home />} />
              {/* <Route path="/new-review" element={<NewReview />} /> */}
            </Routes>
          </BrowserRouter>
        </Container>
      </AuthProvider>
    </ThemeProvider>
  );
}
