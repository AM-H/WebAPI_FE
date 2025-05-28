// 'use client';

// import { useParams, notFound } from 'next/navigation';
// import { Container } from '@mui/material';
// import { IBook } from 'types/books';
// import { mockBooks } from 'utils/mockBooks';
// import BookItem from 'components/BookItem';

// export default function SingleBookPage() {
//   const params = useParams();
//   const isbn13 = params?.id as string;

//   const book: IBook | undefined = mockBooks.find((b) => b.isbn13 === isbn13);

//   if (!book) {
//     notFound();
//     return null;
//   }

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <BookItem book={book} />
//     </Container>
//   );
// }
