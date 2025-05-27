import { ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import { IBook } from '../types/books';
import Link from 'next/link';

export default function BookListItem({ book }: { book: IBook }) {
  return (
    <Link href={`/books/${book.isbn13}`} passHref legacyBehavior>
      <ListItem button component="a">
        <ListItemAvatar>
          <Avatar
            src={book.icons.small}
            alt={book.title}
            variant="square"
            sx={{ width: 56, height: 80, marginRight: 2 }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={book.title}
          secondary={`${book.authors} • ${book.publication}`}
          secondaryTypographyProps={{ color: 'gray' }}
        />
      </ListItem>
    </Link>
  );
}
