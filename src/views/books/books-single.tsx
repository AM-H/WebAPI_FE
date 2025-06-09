'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Container, Alert } from '@mui/material';
import BookItem from 'components/BookItem';
import { IBook } from 'types/books';
import axios from 'utils/axios';

export default function BookSinglePage() {
  const { id: isbn13 } = useParams() as { id: string };
  const [book, setBook] = useState<IBook | null>(null);
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState('');
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    axios
      .get(`c/get_book_by_ISBN/${isbn13}`)
      .then((res) => setBook(res.data.book))
      .catch(() => setError('Failed to load book'));
  }, [isbn13]);

  const handleUpdateRatings = (ratingData: any) => {
    if (!book) return;

    const formattedData = {
      ratings_1: ratingData.rating_1,
      ratings_2: ratingData.rating_2,
      ratings_3: ratingData.rating_3,
      ratings_4: ratingData.rating_4,
      ratings_5: ratingData.rating_5
    };

    console.log('Sending rating data:', formattedData);

    axios
      .put(`/c/update_book_ratings/${book.isbn13}`, formattedData, {})
      .then(() => axios.get(`/c/get_book_by_ISBN/${book.isbn13}`))
      .then((res) => {
        setBook(res.data.book);
        setUpdated(true);
        setTimeout(() => setUpdated(false), 3000);
      })
      .catch((err) => {
        console.error('Rating update error:', err);
        setError('Failed to update book ratings');
      });
  };

  const handleDelete = () => {
    if (!book) return;

    axios
      .delete(`c/delete_book_by_ISBN/${book.isbn13}`)
      .then((res) => {
        if (res.status === 204) setDeleted(true);
      })
      .catch(() => setError('Failed to delete book'));
  };

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!book) return <p>Loading...</p>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {deleted && (
        <Alert
          severity="success"
          action={
            <a href="/books/list" style={{ color: 'inherit', textDecoration: 'underline' }}>
              Close & Return
            </a>
          }
        >
          Book deleted. Click to return to search page.
        </Alert>
      )}
      {updated && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Rating successfully updated!
        </Alert>
      )}
      <BookItem book={book} onDelete={handleDelete} onSubmit={handleUpdateRatings} />
    </Container>
  );
}
