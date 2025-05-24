import { Avatar, Typography, Card, CardContent, Box } from '@mui/material';
import BookRating from 'components/BookRating';
import { mockBooks } from 'utils/mockBooks';
import { Book } from 'types/books';

export default function BookItem({ id }: { id: number }) {
  const book: Book | undefined = mockBooks.find((b) => b.id === id);

  if (!book) {
    return <Typography color="error">Book not found</Typography>;
  }

  return (
    <Card sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {book.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {book.author}
        </Typography>
        <Avatar
          alt={book.title}
          src={book.image}
          variant="square"
          sx={{ width: 250, height: 375, my: 2 }}
        />
      </Box>
      <CardContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {book.description}
        </Typography>
        <BookRating rating={book.ratings} />
        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Leave a rating
        </Typography>
      </CardContent>
    </Card>
  );
}

