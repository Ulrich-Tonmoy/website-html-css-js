const form = document.getElementById('form');
const input = document.getElementById('input');
const todos = document.querySelector('.todos');

const loadTodos = JSON.parse(localStorage.getItem('todos'));
if (loadTodos) {
    loadTodos.forEach(loadTodo => {
        addToDo(loadTodo);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    addToDo();
});

function addToDo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoElement = document.createElement('li');
        if (todo && todo.completed) {
            todoElement.classList.add('completed');
        }
        todoElement.innerText = todoText;

        todoElement.addEventListener('click', () => {
            todoElement.classList.toggle('completed');
            updateLocalStorage();
        });
        todoElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            todoElement.remove();
            updateLocalStorage();
        });

        todos.appendChild(todoElement);
        input.value = "";

        updateLocalStorage();
    }

}

function updateLocalStorage() {
    const todosElement = document.querySelectorAll('li');
    const todos = [];

    todosElement.forEach(todo => {
        todos.push({
            text: todo.innerText,
            completed: todo.classList.contains('completed')
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}