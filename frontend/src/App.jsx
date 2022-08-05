import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Container } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import {
  SignIn,
  SignUpSide,
  //Home,
  //NewReview,
} from './pages/index';


export default function App() {
  return (
    <AuthProvider>
        <Container maxWidth="xl">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUpSide />} />
              {/* <Route path="/home" element={<Home />} /> */}
              {/* <Route path="/new-review" element={<NewReview />} /> */}
            </Routes>
          </BrowserRouter>
        </Container>
    </AuthProvider>
  );
}
