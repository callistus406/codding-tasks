import { Request, Response } from "express";
import {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  fetchTodo,
} from "../model/todo.model";

export const getTodos = (req: Request, res: Response) => {
  // res.json(getAllTodos());
  res.status(200).json({ success: true, payload: getAllTodos() });
};

export const createTodo = (req: Request, res: Response): any => {
  const { task } = req.body;
  if (!task) return res.status(400).json({success:false, error: "Task is required" });
  const newTodo = addTodo(task);
  res.status(201).json({ success: true, payload: newTodo });
};

export const editTodo = (req: Request, res: Response): any => {
    const { id } = req.params;
    const { completed, task } = req.body;
    if(task && task !== "string") return res.status(400).json({success:false, error: "Completed field must be a String" });
    if( completed && typeof completed !=="boolean") return res.status(400).json({success:false, error: "Completed field must be a boolean" });
  const updatedTodo = updateTodo(Number(id), req.body);
  if (!updatedTodo) 
    return res.status(404).json({ success: false, error: "Todo not found" });
  res.status(200).json({ success: true, payload: updatedTodo });
};

export const removeTodo = (req: Request, res: Response): any => {
  const { id } = req.params;
  const success = deleteTodo(Number(id));
  if (!success)
    return res.status(404).json({ success: false, error: "Todo not found" });
  res.status(204).send();
};
export const getTodo = (req: Request, res: Response): any => {
  const { id } = req.params;
  const success = fetchTodo(Number(id));
  if (!success)
    return res.status(404).json({ success: false, error: "Todo not found" });
  res.status(200).json({ success: true, payload: success });

};
