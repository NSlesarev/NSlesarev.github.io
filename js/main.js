const inputTasks = document.querySelector('#inputTasks'); //Инпут для ввода задач
const addButton = document.querySelector('#addButton'); // кнопка Добавить Задачу
const iconArrow = document.querySelector('.content-text__img-icon'); // будущая кнопка стрелка
const contentItems = document.querySelector('.content-list__tasks'); //переменная куда будет появлятся задача

const counter = document.querySelector('.tabs-container__counter');
const deleteAllButton = document.querySelector('.deleteAllButton');
const selectA = document.querySelector('.select-all__all');
const checkBoxAll = document.querySelector('#checkBoxAll');
const tabs = document.querySelectorAll('.tabs-container__tab-item');

let tasks = localStorage.getItem('contentItems')
	? JSON.parse(localStorage.getItem('contentItems'))
	: [];

let currentTab = 'all';

renderTasks();

//обработчик события на кнопке Добавить задачу
addButton.addEventListener('click', function () {
	//обьект с данными о задачах

	let obj = {
		id: Date.now(),
		contentItems: inputTasks.value,
		checked: false,
	};

	if (inputTasks.value === '') {
		console.log();
	} else tasks.unshift(obj);

	renderTasks();

	inputTasks.value = '';
});

inputTasks.addEventListener('keypress', function (e) {
	let key = e.which || e.keyCode;
	if (key === 13) {
		addButton.click();
	}
});

function filterTasks(tasks, currentTab) {
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
	return renderedTasks;
}

//Создаем функцию по добавлению новых окон
function renderTasks() {
	// console.log(tasks)
	// сама переменная останется пустой, так как подписи задач не нужно
	let displayMessage = '';

	const renderedTasks = filterTasks(tasks, currentTab);

	// console.log(filterTasks());

	counter.textContent = `${renderedTasks.length} items`;

	renderedTasks.forEach(function (item) {
		//добавления тега li через += для того что бы они поступали столько сколько это необходимо
		displayMessage += `
      <li class="box">
          <input class="check" type="checkbox" id='${item.id}' ${item.checked ? 'checked' : ''}>
          <p class="text" id="item_${item.id}">${item.contentItems}</p>
          <label class="lable-check" for='item_${item.id}'></label>
        <img class='deleted' src='../src/img/deleted.png'>
      </li>
     `;
	});

	contentItems.innerHTML = displayMessage;

	localStorage.setItem('contentItems', JSON.stringify(tasks));
}

tabs.forEach(function (el) {
	el.addEventListener('click', function (event) {
		tabs.forEach(function (item) {
			// console.log(item.id);
			if (item.id !== event.target.id) {
				item.style.cssText =
					'color: rgb(83, 127, 94); background-color: rgb(230, 235, 231, .4)';
			} else {
				item.style.cssText =
					'color: white; background-color: rgb(56, 59, 58, 0.9);';
			}
			console.log(item.id);
		});
		console.log();

		if (event.target.id == 'all') {
			currentTab = 'all';
		} else if (event.target.id == 'active') {
			currentTab = 'active';
		} else if (event.target.id == 'completed') {
			currentTab = 'completed';
		} else {
			tasks = tasks.filter((item) => {
				return item.checked === false;
			});
		}
		renderTasks();
	});
});

iconArrow.addEventListener('click', function () {
	let boxes = document.querySelectorAll('.box');
	boxes.forEach(function (box) {
		// console.log(box);
		box.classList.toggle('hidden');
	});
	iconArrow.classList.toggle('rotate');
});
contentItems.addEventListener('change', function (event) {
	if (event.target.classList.contains('check')) {
		let checkBoxState = event.target.checked;

		tasks.forEach((task) => {
			if (task.id == event.target.id) {
				task.checked = checkBoxState;
			}
		});

		renderTasks();
	}
});

contentItems.addEventListener('click', function (event) {
	if (event.target.classList.contains('deleted')) {
		const li = event.target.closest('.box');

		const index = Array.from(contentItems.children).indexOf(li);

		tasks.splice(index, 1).requestAnimationFrame;

		renderTasks();
	}
});

deleteAllButton.addEventListener('click', function () {
	tasks = [];

	renderTasks();
});

checkBoxAll.addEventListener('change', function () {
	let checkBox = document.querySelectorAll('.check');

	const checkBoxAllState = checkBoxAll.checked;
	if (checkBoxAllState == true) {
		selectA.innerHTML = 'Remove selection';
	} else {
		selectA.innerHTML = 'Select all';
	}

	checkBox.forEach(function (item) {
		tasks.forEach((task) => {
			if (task.id == item.id) {
				task.checked = checkBoxAllState;
			}
		});
	});
	counter.textContent = `${tasks.length} items`;
	renderTasks();
});
