import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksRepository } from './books.repository';
import { Book, Borrow } from './entities/book.entity';
import { S3ConfigService } from '@/services/s3.service';
import { v4 as uuidv4 } from 'uuid';
import { GetBookResponseDto, GetBooksResponseDto } from './dto/get-book-response.dto';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly s3Service: S3ConfigService,
  ) {}

  //Create a new books
  async createBook(
    createBookDto: CreateBookDto,
    file: Express.Multer.File,
  ): Promise<void> {
    if (!file) {
      throw new BadRequestException('Cover image is required');
    }

    //Generate unique identifiers and timestamps
    const bookId = uuidv4();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    //Upload cover to S3 
    const key = `covers/${file.originalname}`;
    const coverUrl = await this.s3Service.uploadCover(file, key);

    //  Create a new book object
    const newBook: Book = {
      book_id: bookId,
      title: createBookDto.title,
      author: createBookDto.author,
      category: createBookDto.category,
      isbn: createBookDto.isbn,
      quantity: createBookDto.quantity,
      cover: coverUrl,
      description: createBookDto.description,
      price: createBookDto.price,
      borrowedBy: [],
      createdAt,
      updatedAt,
    };

    //Save to DynamoDB
    try {
    await this.booksRepository.create(newBook);
    } catch (error) {
      throw new BadRequestException('Failed to create book');
    }
  }

  //Update an existing book
  async updateBook(
    bookId: string,
    updatedFields: UpdateBookDto,
  ): Promise<void> {
    //Validate the input fields 
    if(updatedFields.price !== undefined && updatedFields.price < 0) {
      throw new BadRequestException('Price must be a positive number');
    }
    if(updatedFields.quantity !== undefined && updatedFields.quantity < 0) {
      throw new BadRequestException('Quantity must be a positive number');
    }

    //Check if the book exists 
    const book = await this.booksRepository.findById(bookId);
    if (!book) {
      throw new BadRequestException('Book not found');
    }

    //Update the book object
    const updatedBook: Book = {
      ...book,
      ...updatedFields,
      updatedAt: new Date().toISOString(),
    };

    await this.booksRepository.update(bookId, updatedBook);
  }

  //Delete a book by its ID 
  async deleteBook(bookId: string): Promise<void> {
    const book = await this.booksRepository.findById(bookId);
    if (!book) {
      throw new BadRequestException('Book not found');
    }
    await this.booksRepository.delete(bookId);
  }

  //Get a book by its ID
  async getBookById(bookId: string): Promise<Book> {
    const book = await this.booksRepository.findById(bookId);
    if (!book) {
      throw new BadRequestException('Book not found');
    }
    return book;
  }

  //Get all books
  async getAllBooks(): Promise<GetBooksResponseDto> {
    const books = await this.booksRepository.getAllBooks();
    // console.log('books:', books);
    
    return {
      books: books.map(book => this.transformToResponseDto(book)),
      totalBooks: books.length
    };
  }

  //Borrow a book
  async borrowBook(bookId: string, userId: string): Promise<void> {
    const book = await this.booksRepository.findById(bookId);
    if (!book) throw new BadRequestException('Book not found');
    
    if (book.quantity === 0) {
      throw new BadRequestException('Book not available');
    }

    const hasActiveBorrow = book.borrowedBy.some(
      b => b.userId === userId && b.status === 'ACTIVE'
    );
    if (hasActiveBorrow) {
      throw new BadRequestException('Already borrowed this book');
    }

    const borrowRecord: Borrow = {
      userId,
      borrowDate: new Date().toISOString(),
      expectedReturnDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'ACTIVE'
    };

    const updatedBook = {
      ...book,
      quantity: book.quantity - 1,
      borrowedBy: [...book.borrowedBy, borrowRecord],
      updatedAt: new Date().toISOString()
    };

    await this.booksRepository.update(bookId, updatedBook);
  }

  // Return a borrowed book
  async returnBook(bookId: string, userId: string): Promise<void> {
    const book = await this.booksRepository.findById(bookId);
    if (!book) throw new BadRequestException('Book not found');

    const borrowRecord = book.borrowedBy.find(
      b => b.userId === userId && b.status === 'ACTIVE'
    );

    if (!borrowRecord) {
      throw new BadRequestException('No active borrow found');
    }

    const updatedBorrows = book.borrowedBy.map(b =>
      b.userId === userId && b.status === 'ACTIVE'
        ? { ...b, status: 'RETURNED' as const, actualReturnDate: new Date().toISOString() }
        : b
    );
    
    if (!borrowRecord) {
      throw new BadRequestException('No active borrow found');
    }


    const updatedBook = {
      ...book,
      quantity: book.quantity + 1,
      borrowedBy: updatedBorrows,
      updatedAt: new Date().toISOString()
    };

    await this.booksRepository.update(bookId, updatedBook);
  }

  private transformToResponseDto(book: Book): GetBookResponseDto {
    
    return {
      id: book.book_id,
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category,
      quantity: book.quantity,
      cover: book.cover,
      description: book.description,
      price: book.price,
    };
  }
}