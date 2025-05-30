import { Avatar, Typography, Card, CardContent, Box, Rating } from '@mui/material';
import { mockBooks } from 'utils/mockBooks';
import { Book } from 'types/books';

import DeleteItem from './DeleteItem';
import BookRating from './BookRating';

export default function BookItem({ id }: { id: number }) {
  const book: Book | undefined = mockBooks.find((b) => b.id === id);

  if (!book) {
    return <Typography color="error">Book not found</Typography>;
  }

  return (
    <Card sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 500, height: 500, alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {book.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          By: {book.author}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Publication Year: 1990
        </Typography>
        <Avatar alt={book.title} src={book.image} variant="square" sx={{ width: 250, height: 375, my: 2 }} />
      </Box>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating value={book.ratings.average} readOnly precision={0.5} />
            <Typography sx={{ ml: 1 }}>{book.ratings.average.toFixed(1)}</Typography>
          </Box>
          <DeleteItem></DeleteItem>
        </Box>
        <BookRating></BookRating>
      </CardContent>
    </Card>
  );
}
