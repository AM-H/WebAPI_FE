'use client';

import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  List,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BookListItem from '../../components/BookListItem';
import { IBook } from '../../types/books';
import axiosServices from '../../utils/axios';

const defaultTheme = createTheme();

export default function FilterBooksView() {
  const [mode, setMode] = React.useState<'filter' | 'offset'>('filter');
  const [filters, setFilters] = React.useState({
    author: '',
    title: '',
    minYear: '',
    maxYear: '',
    minRating: '',
    maxRating: '',
    minRatingCount: '',
    maxRatingCount: '',
    limit: '10',
    offset: '0'
  });
  const [books, setBooks] = React.useState<IBook[]>([]);
  const [error, setError] = React.useState('');

  const handleInputChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const buildQueryParams = () => {
    const params = new URLSearchParams();

    if (mode === 'offset') {
      ['limit', 'offset'].forEach((key) => {
        if (filters[key as keyof typeof filters].trim()) {
          params.append(key, filters[key as keyof typeof filters].trim());
        }
      });
    } else {
      Object.entries(filters).forEach(([key, value]) => {
        if (value.trim()) {
          params.append(key, value.trim());
        }
      });
    }

    params.append('getTotal', 'true');
    return params.toString();
  };

  const handleSearch = async () => {
    setError('');
    setBooks([]);

    try {
      const query = buildQueryParams();
      const endpoint = mode === 'filter' ? `c/books/filter` : `c/books/offset`;
      const res = await axiosServices.get(`${endpoint}?${query}`);
      setBooks(res.data.books || res.data.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch books.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <MenuBookIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {mode === 'filter' ? 'Advanced Book Search' : 'Basic Paginated Books'}
          </Typography>

          <ToggleButtonGroup
            color="primary"
            value={mode}
            exclusive
            onChange={(_, newMode) => newMode && setMode(newMode)}
            sx={{ mt: 2, mb: 3 }}
          >
            <ToggleButton value="filter">Filter</ToggleButton>
            <ToggleButton value="offset">Pagination Only</ToggleButton>
          </ToggleButtonGroup>

          <Box sx={{ width: '100%' }}>
            {(mode === 'filter'
              ? ['author', 'title', 'minYear', 'maxYear', 'minRating', 'maxRating', 'minRatingCount', 'maxRatingCount', 'limit', 'offset']
              : ['limit', 'offset']
            ).map((field) => (
              <TextField
                key={field}
                label={field}
                fullWidth
                value={(filters as any)[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                sx={{ mb: 2 }}
              />
            ))}

            <Button variant="contained" onClick={handleSearch} fullWidth>
              Search Books
            </Button>
          </Box>

          <Divider sx={{ my: 4, width: '100%' }} />

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
