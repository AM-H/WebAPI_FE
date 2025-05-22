'use client';

import * as React from 'react';
import { Avatar, Box, Container, CssBaseline, Typography, List } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { mockBooks } from '../../utils/mockBooks';
import BookListItem from '../../components/BookListItem';

const defaultTheme = createTheme();

export default function BookListView() {
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
            Book List
          </Typography>
          <Box sx={{ mt: 1 }}>
            <List>
              {mockBooks.map((book) => (
                <BookListItem key={book.id} book={book} />
              ))}
            </List>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
