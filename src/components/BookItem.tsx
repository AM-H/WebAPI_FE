import { Avatar, Typography, Card, CardContent, Box, Divider } from '@mui/material';
import BookRating from 'components/BookRating';
import { IBook } from 'types/books';

export default function BookItem({ book }: { book: IBook }) {
  // const authors = Array.isArray(book.authors) ? book.authors.join(', ') : book.authors;
  // const cover = book.image_url;
  const authors = Array.isArray(book.authors) ? book.authors.join(', ') : book.authors;
  const cover = book.image_url || book.icons.large; //first, for min_avg_rating || for get book by title

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
          By {authors}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Published: {book.original_publication_year}
        </Typography>
        <Typography variant="body2" gutterBottom>
          ISBN-13: {book.isbn13}
        </Typography>
        <Avatar
          alt={book.title}
          src={cover}
          variant="square"
          sx={{ width: 250, height: 375, my: 2 }}
        />
      </Box>

      <CardContent>
        <Divider sx={{ mb: 2 }} />
        <BookRating average={parseFloat(book.ratings.average as any)} />
        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Leave a rating
        </Typography>
      </CardContent>
    </Card>
  );
}
