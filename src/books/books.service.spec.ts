import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksRepository } from './books.repository';
import { S3ConfigService } from '@/services/s3.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

describe('BooksService', () => {
  let booksService: BooksService;
  let booksRepository: jest.Mocked<BooksRepository>;
  let s3Service: jest.Mocked<S3ConfigService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: BooksRepository,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            getAllBooks: jest.fn(),
          },
        },
        {
          provide: S3ConfigService,
          useValue: {
            uploadCover: jest.fn(),
          },
        },
      ],
    }).compile();

    booksService = module.get<BooksService>(BooksService);
    booksRepository = module.get(BooksRepository);
    s3Service = module.get(S3ConfigService);
  });

  describe('createBook', () => {
    it('should throw an error if no file is provided', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Test Book',
        author: 'Author',
        category: 'Category',
        cover: 'cover.jpg',
        isbn: 'isbn1',
        quantity: 5,
        description: 'Description',
        price: 10.99,
      };

      await expect(
        booksService.createBook(createBookDto, null),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create a new book successfully', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Test Book',
        author: 'Author',
        isbn: 'isbn1',
        category: 'Category',
        cover: 'cover.jpg',
        quantity: 5,
        description: 'Description',
        price: 10.99,
      };
      const file = { originalname: 'cover.jpg' } as Express.Multer.File;
      const mockCoverUrl = 'https://s3.amazon.com/covers/cover.jpg';

      s3Service.uploadCover.mockResolvedValue(mockCoverUrl);

      await booksService.createBook(createBookDto, file);

      expect(s3Service.uploadCover).toHaveBeenCalledWith(file, expect.any(String));
      expect(booksRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          title: createBookDto.title,
          cover: mockCoverUrl,
        }),
      );
    });

    it('should throw error when uploading cover fails', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Test Book',
        author: 'Author',
        isbn: 'isbn1',
        category: 'Category',
        cover: 'cover.jpg',
        quantity: 5,
        description: 'Description',
        price: 10.99,
      };
      const file = { originalname: 'cover.jpg' } as Express.Multer.File;

      s3Service.uploadCover.mockRejectedValue(new Error('S3 upload failed'));

      await expect(
        booksService.createBook(createBookDto, file),
      ).rejects.toThrow(Error);
    });
  });

  describe('updateBook', () => {
    it('should throw an error if book is not found', async () => {
      booksRepository.findById.mockResolvedValue(null);

      await expect(
        booksService.updateBook('invalid-id', { title: 'Updated Title' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw an error if price is negative', async () => {
      await expect(
        booksService.updateBook('valid-id', { price: -5 } as UpdateBookDto),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw an error if quantity is negative', async () => {
      await expect(
        booksService.updateBook('valid-id', { quantity: -1 } as UpdateBookDto),
      ).rejects.toThrow(BadRequestException);
    });

    it('should update a book successfully', async () => {
      const existingBook: Book = {
        book_id: 'book-id',
        title: 'Original Title',
        author: 'Author',
        category: 'Category',
        isbn: 'isbn1',
        quantity: 5,
        cover: 'https://s3.amazon.com/covers/cover.jpg',
        description: 'Description',
        price: 10.99,
        borrowedBy: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      booksRepository.findById.mockResolvedValue(existingBook);

      await booksService.updateBook(existingBook.book_id, { title: 'Updated Title' });

      expect(booksRepository.update).toHaveBeenCalledWith(
        existingBook.book_id,
        expect.objectContaining({
          title: 'Updated Title',
        }),
      );
    });
  });

  describe('deleteBook', () => {
    it('should throw an error if book is not found', async () => {
      booksRepository.findById.mockResolvedValue(null);

      await expect(booksService.deleteBook('invalid-id')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should delete a book successfully', async () => {
      const bookId = 'book-id';
      const existingBook: Book = {
        book_id: bookId,
        title: 'Title',
        author: 'Author',
        category: 'Category',
        quantity: 5,
        isbn: 'isbn1',
        cover: 'https://s3.amazon.com/covers/cover.jpg',
        description: 'Description',
        price: 10.99,
        borrowedBy: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      booksRepository.findById.mockResolvedValue(existingBook);

      await booksService.deleteBook(bookId);

      expect(booksRepository.delete).toHaveBeenCalledWith(bookId);
    });
  });

  describe('getBookById', () => {
    it('should throw an error if book is not found', async () => {
      booksRepository.findById.mockResolvedValue(null);

      await expect(booksService.getBookById('invalid-id')).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should return the book successfully', async () => {
      const bookId = 'book-id';
      const book: Book = {
        book_id: bookId,
        title: 'Title',
        author: 'Author',
        isbn: 'isbn1',
        category: 'Category',
        quantity: 5,
        cover: 'https://s3.amazon.com/covers/cover.jpg',
        description: 'Description',
        price: 10.99,
        borrowedBy: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      booksRepository.findById.mockResolvedValue(book);

      const result = await booksService.getBookById(bookId);

      expect(result).toEqual(book);
    });
  });

  describe('getAllBooks', () => {
    it('should return all books', async () => {
      const books: Book[] = [
        {
          book_id: 'book-1',
          title: 'Title 1',
          author: 'Author 1',
          category: 'Category 1',
          isbn: 'isbn1',
          quantity: 5,
          cover: 'https://s3.amazon.com/covers/cover1.jpg',
          description: 'Description 1',
          price: 10.99,
          borrowedBy: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      booksRepository.getAllBooks.mockResolvedValue(books);

      const result = await booksService.getAllBooks();

      expect(result.books.length).toBe(1);
      expect(result.books[0].title).toBe('Title 1');
      expect(result.totalBooks).toBe(1);
    });

    it('should return empty list when no books exist', async () => {
      booksRepository.getAllBooks.mockResolvedValue([]);

      const result = await booksService.getAllBooks();

      expect(result.books.length).toBe(0);
      expect(result.totalBooks).toBe(0);
    });
  });
  
  describe('borrowBook', () => {
    it('should throw an error if the book is not found', async () => {
      booksRepository.findById.mockResolvedValue(null);
  
      await expect(booksService.borrowBook('invalid-id', 'user-id')).rejects.toThrow(
        BadRequestException,
      );
    });
  
    it('should throw an error if the book is not available', async () => {
      const unavailableBook = {
        book_id: 'book-id',
        quantity: 0,
        borrowedBy: [],
      } as Book;
  
      booksRepository.findById.mockResolvedValue(unavailableBook);
  
      await expect(booksService.borrowBook('book-id', 'user-id')).rejects.toThrow(
        BadRequestException,
      );
    });
  
    it('should throw an error if the user already has an active borrow', async () => {
      const bookWithActiveBorrow = {
        book_id: 'book-id',
        quantity: 5,
        borrowedBy: [{ userId: 'user-id', status: 'ACTIVE' }],
      } as Book;
  
      booksRepository.findById.mockResolvedValue(bookWithActiveBorrow);
  
      await expect(booksService.borrowBook('book-id', 'user-id')).rejects.toThrow(
        BadRequestException,
      );
    });
  
    it('should borrow a book successfully', async () => {
      const availableBook = {
        book_id: 'book-id',
        quantity: 5,
        borrowedBy: [],
        updatedAt: '',
      } as Book;
  
      booksRepository.findById.mockResolvedValue(availableBook);
  
      await booksService.borrowBook('book-id', 'user-id');
  
      expect(booksRepository.update).toHaveBeenCalledWith(
        'book-id',
        expect.objectContaining({
          quantity: 4,
          borrowedBy: expect.arrayContaining([
            expect.objectContaining({ userId: 'user-id', status: 'ACTIVE' }),
          ]),
        }),
      );
    });
  });
  
  describe('returnBook', () => {
    it('should throw an error if the book is not found', async () => {
      booksRepository.findById.mockResolvedValue(null);
  
      await expect(booksService.returnBook('invalid-id', 'user-id')).rejects.toThrow(
        BadRequestException,
      );
    });
  
    it('should throw an error if no active borrow is found for the user', async () => {
      const bookWithoutActiveBorrow = {
        book_id: 'book-id',
        borrowedBy: [{ userId: 'other-user', status: 'RETURNED' }],
      } as Book;
  
      booksRepository.findById.mockResolvedValue(bookWithoutActiveBorrow);
  
      await expect(booksService.returnBook('book-id', 'user-id')).rejects.toThrow(
        BadRequestException,
      );
    });
  
    it('should return a book successfully', async () => {
      const bookWithActiveBorrow = {
        book_id: 'book-id',
        quantity: 3,
        borrowedBy: [{ userId: 'user-id', status: 'ACTIVE' }],
      } as Book;
  
      booksRepository.findById.mockResolvedValue(bookWithActiveBorrow);
  
      await booksService.returnBook('book-id', 'user-id');
  
      expect(booksRepository.update).toHaveBeenCalledWith(
        'book-id',
        expect.objectContaining({
          quantity: 4,
          borrowedBy: expect.arrayContaining([
            expect.objectContaining({ userId: 'user-id', status: 'RETURNED' }),
          ]),
        }),
      );
    });
  });
  
});
