'use client';

import { useParams } from 'next/navigation';
import BookItem from 'components/BookItem';

export default function BookItemPage() {
  const params = useParams();
  const isbn13 = Number(params.id); // Convert route param to number

  return <BookItem isbn13={isbn13} />;
}
