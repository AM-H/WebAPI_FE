import {IRatings} from '../types/ratings'

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  image: string;
  description: string;
  ratings: IRatings;
}
