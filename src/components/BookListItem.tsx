import { ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import { IBook } from '../types/books';
import Link from 'next/link';

export default function BookListItem({ book }: { book: IBook }) {
  const authors = Array.isArray(book.authors) ? book.authors.join(', ') : book.authors;
  const year = book.original_publication_year || 'Year Unknown';
  const cover = book.small_image_url || '/assets/images/default.jpg';

  return (
    <Link href={`/books/${book.isbn13}`} passHref legacyBehavior>
      <ListItem button component="a">
        <ListItemAvatar>
          <Avatar
            src={cover}
            alt={book.title}
            variant="square"
            sx={{ width: 56, height: 80, marginRight: 2 }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={book.title}
          secondary={`${authors} • ${year}`}
          secondaryTypographyProps={{ color: 'gray' }}
        />
      </ListItem>
    </Link>
  );
}
