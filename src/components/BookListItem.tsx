import { ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import { Book } from '../types/books';
import Link from 'next/link';

export default function BookListItem({ book }: { book: Book }) {
  return (
    <Link href={`/dashboard/books/${book.id}`} passHref legacyBehavior>
      <ListItem button component="a">
        <ListItemAvatar>
          <Avatar
            src={book.image}
            alt={book.title}
            variant="square"
            sx={{ width: 56, height: 80, marginRight: 2 }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={book.title}
          secondary={`${book.author} • ${book.year}`}
          secondaryTypographyProps={{ color: 'gray' }}
        />
      </ListItem>
    </Link>
  );
}
