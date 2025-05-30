<<<<<<< HEAD
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
=======
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
>>>>>>> origin/main
      </Box>

      <CardContent>
<<<<<<< HEAD
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating value={book.ratings.average} readOnly precision={0.5} />
            <Typography sx={{ ml: 1 }}>{book.ratings.average.toFixed(1)}</Typography>
          </Box>
          <DeleteItem></DeleteItem>
        </Box>
        <BookRating></BookRating>
=======
        <Divider sx={{ mb: 2 }} />
        <BookRating average={parseFloat(book.ratings.average as any)} />
        <Typography variant="subtitle1" sx={{ mt: 3 }}>
          Leave a rating
        </Typography>
>>>>>>> origin/main
      </CardContent>
    </Card>
  );
}
