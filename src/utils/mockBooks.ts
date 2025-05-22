import { Book } from '../types/books';

export const mockBooks: Book[] = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
    image: '/assets/images/gatsby.jpg',
    description: 'A novel set in the Roaring Twenties that explores wealth, love, and the American Dream.'
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    year: 1960,
    image: '/assets/images/mockingbird.jpg',
    description: 'A story of racial injustice in the Deep South, seen through the eyes of a young girl.'
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    image: '/assets/images/1984.jpg',
    description: 'A dystopian novel warning against totalitarianism and mass surveillance.'
  },
  {
    id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    year: 1813,
    image: '/assets/images/pride.jpg',
    description: 'A romantic novel that also critiques the British class system of the early 19th century.'
  }
];
