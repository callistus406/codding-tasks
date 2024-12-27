import { Book } from "../@types";

let books: Book[] = [];
let idCounter = 1;

export const getAllBooks = (): Book[] => books;

export const getBookById = (id: number): Book | undefined => {
    return books.find(book => book.id === id);
};

export const addBook = (title: string, author: string, year: number): Book => {
    const newBook: Book = { id: idCounter++, title, author, year };
    books.push(newBook);
    return newBook;
};

export const updateBook = (id: number, updatedFields: Partial<Book>): Book | null => {
    const book = books.find(b => b.id === id);
    if (!book) return null;
    Object.assign(book, updatedFields);
    return book;
};

export const deleteBook = (id: number): boolean => {
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return false;
    books.splice(index, 1);
    return true;
};
