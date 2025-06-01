'use client';

import * as React from 'react';
import { Avatar, Box, Button, Container, CssBaseline, List, TextField, Typography, Divider } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BookListItem from '../../components/BookListItem';
import { IBook } from '../../types/books';
import axiosServices from '../../utils/axios';

const defaultTheme = createTheme();

export default function BookListView() {
  const [title, setTitle] = React.useState('');
  const [minRating, setMinRating] = React.useState('');
  const [isbn13, setIsbn13] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [books, setBooks] = React.useState<IBook[]>([]);
  const [error, setError] = React.useState('');

  const handleTitleSearch = async () => {
    setError('');
    setBooks([]);

    if (!title.trim()) {
      setError('Please enter a book title.');
      return;
    }

    try {
      const encodedTitle = encodeURIComponent(title.trim());
      const res = await axiosServices.get(`c/get_book_by_title/${encodedTitle}`);
      setBooks([res.data.book]);
    } catch (err) {
      console.error(err);
      setError('Book not found or request failed.');
    }
  };

  const handleRatingSearch = async () => {
    setError('');
    setBooks([]);

    const ratingValue = parseFloat(minRating);
    if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
      setError('Please enter a valid rating between 0 and 5.');
      return;
    }

    try {
      const res = await axiosServices.get(`c/get_books_by_rating/${ratingValue}`);
      setBooks(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch books by rating.');
    }
  };

  const handleISBNSearch = async () => {
    setError('');
    setBooks([]);

    if (!isbn13.trim()) {
      setError('Please enter a valid ISBN-13.');
      return;
    }

    try {
      const res = await axiosServices.get(`c/get_book_by_ISBN/${isbn13.trim()}`);
      setBooks([res.data.book]);
    } catch (err) {
      console.error(err);
      setError('Book not found or request failed.');
    }
  };

  const handleAuthorSearch = async () => {
    setError('');
    setBooks([]);

    if (!author.trim()) {
      setError('Please enter an author name.');
      return;
    }

    try {
      const encodedAuthor = encodeURIComponent(author.trim());
      const res = await axiosServices.get(`c/get_book_by_author/${encodedAuthor}`);
      console.log('Author search result:', res.data.books);
      setBooks(res.data.books || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch books by author.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <MenuBookIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Book Search
          </Typography>

          {/* Title Search */}
          <Box sx={{ mt: 3, width: '100%' }}>
            <Typography variant="h6">Search by Title</Typography>
            <TextField
              label="Book Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 2 }}
              placeholder="e.g. The Great Gatsby"
            />
            <Button variant="contained" onClick={handleTitleSearch} fullWidth>
              Search by Title
            </Button>
          </Box>

          <Divider sx={{ my: 4, width: '100%' }} />

          {/* Rating Search */}
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6">Search by Minimum Average Rating</Typography>
            <TextField
              label="Min Avg Rating"
              fullWidth
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              sx={{ mb: 2 }}
              placeholder="e.g. 4.0"
            />
            <Button variant="contained" onClick={handleRatingSearch} fullWidth>
              Search by Rating
            </Button>
          </Box>

          <Divider sx={{ my: 4, width: '100%' }} />

          {/* ISBN Search */}
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6">Search by ISBN-13</Typography>
            <TextField
              label="ISBN-13"
              fullWidth
              value={isbn13}
              onChange={(e) => setIsbn13(e.target.value)}
              sx={{ mb: 2 }}
              placeholder="e.g. 9780439139601"
            />
            <Button variant="contained" onClick={handleISBNSearch} fullWidth>
              Search by ISBN
            </Button>
          </Box>

          <Divider sx={{ my: 4, width: '100%' }} />

          {/* Author Search */}
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6">Search by Author</Typography>
            <TextField
              label="Author Name"
              fullWidth
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              sx={{ mb: 2 }}
              placeholder="e.g. J.K. Rowling"
            />
            <Button variant="contained" onClick={handleAuthorSearch} fullWidth>
              Search by Author
            </Button>
          </Box>

          {/* Results or Error */}
          <Box sx={{ mt: 4, width: '100%' }}>
            {error && (
              <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <List>
              {books.length > 0
                ? books.map((book) => <BookListItem key={book.isbn13} book={book} />)
                : !error && (
                    <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
                      No books to display.
                    </Typography>
                  )}
            </List>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
