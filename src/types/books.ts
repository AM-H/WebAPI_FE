import {IRatings} from '../types/ratings'

export interface IBook {
  isbn13: string;
  authors: string[]; // array of names
  author: string;
  original_publication_year: number;
  publication: number;
  original_title: string;
  title: string;
  ratings : IRatings,
  image_url: string;
  icons: {
    large: string;
    small: string;
  }
  small_image_url: string;
}

