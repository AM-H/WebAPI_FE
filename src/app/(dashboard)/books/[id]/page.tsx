'use client';

import { useParams, notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IBook } from 'types/books';
import BookItem from 'components/BookItem';
import axiosServices from 'utils/axios';
import { CircularProgress, Box } from '@mui/material';

export default function BookItemPage() {
  const { id } = useParams();
  const [book, setBook] = useState<IBook | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axiosServices.get(`c/get_book_by_ISBN/${id}`);
        console.log(res.data.book);
        setBook(res.data.book);
      } catch (err) {
        console.error('Book fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!book) {
    notFound();
    return null;
  }

  return <BookItem book={book} />;
}
