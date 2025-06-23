// Select elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load todos from localStorage or set to empty array
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render todos on page
function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');
    li.innerHTML = `
      <span>${todo.text}</span>
      <div class="todo-actions">
        <button class="complete-btn" title="Toggle Complete">&#10003;</button>
        <button class="delete-btn" title="Delete">&#128465;</button>
      </div>
    `;
    // Complete button
    li.querySelector('.complete-btn').onclick = () => {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderTodos();
    };
    // Delete button
    li.querySelector('.delete-btn').onclick = () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    };
    todoList.appendChild(li);
  });
}

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Add new todo
todoForm.onsubmit = (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    saveTodos();
    renderTodos();
    todoInput.value = '';
  }
};

// Initial render
renderTodos();