'use client';

import { useParams } from 'next/navigation';
import { Container } from '@mui/material';
import { mockBooks } from 'utils/mockBooks';
import BookItem from 'components/BookItem';
import { notFound } from 'next/navigation';

export default function SingleBookPage() {
  const params = useParams();
  const id = params?.id; 

  const book = mockBooks.find((b) => String(b.id) === id);

  if (!book) {
    notFound();
    return null; 
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <BookItem id = {book.id} />
    </Container>
  );
}
