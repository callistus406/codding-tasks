export interface Todo {
    id: number;
    task: string;
    completed: boolean;
}

let todos: Todo[] = [];
let idCounter = 1;

export const getAllTodos = (): Todo[] => todos;

export const addTodo = (task: string): Todo => {
    const newTodo = { id: idCounter++, task, completed: false };
    todos.push(newTodo);
    return newTodo;
};

export const updateTodo = (id: number, updatedFields: Partial<Todo>): Todo | null => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return null;
    Object.assign(todo, updatedFields);
    return todo;
};
export const fetchTodo = (id: number): Todo | null => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return null;
    return todo;
};

export const deleteTodo = (id: number): boolean => {
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return false;
    todos.splice(index, 1);
    return true;
};
