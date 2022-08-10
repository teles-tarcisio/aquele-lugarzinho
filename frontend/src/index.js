import * as React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { red, pink } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';

// app custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#00c85',
    },
    secondary: pink,
    error: {
      main: red.A400,
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.querySelector('#root'),
);
