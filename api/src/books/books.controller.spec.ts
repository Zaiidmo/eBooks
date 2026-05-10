import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { GetBooksResponseDto } from './dto/get-book-response.dto';

describe('BooksController', () => {
  let booksController: BooksController;
  let booksService: jest.Mocked<BooksService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            createBook: jest.fn(),
            updateBook: jest.fn(),
            deleteBook: jest.fn(),
            getBookById: jest.fn(),
            getAllBooks: jest.fn(),
            borrowBook: jest.fn(),
            returnBook: jest.fn(),
          },
        },
      ],
    }).compile();

    booksController = module.get<BooksController>(BooksController);
    booksService = module.get(BooksService);
  });

  describe('createBook', () => {
    it('should successfully create a book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Test Book',
        isbn: 'isbn1',
        author: 'Author',
        category: 'Category',
        cover: 'cover.jpg',
        quantity: 5,
        description: 'Description',
        price: 10.99,
      };
      const file = { originalname: 'cover.jpg' } as Express.Multer.File;

      booksService.createBook.mockResolvedValue(undefined);

      const result = await booksController.createBook(createBookDto, file);

      expect(booksService.createBook).toHaveBeenCalledWith(createBookDto, file);
      expect(result).toEqual({ message: 'Book created successfully' });
    });
  });

  describe('updateBook', () => {
    it('should successfully update a book', async () => {
      const existingBook: Book = {
        book_id: 'book-id',
        title: 'Original Title',
        isbn: 'isbn1',
        author: 'Author',
        category: 'Category',
        quantity: 5,
        cover: 'https://s3.amazon.com/covers/cover.jpg',
        description: 'Description',
        price: 10.99,
        borrowedBy: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const updateBookDto: UpdateBookDto = { title: 'Updated Title' };

      booksService.updateBook.mockResolvedValue(undefined);

      const result = await booksController.updateBook(existingBook.book_id, updateBookDto);

      expect(booksService.updateBook).toHaveBeenCalledWith(existingBook.book_id, updateBookDto);
      expect(result).toEqual({ message: 'Book updated successfully' });
    });

    it('should throw an error if book not found', async () => {
      const updateBookDto: UpdateBookDto = { title: 'Updated Title' };

      booksService.updateBook.mockRejectedValue(new BadRequestException('Book not found'));

      await expect(
        booksController.updateBook('invalid-id', updateBookDto),
      ).rejects.toThrowError(BadRequestException);
    });
  });

  describe('deleteBook', () => {
    it('should successfully delete a book', async () => {
      const bookId = 'book-id';
      booksService.deleteBook.mockResolvedValue(undefined);

      const result = await booksController.deleteBook(bookId);

      expect(booksService.deleteBook).toHaveBeenCalledWith(bookId);
      expect(result).toEqual({ message: 'Book deleted successfully' });
    });

    it('should throw an error if book not found', async () => {
      const bookId = 'invalid-id';
      booksService.deleteBook.mockRejectedValue(new NotFoundException('Book not found'));

      await expect(booksController.deleteBook(bookId)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('getBook', () => {
    it('should return a book by its ID', async () => {
      const bookId = 'book-id';
      const book: Book = {
        book_id: bookId,
        title: 'Title',
        isbn: 'isbn1',
        author: 'Author',
        category: 'Category',
        quantity: 5,
        cover: 'https://s3.amazon.com/covers/cover.jpg',
        description: 'Description',
        price: 10.99,
        borrowedBy: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      booksService.getBookById.mockResolvedValue(book);

      const result = await booksController.getBook(bookId);

      expect(booksService.getBookById).toHaveBeenCalledWith(bookId);
      expect(result).toEqual(book);
    });

    it('should throw an error if book not found', async () => {
      const bookId = 'invalid-id';
      booksService.getBookById.mockRejectedValue(new NotFoundException('Book not found'));

      await expect(booksController.getBook(bookId)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('getAllBooks', () => {
    it('should return all books', async () => {
      const books: GetBooksResponseDto = { books: [
        {
          id: 'book-id',
          title: 'Title 1',
          author: 'Author 1',
          category: 'Category 1',
          isbn: 'isbn1',
          quantity: 5,
          cover: 'https://s3.amazon.com/covers/cover1.jpg',
          description: 'Description 1',
          price: 10.99,
        },
      ], totalBooks: 1 };

      booksService.getAllBooks.mockResolvedValue(books);

      const result = await booksController.getAllBooks();

      expect(booksService.getAllBooks).toHaveBeenCalled();
      expect(result).toEqual(books);
    });

    it('should handle error when fetching books', async () => {
      booksService.getAllBooks.mockRejectedValue(new Error('Error fetching books'));

      const result = await booksController.getAllBooks();

      expect(result).toEqual({ error: 'Error fetching books' });
    });
  });

  describe('borrowBook', () => {
    it('should successfully borrow a book', async () => {
      const bookId = 'book-id';
      const userId = 'user-id';

      booksService.borrowBook.mockResolvedValue(undefined);

      const result = await booksController.borrowBook(bookId, userId);

      expect(booksService.borrowBook).toHaveBeenCalledWith(bookId, userId);
      expect(result).toEqual({ message: 'Book borrowed successfully' });
    });

    it('should throw an error if book cannot be borrowed', async () => {
      const bookId = 'book-id';
      const userId = 'user-id';

      booksService.borrowBook.mockRejectedValue(new Error('Cannot borrow this book'));

      const result = await booksController.borrowBook(bookId, userId);

      expect(result).toEqual({ error: 'Cannot borrow this book' });
    });
  });

  describe('returnBook', () => {
    it('should successfully return a book', async () => {
      const bookId = 'book-id';
      const userId = 'user-id';

      booksService.returnBook.mockResolvedValue(undefined);

      const result = await booksController.returnBook(bookId, userId);

      expect(booksService.returnBook).toHaveBeenCalledWith(bookId, userId);
      expect(result).toEqual({ message: 'Book returned successfully' });
    });

    it('should throw an error if book cannot be returned', async () => {
      const bookId = 'book-id';
      const userId = 'user-id';

      booksService.returnBook.mockRejectedValue(new Error('Cannot return this book'));

      const result = await booksController.returnBook(bookId, userId);

      expect(result).toEqual({ error: 'Cannot return this book' });
    });
  });
});
