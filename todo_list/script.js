let todos = JSON.parse(localStorage.getItem('todos')) || [];

const todoForm = document.getElementById('todo-form');
const itemNameInput = document.getElementById('item-name');
const itemDateInput = document.getElementById('item-date');
const itemPrioritySelect = document.getElementById('item-priority');

const todaysListContainer = document.getElementById('todays-list');
const futureListContainer = document.getElementById('future-list');
const completedListContainer = document.getElementById('completed-list');

function formatDateToDisplay(dateString) {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${parseInt(day, 10)}/${parseInt(month, 10)}/${year}`;
}

function getTodayString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = itemNameInput.value.trim();
  const date = itemDateInput.value;
  const priority = itemPrioritySelect.value;

  if (!name || !date || !priority) return;

  const newTodo = {
    name: name,
    date: date,
    priority: priority,
    completed: false
  };

  todos.push(newTodo);
  saveAndRender();
  todoForm.reset();
});

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  saveAndRender();
}

function deleteTask(index) {
  todos.splice(index, 1);
  saveAndRender();
}

function renderTodos() {
  todaysListContainer.innerHTML = '';
  futureListContainer.innerHTML = '';
  completedListContainer.innerHTML = '';

  const todayStr = getTodayString();

  let todaysCount = 0;
  let futureCount = 0;
  let completedCount = 0;

  todos.forEach((todo, index) => {
    const isCompleted = todo.completed;
    const isToday = todo.date === todayStr;
    
    const taskCard = document.createElement('div');
    taskCard.className = `task-item ${isCompleted ? 'completed' : 'pending'}`;

    let sectionType = '';

    if (isCompleted) {
      sectionType = 'completed';
      completedCount++;
    } else if (isToday) {
      sectionType = 'today';
      todaysCount++;
    } else {
      sectionType = 'future';
      futureCount++;
    }

    const displayIndex = sectionType === 'completed' ? completedCount 
                       : sectionType === 'today' ? todaysCount 
                       : futureCount;

    taskCard.innerHTML = `
      <div class="task-info">
        <span class="task-name">${displayIndex}. ${escapeHTML(todo.name)}</span>
        <span class="task-date">${formatDateToDisplay(todo.date)}</span>
        <span class="task-priority">Priority: ${escapeHTML(todo.priority)}</span>
      </div>
      <div class="task-actions">
        ${!isCompleted ? `
          <button class="icon-btn" onclick="toggleComplete(${index})" title="Mark as Completed">
            <i data-lucide="check-circle-2"></i>
          </button>
        ` : ''}
        <button class="icon-btn" onclick="deleteTask(${index})" title="Delete Task">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    `;

    if (sectionType === 'today') {
      todaysListContainer.appendChild(taskCard);
    } else if (sectionType === 'future') {
      futureListContainer.appendChild(taskCard);
    } else {
      completedListContainer.appendChild(taskCard);
    }
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

renderTodos();