import React from 'react';
import Homepage from './pages/home';
import Header from './components/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Header />
      <Homepage />
  </ThemeProvider>
  );
};

export default App;