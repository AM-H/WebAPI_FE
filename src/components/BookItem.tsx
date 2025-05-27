import { Avatar, Typography, Card, CardContent, Box, Divider } from '@mui/material';
import BookRating from 'components/BookRating';
import { mockBooks } from 'utils/mockBooks';
import { IBook } from 'types/books';

export default function BookItem({ isbn13 }: { isbn13: number }) {
  const book: IBook | undefined = mockBooks.find((b) => b.isbn13 === isbn13);

  if (!book) {
    return <Typography color="error">Book not found</Typography>;
  }

  return (
    <Card sx={{ p: 4, maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          {book.title}
        </Typography>
        {book.original_title !== book.title && (
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            (Original Title: {book.original_title})
          </Typography>
        )}
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          By {book.authors}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Published: {book.publication}
        </Typography>
        <Typography variant="body2" gutterBottom>
          ISBN-13: {book.isbn13}
        </Typography>
        <Avatar
          alt={book.title}
          src={book.icons.large}
          variant="square"
          sx={{ width: 250, height: 375, my: 2 }}
        />
      </Box>

      <CardContent>
        <Divider sx={{ mb: 2 }} />
        <BookRating rating={book.ratings} />
        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Leave a rating
        </Typography>
      </CardContent>
    </Card>
  );
}
