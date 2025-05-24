'use client';
import { useParams } from 'next/navigation';
import BookItem from 'components/BookItem';

export default function BookItemPage() {
  const params = useParams();
  const id = Number(params.id);
  console.log(id);
  return <BookItem id={id} />;
}
