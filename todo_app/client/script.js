const API_URL = 'http://localhost:3000/api/todos';

function showError(message) {
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerText = message;
    errorContainer.style.display = 'block';
    setTimeout(() => {
        errorContainer.style.display = 'none';
        errorContainer.innerText = '';
    }, 5000);
}

async function fetchTodos() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) {
            throw new Error(`Failed to fetch todos. Status: ${res.status}`);
        }

        const {payload:todos} = await res.json();
        console.log(todos,"pppppppppp")
        const list = document.getElementById('todoList');
        list.innerHTML = '';

        todos.forEach(todo => {
            list.innerHTML += `
                <li class="${todo.completed ? 'completed' : ''}">
                    <span>${todo.task}</span>
                    <div>
                        <button onclick="deleteTodo(${todo.id})">Delete</button>
                        <button onclick="toggleComplete(${todo.id})">
                            ${todo.completed ? 'Undo' : 'Complete'}
                        </button>
                    </div>
                </li>`;
        });
    } catch (error) {
        console.error(error,"------------");
        showError('Error fetching tasks. Please try again later.');
    }
}

async function addTodo() {
    const input = document.getElementById('todoInput');
    if (!input.value.trim()) {
        showError('Please enter a valid task.');
        return;
    }

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: input.value })
        });

        if (!res.ok) {
            throw new Error(`Failed to add todo. Status: ${res.status}`);
        }

        input.value = '';
        fetchTodos();
    } catch (error) {
        console.error(error);
        showError('Error adding task. Please try again later.');
    }
}

async function toggleComplete(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch todo for toggling. Status: ${res.status}`);
        }
        
        const { payload: todo } = await res.json();
        
        console.log("9999999",todo)
        const updateRes = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !todo.completed })
        });

        if (!updateRes.ok) {
            throw new Error(`Failed to update todo. Status: ${updateRes.status}`);
        }

        fetchTodos();
    } catch (error) {
        console.error(error);
        showError('Error toggling task completion. Please try again later.');
    }
}

async function deleteTodo(id) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!res.ok) {
            throw new Error(`Failed to delete todo. Status: ${res.status}`);
        }

        fetchTodos();
    } catch (error) {
        console.error(error);
        showError('Error deleting task. Please try again later.');
    }
}

fetchTodos();
