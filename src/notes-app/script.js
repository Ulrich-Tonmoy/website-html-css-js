const addBtn = document.querySelector('.add-note')
const container = document.getElementById('container');

const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) {
    notes.forEach(note => {
        addNewNote(note);
        showNotification('All notes loaded');
    });
}

addBtn.addEventListener('click', (e) => {
    addNewNote();
    showNotification('New Note Added');
});

function addNewNote(noteText = '') {
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `<div class="notes">
                        <div class="tools">
                            <button class="edit"><i class="fas fa-edit"></i></button>
                            <button class="delete"><i class="fas fa-trash-alt"></i></button>
                        </div>
                        <div class="main ${noteText ? '' : 'hidden'}"></div>
                        <textarea class="${noteText ? 'hidden' : ''}"></textarea>
                    </div>`;

    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textarea = note.querySelector('textarea');
    textarea.value = noteText;
    main.innerHTML = marked(noteText);

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    });

    deleteBtn.addEventListener('click', () => {
        note.remove();
        showNotification('Note deleted');
        updateLocalStorage();
    })

    textarea.addEventListener('input', (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateLocalStorage();
    });
    document.body.appendChild(note);
}

function updateLocalStorage() {
    const text = document.querySelectorAll('textarea');
    const notes = [];

    text.forEach(note => {
        notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}

// notification
function showNotification(notification) {
    const not = document.createElement('div');
    not.classList.add('notification');
    not.innerHTML = notification;
    container.appendChild(not);

    setTimeout(() => {
        not.remove();
    }, 3000)
}