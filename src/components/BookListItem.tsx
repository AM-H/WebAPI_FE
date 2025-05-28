import { ListItem, ListItemAvatar, ListItemText, Avatar } from '@mui/material';
import { IBook } from '../types/books';
import Link from 'next/link';

export default function BookListItem({ book }: { book: IBook }) {
  const authors = Array.isArray(book.authors) ? book.authors.join(', ') : (book.authors || book.author); //book.authors for get by title || book.author for get by min_avg_rating
  const year = book.publication || book.original_publication_year; //for get by title || for min_avg_rating
  const cover = book.small_image_url || book.icons.small; //first, for min_avg_rating || for get book by title

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
