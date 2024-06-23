let inputBox = document.querySelector('.inputTask');
let listContainer = document.querySelector('.task_list');

const saveData = () =>
  sessionStorage.setItem('todoListData', listContainer.innerHTML);

const getData = () =>
  (listContainer.innerHTML = sessionStorage.getItem('todoListData'));

const addTask = () => {
  if (inputBox.value === '') alert('Add some text');
  else {
    // createElement - создаёт тег
    let li = document.createElement('li');
    li.innerHTML = inputBox.value;
    //  appendChild - добавляет элемент в тег
    listContainer.appendChild(li);

    let trashIcon = document.createElement('img');
    trashIcon.src = './img/trash.png';
    trashIcon.classList.add('trash_icon');
    li.appendChild(trashIcon);

    let editIcon = document.createElement('img');
    editIcon.src = './img/edit.png';
    editIcon.classList.add('edit_icon');
    li.appendChild(editIcon);
  }

  inputBox.value = '';
  saveData();
};

inputBox.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

listContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    // toggle - добавляет либо убирает класс
    e.target.classList.toggle('checked');
    saveData();
    //  contains - проверяет наличие класса у элемента
  } else if (e.target.classList.contains('trash_icon')) {
    e.target.parentElement.remove();
    saveData();
  }
  // stopPropagation - останавливает распространение события
  e.stopPropagation();
});

listContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit_icon')) {
    e.target.parentElement.setAttribute('contenteditable', 'true');

    setTimeout(() => {
      e.target.parentElement.setAttribute('contenteditable', 'false');
      saveData();
    }, 6000);
  }

  e.stopPropagation();
});

getData();
