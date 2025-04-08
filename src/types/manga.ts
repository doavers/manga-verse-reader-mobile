
export interface Manga {
  id: number;
  title: string;
  cover: string;
  description: string;
  author: string;
  rating: number;
  chapters: number;
  tags: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
}

export interface Chapter {
  id: number;
  mangaId: number;
  number: number;
  title: string;
  pages: number;
  releaseDate: string;
  isRead?: boolean;
}

export interface Page {
  id: number;
  chapterId: number;
  pageNumber: number;
  imageUrl: string;
}
