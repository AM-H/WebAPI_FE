import { Book } from '../types/books';

export const mockBooks: Book[] = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
    image: '/assets/images/gatsby.jpg',
    description: 'A novel set in the Roaring Twenties that explores wealth, love, and the American Dream.',
    ratings:
        {
          average: 4.6,
          count: 5,
          rating_1: 5.0,
          rating_2: 3.5,
          rating_3: 5.0,
          rating_4: 4.5,
          rating_5: 5.0
        }
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    year: 1960,
    image: '/assets/images/mockingbird.jpg',
    description: 'A story of racial injustice in the Deep South, seen through the eyes of a young girl.',
    ratings:
      {
        average: 4.7,
        count: 5,
        rating_1: 4.7,
        rating_2: 5.0,
        rating_3: 4.8,
        rating_4: 4.4,
        rating_5: 5.0
      }
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    image: '/assets/images/1984.jpg',
    description: 'A dystopian novel warning against totalitarianism and mass surveillance.',
    ratings:
    {
      average: 4.7,
      count: 5,
      rating_1: 4.7,
      rating_2: 5.0,
      rating_3: 4.8,
      rating_4: 4.4,
      rating_5: 5.0
    }
},
  {
    id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    year: 1813,
    image: '/assets/images/pride.jpg',
    description: 'A romantic novel that also critiques the British class system of the early 19th century.',
    ratings:
    {
      average: 4.7,
      count: 5,
      rating_1: 4.7,
      rating_2: 5.0,
      rating_3: 4.8,
      rating_4: 4.4,
      rating_5: 5.0
    }  
  }
];
