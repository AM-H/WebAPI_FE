'use client';

import { useParams } from 'next/navigation';
import BookItem from 'components/BookItem';
import { mockBooks } from 'utils/mockBooks';
import { notFound } from 'next/navigation';

export default function BookItemPage() {
  const params = useParams();
  const isbn13 = params.id as string;

  const book = mockBooks.find((b) => b.isbn13 === isbn13);

  if (!book) {
    notFound();
    return null;
  }

  return <BookItem book={book} />;
}
