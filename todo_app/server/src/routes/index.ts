import { Router } from 'express';
import { getTodos, createTodo, editTodo, removeTodo, getTodo } from '../controller/todo.controller';

const router = Router();

router.get('/todos', getTodos);
router.post('/todos', createTodo);
router.put('/todos/:id', editTodo);
router.get('/todos/:id', getTodo);
router.delete('/todos/:id', removeTodo);

export default router;
