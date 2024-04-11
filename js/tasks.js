import { renderTasks } from './renderTasksFunc';
import { addButton, counter, inputTasks, selectStyle } from './const';
import { tabs } from './const';
import { deleteAllButton } from './const';
import { filterTasks } from './filterTasksFunc';

export let tasks = localStorage.getItem('contentItems')
	? JSON.parse(localStorage.getItem('contentItems'))
	: [];

export let currentTab = 'all';

renderTasks();

addButton.addEventListener('click', function () {
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

tabs.forEach(function (el) {
	el.addEventListener('click', (event) => {
		tabs.forEach((item) => {
			if (item.id !== event.target.id) {
				item.style.cssText =
					'color: rgb(83, 127, 94); background-color: rgb(230, 235, 231, .4)';
			} else {
				item.style.cssText =
					'color: white; background-color: rgb(56, 59, 58, 0.9);';
			}
		});

		if (event.target.id == 'all') {
			currentTab = 'all';
		} else if (event.target.id == 'active') {
			currentTab = 'active';
			// selectStyle.classList.toggle('hidden');
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

deleteAllButton.addEventListener('click', function () {
	tasks = [];

	renderTasks();
});
