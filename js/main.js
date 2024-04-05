let inputTasks = document.querySelector('#inputTasks'); //Инпут для ввода задач
let buttonAdd = document.querySelector('#buttonAdd'); // кнопка Добавить Задачу
let iconArrow = document.querySelector('.icon'); // будущая кнопка стрелка
let contentItems = document.querySelector('.content-items'); //переменная куда будет появлятся задача

let all = document.querySelector('#all');
let active = document.querySelector('#active');
let completed = document.querySelector('#completed');
let clearCompleted = document.querySelector('#clearComplited');
// let deletedIcon = document.querySelector('.deleted');
let counter = document.querySelector('.content-num');
let deletedAll = document.querySelector('.content-deletAll');
// let deletedAlll = document.querySelector('.cont-deletAll');
// let content = document.querySelector('.content-ul');
//Массив для хранения задач
let tasks = localStorage.getItem('contentItems')
	? JSON.parse(localStorage.getItem('contentItems'))
	: [];

let currentTab = 'all';

displayMessages();

//обработчик события на кнопке Добавить задачу
buttonAdd.addEventListener('click', function () {
	//обьект с данными о задачах

	let obj = {
		id: Date.now(),
		contentItems: inputTasks.value,
		checked: false,
	};

	if (inputTasks.value === '') {
		console.log();
	} else tasks.unshift(obj);

	displayMessages();

	inputTasks.value = '';

	// добавляем обьекты в массив

	// сохранение данных, и через JSON преобразуем в строки
});

//Создаем функцию по добавлению новых окон
function displayMessages() {
	// console.log(tasks)
	// сама переменная останется пустой, так как подписи задач не нужно
	let displayMessage = '';

	let renderedTasks = [];

	switch (currentTab) {
		case 'active': {
			renderedTasks = tasks.filter(function (item) {
				return item.checked === false;
			});
			break;
		}

		case 'completed': {
			renderedTasks = tasks.filter(function (item) {
				return item.checked === true;
			});
			break;
		}

		default: {
			renderedTasks = tasks;
			break;
		}
	}

	//прописать каждое условие на каждое значение Таба,

	// обратиться к группе, и через фореач накинуть на каждый элемент обработчик событий, и затем в зависимости от переменной каренТаб менять стили в дереве для активного таба

	renderedTasks.forEach(function (item, i) {
		//добавления тега li через += для того что бы они поступали столько сколько это необходимо
		displayMessage += `
      <li class="box">
          <input class="check" type="checkbox" id='${item.id}' ${item.checked ? 'checked' : ''}>
          <p class="text" id="item_${i}">${item.contentItems}</p>
          <label class="lable-check" for='item_${item.id}'></label>
        <img class='deleted' src='../src/img/deleted.png'>
      </li>
     `;
		//реализуем появление на сайте
	});

	// console.log(displayMessage)

	contentItems.innerHTML = displayMessage;

	counter.textContent = `${tasks.length} items`;

	localStorage.setItem('contentItems', JSON.stringify(tasks));
}

all.addEventListener('click', function () {
	currentTab = 'all';
	displayMessages();
});

active.addEventListener('click', function () {
	currentTab = 'active';

	counter.textContent = `${tasks.length} items`;

	displayMessages();
});

completed.addEventListener('click', function () {
	currentTab = 'completed';
	displayMessages();
});

clearCompleted.addEventListener('click', function () {
	tasks = tasks.filter((item) => {
		return item.checked === false;
	});

	displayMessages();
});

iconArrow.addEventListener('click', function () {
	let boxes = document.querySelectorAll('.box');
	boxes.forEach(function (box) {
		box.toggleAttribute('hidden');
		iconArrow.classList.toggle('rotate');
	});
});

document.addEventListener('change', function (event) {
	if (event.target.classList.contains('check')) {
		let checkBoxState = event.target.checked;

		tasks.forEach((task) => {
			if (task.id == event.target.id) {
				task.checked = checkBoxState;
			}
		});

		counter.textContent = `${tasks.length} items`;
		displayMessages();
	}
});

contentItems.addEventListener('click', function (event) {
	if (event.target.classList.contains('deleted')) {
		const li = event.target.closest('.box');

		const index = Array.from(contentItems.children).indexOf(li);

		tasks.splice(index, 1).requestAnimationFrame;

		displayMessages();
	}
});

deletedAll.addEventListener('click', function () {
	tasks = [];

	displayMessages();
});

const checkBoxAll = document.querySelector('#checkBoxAll');

checkBoxAll.addEventListener('change', function () {
	let checkBox = document.querySelectorAll('.check');

	const checkBoxAllState = checkBoxAll.checked;

	checkBox.forEach(function (item) {
		tasks.forEach((task) => {
			if (task.id == item.id) {
				task.checked = checkBoxAllState;
			}
		});
	});
	counter.textContent = `${tasks.length} items`;
	displayMessages();
});
