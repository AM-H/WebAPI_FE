import { Avatar, Typography, Card, CardContent, Box, Rating } from '@mui/material';
import BookRating from './BookRating';
import DeleteButton from './DeleteButton';
import { IBook } from '../types/books';

export default function BookItem({
  book,
  onDelete,
  onSubmit
}: {
  book: IBook;
  onDelete?: () => void;
  onSubmit?: (ratingData: any) => void;
}) {
  const authors = Array.isArray(book.authors) ? book.authors.join(', ') : book.authors;
  const cover = book.image_url || book.icons.large;

  return (
    <Card sx={{ p: 4, maxWidth: 700, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">{book.title}</Typography>
        {book.original_title !== book.title && (
          <Typography variant="subtitle2" color="text.secondary">
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
        <Avatar alt={book.title} src={cover} variant="square" sx={{ width: 250, height: 375, my: 2 }} />
      </Box>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating value={book.ratings.average} readOnly precision={0.5} />
            <Typography sx={{ ml: 1 }}>
              {typeof book.ratings.average === 'number' && !isNaN(book.ratings.average) ? book.ratings.average.toFixed(1) : '0.0'}
            </Typography>
          </Box>
          {onDelete && <DeleteButton onDelete={onDelete} />}
        </Box>
        <BookRating onSubmit={onSubmit} />
      </CardContent>
    </Card>
  );
}
