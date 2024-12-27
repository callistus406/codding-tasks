import { Request, Response } from "express";
import * as BookModel from "../model/books";

export const getAllBooks = (req: Request, res: Response) => {
  res.status(200).json({ success: true, payload: BookModel.getAllBooks() });
};

export const getBookById = (req: Request, res: Response): any => {
  const book = BookModel.getBookById(Number(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.status(200).json({ success: true, payload: book });
};

export const addBook = (req: Request, res: Response): any => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res
      .status(400)
      .json({ success:false, error: "Title, author, and year are required" });
  }
  const newBook = BookModel.addBook(title, author, year);
  res.status(201).json({ success: true, payload: newBook });
};

export const updateBook = (req: Request, res: Response): any => {
  const updatedBook = BookModel.updateBook(Number(req.params.id), req.body);
  if (!updatedBook)
    return res.status(404).json({ success: true, error: "Book not found" });
  res.status(200).json({ success: true, payload: updatedBook });
};

export const deleteBook = (req: Request, res: Response): any => {
  const success = BookModel.deleteBook(Number(req.params.id));
  if (!success)
    return res.status(404).json({ success: true, error: "Book not found" });
  res.status(204).send();
};
