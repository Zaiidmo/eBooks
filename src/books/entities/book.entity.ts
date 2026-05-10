export class Book {
  book_id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  quantity: number;
  cover?: string;
  description: string;
  price: number;
  borrowedBy?: Borrow[];
  createdAt: string;
  updatedAt: string;
}


export class Borrow {
  userId: string;
  borrowDate: string;
  expectedReturnDate: string;
  actualReturnDate?: string;
  status: 'ACTIVE' | 'RETURNED' | 'OVERDUE';
}

export enum BookCategory {
  Fiction = 'Fiction',
  NonFiction = 'Non-Fiction',
  Poetry = 'Poetry',
  Children = "Children's Books",
  GraphicNovelsComics = 'Graphic Novels & Comics',
  Reference = 'Reference Books',
  AcademicTextbooks = 'Academic & Textbooks',
  Sports = 'Sports',
  MusicPerformingArts = 'Music & Performing Arts',
  HobbiesInterests = 'Hobbies & Interests',
  PoliticsCurrentAffairs = 'Politics & Current Affairs',
  LifestyleHome = 'Lifestyle & Home',
  ReligionSpirituality = 'Religion & Spirituality',
  ScienceFictionFantasy = 'Science Fiction & Fantasy',
  DramaPlaywriting = 'Drama & Playwriting',
  DocumentaryTrueStories = 'Documentary & True Stories',
  ComicsGraphicNovels = 'Comics & Graphic Novels',
}
