export interface IBook {
  isbn13: string;
  authors: string[]; // array of names
  author: string;
  original_publication_year: number;
  publication: number;
  original_title: string;
  title: string;
  average_rating: number;
  ratings_count: number;
  ratings_1: number;
  ratings_2: number;
  ratings_3: number;
  ratings_4: number;
  ratings_5: number;
  ratings : {
    average: number;
  }
  image_url: string;
  icons: {
    large: string;
    small: string;
  }
  small_image_url: string;
}
