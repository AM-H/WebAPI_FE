'use client';

import { useParams } from 'next/navigation';
import { Container } from '@mui/material';
import { mockBooks } from 'utils/mockBooks';
import BookItem from 'components/BookItem';
import { notFound } from 'next/navigation';

export default function SingleBookPage() {
  const params = useParams();
  const isbnParam = params?.id;

  // Ensure the param is a number, since isbn13 is a number
  const isbn13 = isbnParam ? parseInt(isbnParam as string, 10) : NaN;

  const book = mockBooks.find((b) => b.isbn13 === isbn13);

  if (!book) {
    notFound();
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <BookItem isbn13={book.isbn13} />
    </Container>
  );
}
