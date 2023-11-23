import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import BookPage from './pages/BookPage';
import { Container } from '@mui/material';
import BookForm from './components/BookForm';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookPage />} />
          <Route path="/books/add" element={<BookForm />} />
          <Route path="/books/edit/:id" element={<BookForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
