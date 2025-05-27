import { IBook } from '../types/books';

export const mockBooks: IBook[] = [
  {
    isbn13: 9780743273565,
    title: 'The Great Gatsby',
    original_title: 'The Great Gatsby',
    authors: 'F. Scott Fitzgerald',
    publication: 1925,
    ratings: {
      average: 4.6,
      count: 5,
      rating_1: 5.0,
      rating_2: 3.5,
      rating_3: 5.0,
      rating_4: 4.5,
      rating_5: 5.0,
    },
    icons: {
      large: '/assets/images/gatsby.jpg',
      small: '/assets/images/gatsby.jpg',
    },
  },
  {
    isbn13: 9780061120084,
    title: 'To Kill a Mockingbird',
    original_title: 'To Kill a Mockingbird',
    authors: 'Harper Lee',
    publication: 1960,
    ratings: {
      average: 4.7,
      count: 5,
      rating_1: 4.7,
      rating_2: 5.0,
      rating_3: 4.8,
      rating_4: 4.4,
      rating_5: 5.0,
    },
    icons: {
      large: '/assets/images/mockingbird.jpg',
      small: '/assets/images/mockingbird.jpg',
    },
  },
  {
    isbn13: 9780451524935,
    title: '1984',
    original_title: 'Nineteen Eighty-Four',
    authors: 'George Orwell',
    publication: 1949,
    ratings: {
      average: 4.7,
      count: 5,
      rating_1: 4.7,
      rating_2: 5.0,
      rating_3: 4.8,
      rating_4: 4.4,
      rating_5: 5.0,
    },
    icons: {
      large: '/assets/images/1984.jpg',
      small: '/assets/images/1984.jpg',
    },
  },
  {
    isbn13: 9780141439518,
    title: 'Pride and Prejudice',
    original_title: 'Pride and Prejudice',
    authors: 'Jane Austen',
    publication: 1813,
    ratings: {
      average: 4.7,
      count: 5,
      rating_1: 4.7,
      rating_2: 5.0,
      rating_3: 4.8,
      rating_4: 4.4,
      rating_5: 5.0,
    },
    icons: {
      large: '/assets/images/pride.jpg',
      small: '/assets/images/pride.jpg',
    },
  },
];
