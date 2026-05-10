import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Put, NotFoundException } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteBookDto } from './dto/delete-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  //Create a new book
  @Post()
  @UseInterceptors(FileInterceptor('cover'))
  async createBook(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile() file: Express.Multer.File, 
  ) {
    try {
      await this.booksService.createBook(createBookDto, file);
      return { message: 'Book created successfully' };
    } catch (error) {
      return { error: error.message };
    }
  }

  //Update An Existing Book
  @Put(':id')
  async updateBook(
    @Param('id') bookId: string,
    @Body() updateBookDto: UpdateBookDto,
  ) : Promise<any>{
    try {
      await this.booksService.updateBook(bookId, updateBookDto);
      return { message: 'Book updated successfully' };
    } catch (error) {
      throw error ;
    }
  }

  //Delete a book by its ID
  @Delete(':id')
  async deleteBook(@Param('id') bookId: string): Promise<any> {
    try {
      await this.booksService.deleteBook(bookId);
      return { message: 'Book deleted successfully' };
    } catch (error) {
      if (error.message === 'Book not found.') {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  //Get a single book by its ID
  @Get(':id')
  async getBook(@Param('id') bookId: string): Promise<any> {
    try {
      const book = await this.booksService.getBookById(bookId);
      return book;
    } catch (error) {
      if (error.message === 'Book not found.') {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  //Get all books
  @Get()
  async getAllBooks(): Promise<any> {
    try {
      const books = await this.booksService.getAllBooks();
      return books;
    } catch (error) {
      return { error: error.message };
    }
  }

  //Borrow a book 
  @Post(':id/borrow')
  async borrowBook(@Param('id') bookId: string, @Body('userId') userId: string): Promise<any> {
    try {
      console.log('Borrowing book:', bookId, userId);
      
      await this.booksService.borrowBook(bookId, userId);
      return { message: 'Book borrowed successfully' };
    } catch (error) {
      return { error: error.message };
    }
  }

  //Return a borrowed book
  @Post(':id/return')
  async returnBook(@Param('id') bookId: string, @Body('userId') userId: string): Promise<any> {
    try {
      await this.booksService.returnBook(bookId, userId);
      return { message: 'Book returned successfully' };
    } catch (error) {
      return { error: error.message };
    }
  }
}
