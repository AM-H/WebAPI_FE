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

  const calculateAverageRating = () => {
    const { rating_1, rating_2, rating_3, rating_4, rating_5 } = book.ratings;

    const totalVotes = rating_1 + rating_2 + rating_3 + rating_4 + rating_5;
    if (totalVotes === 0) {
      return 0;
    }

    const weightedSum = rating_1 * 1 + rating_2 * 2 + rating_3 * 3 + rating_4 * 4 + rating_5 * 5;
    const average = weightedSum / totalVotes;

    return Number(average.toFixed(1));
  };

  const averageRating = calculateAverageRating();
  const totalRatings = book.ratings.rating_1 + book.ratings.rating_2 + book.ratings.rating_3 + book.ratings.rating_4 + book.ratings.rating_5;

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
            <Rating value={averageRating} readOnly precision={0.1} />
            <Typography sx={{ ml: 1 }}>{averageRating.toFixed(1)}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({totalRatings} {totalRatings === 1 ? 'review' : 'reviews'})
            </Typography>
          </Box>
          {onDelete && <DeleteButton onDelete={onDelete} />}
        </Box>
        <BookRating 
          onSubmit={onSubmit} 
          currentRatings={{
            rating_1: book.ratings.rating_1,
            rating_2: book.ratings.rating_2,
            rating_3: book.ratings.rating_3,
            rating_4: book.ratings.rating_4,
            rating_5: book.ratings.rating_5
          }}
        />
      </CardContent>
    </Card>
  );
}
